import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import useStore from '@/store/User';
import baseAxios from '@/apis/axiosInstance';
import Btn from '@/components/Btn';
import PressMotion from '@/components/PressMotion';
import { colors } from '@/styles/colors';
import { FaEquals } from 'react-icons/fa';

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
  height: 65vh;
  justify-content: space-between;
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

const InputAmount = styled.input`
  width: 100%;
  font-size: 1.55rem;
  color: white;
  background: transparent;
  border: none;
  border-bottom: 1px solid #aaa;
  padding: 0.5rem 4rem 0.5rem 0;
  &:focus {
    outline: none;
    border-color: ${colors.LightBlue};
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
  width: 100%;
  color: ${colors.LightBlue};
  justify-content: center;
  text-align: center;
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
    const wonValue = e.target.value;
    setWon(wonValue);
    if (rate && !isNaN(Number(wonValue))) {
      setUsd(Number(wonValue) / rate);
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

  // 버튼 비활성화 여부
  const isDisabled = !usd || Number(won) > points;

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
                      type="number"
                      value={won}
                      onChange={handleChange}
                      placeholder="포인트 금액 입력"
                    />
                    <Unit htmlFor="inputAmount">원</Unit>
                  </InputWrapper>
                  <OwnMoney
                    onClick={() => {
                      setWon(String(points));
                      if (rate) setUsd(points / rate);
                    }}
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    보유 포인트: {points.toFixed(2)}원
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
                {Number(won) > points && <ErrorText>⚠️ 보유 포인트를 초과했습니다!</ErrorText>}

                <Btn
                  bgColor={isDisabled ? colors.Grey : colors.LightBlue}
                  handleBtn={() => {
                    handleExchange();
                  }}
                >
                  <PressMotion>
                    <div style={{ width: '21.5rem' }}>환전하기</div>
                  </PressMotion>
                </Btn>
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
