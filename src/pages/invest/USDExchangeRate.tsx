import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import useStore from '@/store/User';
import baseAxios from '@/apis/axiosInstance';
import Btn from '@/components/Btn';
import PressMotion from '@/components/PressMotion';
import { colors } from '@/styles/colors';
import { FaEquals } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  padding: 0 1rem;
`;

const Title = styled.div`
  font-size: 2rem;
  color: white;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  display: flex;
  font-size: 0.9rem;
  color: #c5c5c5;
  gap: 0.5rem;
  margin-bottom: 5rem;
`;

const CurrentRate = styled.div`
  display: flex;
`;

const Label = styled.p`
  font-size: 0.9rem;
  color: #c5c5c5;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
  &:focus-within label {
    color: white;
  }
`;

const formatWithCommas = (value: string) => {
  const num = value.replace(/[^\d]/g, '');
  if (!num) return '';
  return parseInt(num).toLocaleString();
};

const InputAmount = styled.input<{ $isExceeded: boolean }>`
  width: 100%;
  font-size: 1.55rem;
  color: white;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ $isExceeded }) => ($isExceeded ? colors.Blue : '#aaa')};
  padding: 0.5rem 4rem 0.5rem 0;
  &:focus {
    outline: none;
    border-color: ${({ $isExceeded }) => ($isExceeded ? 'red' : colors.Blue)};
  }
`;

//input 끝에 달러' 글자 고정
const Unit = styled.label`
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  font-size: 1.55rem;
  font-weight: 600;
  color: ${colors.Grey};
`;

const OwnMoney = styled.div`
  font-size: 0.9rem;
  color: #c5c5c5;
  display: flex;
  justify-content: flex-end;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const WonWrap = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  gap: 1rem;

  > label {
    color: ${colors.White};
  }
`;

const ResultAmount = styled.input`
  width: 100%;
  font-size: 1.55rem;
  font-weight: 600;
  color: white;
  background: transparent;
  border: none;
  border-bottom: 1px solid #aaa;
  padding: 0.5rem 4rem 0.5rem 0;
  pointer-events: none;
`;

const ResultText = styled.p`
  font-size: 1.1rem;
  color: #f1f3f5;
  margin-top: 1rem;
`;

const ErrorText = styled.div`
  display: flex;
  color: ${colors.Red};
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 22rem;
`;

const BtnWrap = styled(Link)`
  position: fixed;
  bottom: 1rem;
`;

const bankersRound = (value: number, decimalPlaces = 2): number => {
  const multiplier = Math.pow(10, decimalPlaces);
  const scaled = value * multiplier;
  const floored = Math.floor(scaled);
  const diff = scaled - floored;

  if (diff > 0.5) return Math.ceil(scaled) / multiplier;
  if (diff < 0.5) return floored / multiplier;

  return (floored % 2 === 0 ? floored : floored + 1) / multiplier;
};

const USDExchangeRate = () => {
  const [rate, setRate] = useState<number | null>(null);
  const [won, setWon] = useState('');
  const [usd, setUsd] = useState<number | null>(null);
  const { username, points, updatePoints, updateDollars } = useStore();

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await axios.get('https://m.search.naver.com/p/csearch/content/qapirender.nhn', {
          params: {
            key: 'calculator',
            pkid: 141,
            q: '환율',
            where: 'm',
            u1: 'keb',
            u6: 'standardUnit',
            u7: 0,
            u3: 'USD',
            u4: 'KRW',
            u8: 'down',
            u2: 1,
          },
        });
        const rateStr = res.data?.country?.[1]?.value?.replace(',', '');
        if (rateStr) setRate(parseFloat(rateStr));
      } catch (err) {
        console.error('❌ 환율 정보 가져오기 실패:', err);
      }
    };

    fetchRate();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    if (!/^\d*$/.test(rawValue)) return; // 숫자만 허용

    const formatted = formatWithCommas(rawValue);
    setWon(formatted);

    if (rate && !isNaN(Number(rawValue))) {
      setUsd(Number(rawValue) / rate);
    } else {
      setUsd(null);
    }
  };

  const handleExchange = async () => {
    if (!usd || !rate || !won) return;

    try {
      await baseAxios
        .post('/user/exchange', {
          name: username,
          amount: Number(won),
          direction: 'dollars',
        })
        .then(() => {
          updatePoints(); // 보유 포인트 업데이트
          updateDollars(); // 보유 달러 업데이트
        })
        .then(() => {
          setWon('');
          setUsd(null);
        });
    } catch (err: any) {
      console.error('❌ 환전 실패:', err);
      alert(err.response?.data?.message || '환전 중 오류가 발생했습니다.');
    }
  };

  const numericWon = Number(won.replace(/,/g, ''));

  // 버튼 비활성화 여부
  const isDisabled = !usd || numericWon > points;

  return (
    <Box>
      <Title>원화 → 달러 환전</Title>
      {rate ? (
        <>
          <Wrapper>
            <TitleWrapper>
              <Label>현재 환율</Label>
              <CurrentRate>1 USD ≈ {rate.toLocaleString()} KRW</CurrentRate>
            </TitleWrapper>

            <ContentWrapper>
              <InputContent>
                <Wrap>
                  <InputWrapper>
                    <InputAmount
                      type="text"
                      value={won}
                      onChange={handleChange}
                      placeholder="포인트 금액 입력"
                      $isExceeded={numericWon > points}
                    />

                    <Unit htmlFor="inputAmount">원</Unit>
                  </InputWrapper>
                  <OwnMoney
                    onClick={() => {
                      const formatted = Number(points.toFixed(0)).toLocaleString();
                      setWon(formatted);
                      if (rate) setUsd(points / rate);
                    }}
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    보유 포인트: {Number(points.toFixed(0)).toLocaleString()}원
                  </OwnMoney>
                </Wrap>

                <WonWrap>
                  <FaEquals fontSize={20} />
                  <ResultAmount
                    type="text"
                    value={usd !== null ? bankersRound(usd, 2).toFixed(2) : ''}
                    readOnly
                  />
                  <Unit htmlFor="inputAmount">달러</Unit>
                </WonWrap>
              </InputContent>
              <ButtonContent>
                {numericWon > points && <ErrorText>보유 포인트를 초과했습니다</ErrorText>}

                {!isDisabled ? (
                  <BtnWrap to="/InvestmentHome">
                    <Btn bgColor={colors.Blue} handleBtn={handleExchange}>
                      <PressMotion>
                        <div
                          style={{ width: '21.5rem', fontWeight: '500', letterSpacing: '0.2em' }}
                        >
                          환전하기
                        </div>
                      </PressMotion>
                    </Btn>
                  </BtnWrap>
                ) : (
                  <div>
                    <BtnWrap>
                      <Btn bgColor={colors.Grey} handleBtn={() => {}}>
                        <PressMotion>
                          <div
                            style={{ width: '21.5rem', fontWeight: '500', letterSpacing: '0.2em' }}
                          >
                            환전하기
                          </div>
                        </PressMotion>
                      </Btn>
                    </BtnWrap>
                  </div>
                )}
              </ButtonContent>
            </ContentWrapper>
          </Wrapper>
        </>
      ) : (
        <ResultText>환율 정보를 불러오는 중입니다...</ResultText>
      )}
    </Box>
  );
};

export default USDExchangeRate;
