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
  const num = value.replace(/[^\d.]/g, '');
  if (!num) return '';
  const parts = num.split('.');
  parts[0] = parseInt(parts[0]).toLocaleString();
  return parts.join('.');
};

const InputAmount = styled.input<{ $isExceeded: boolean }>`
  width: 100%;
  font-size: 1.55rem;
  color: white;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ $isExceeded }) => ($isExceeded ? colors.White : '#aaa')};
  &:focus {
    outline: none;
    border-color: ${({ $isExceeded }) => ($isExceeded ? colors.Red : colors.Blue)};
  }
`;

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
  margin-top: 20rem;
  margin-bottom: 2rem;
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

const KRWExchangeRate = () => {
  const [rate, setRate] = useState<number | null>(null);
  const [usd, setUsd] = useState('');
  const [krw, setKrw] = useState<number | null>(null);
  const { username, dollars, updatePoints, updateDollars } = useStore();

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
    if (!/^\d*(\.\d{0,2})?$/.test(rawValue)) return;
    const formatted = formatWithCommas(rawValue);
    setUsd(formatted);

    if (rate && !isNaN(Number(rawValue))) {
      const krwValue = bankersRound(Number(rawValue) * rate, 0); // <- 여기! 정수로 반올림
      setKrw(krwValue);
    } else {
      setKrw(null);
    }
  };

  const handleExchange = async () => {
    if (!usd || !rate || !krw) return;
    const numericUsd = Number(usd.replace(/,/g, ''));
    try {
      await baseAxios.post('/user/exchange', {
        name: username,
        amount: numericUsd,
        direction: 'points',
      });
      await updatePoints();
      await updateDollars();
      setUsd('');
      setKrw(null);
    } catch (err: any) {
      console.error('❌ 환전 실패:', err);
      alert(err.response?.data?.message || '환전 중 오류가 발생했습니다.');
    }
  };

  const numericUsd = Number(usd.replace(/,/g, ''));
  const isExceeded = numericUsd > dollars;
  const isDisabled = !krw || isExceeded;

  return (
    <Box>
      <Title>달러 → 원화 환전</Title>
      {rate ? (
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
                    value={usd}
                    onChange={handleChange}
                    placeholder="달러 금액 입력"
                    $isExceeded={isExceeded}
                  />
                  <Unit htmlFor="inputAmount">달러</Unit>
                </InputWrapper>
                <OwnMoney
                  onClick={() => {
                    const maxUsd = Math.floor(dollars * 100) / 100;
                    const formatted = formatWithCommas(maxUsd.toFixed(2));
                    setUsd(formatted);
                    if (rate) {
                      const krwValue = bankersRound(maxUsd * rate, 0); // <- 여기도!
                      setKrw(krwValue);
                    }
                  }}
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                >
                  보유 달러: ${dollars.toFixed(2)}
                </OwnMoney>
              </Wrap>
              <WonWrap>
                <FaEquals fontSize={20} />
                <ResultAmount
                  type="text"
                  value={krw !== null ? bankersRound(krw, 0).toLocaleString() : ''} // ← 여기도 한 번 더 안전하게
                  readOnly
                />
                <Unit htmlFor="inputAmount">원</Unit>
              </WonWrap>
            </InputContent>
            <ButtonContent>
              {isExceeded && <ErrorText>보유 달러를 초과했습니다</ErrorText>}
              {!isDisabled ? (
                <BtnWrap to="/InvestmentHome">
                  <Btn bgColor={colors.Blue} handleBtn={handleExchange}>
                    <PressMotion>
                      <div style={{ fontWeight: '500', letterSpacing: '0.2em' }}>환전하기</div>
                    </PressMotion>
                  </Btn>
                </BtnWrap>
              ) : (
                <BtnWrap>
                  <Btn bgColor={colors.Grey} handleBtn={() => {}}>
                    <PressMotion>
                      <div style={{ fontWeight: '500', letterSpacing: '0.2em' }}>환전하기</div>
                    </PressMotion>
                  </Btn>
                </BtnWrap>
              )}
            </ButtonContent>
          </ContentWrapper>
        </Wrapper>
      ) : (
        <ResultText>환율 정보를 불러오는 중입니다...</ResultText>
      )}
    </Box>
  );
};

export default KRWExchangeRate;
