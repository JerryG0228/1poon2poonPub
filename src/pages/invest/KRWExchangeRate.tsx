import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import useStore from '@/store/User';
import baseAxios from '@/apis/axiosInstance'; // ✅ 빠진 import 추가

const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  font-weight: bold;
  padding: 1rem;
`;

const Title = styled.div`
  font-size: 1.4rem;
  color: white;
  margin-bottom: 1rem;
`;

const InputWrapper = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #313845;
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Label = styled.p`
  font-size: 1.15rem;
  color: white;
`;

const InputAmount = styled.input`
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background: transparent;
  border: none;
  border-bottom: 1px solid #aaa;
  padding: 0.5rem 0;
  &:focus {
    outline: none;
    border-color: white;
  }
`;

const ResultText = styled.p`
  font-size: 1.1rem;
  color: #f1f3f5;
  margin-top: 1rem;
`;

const ExchangeButton = styled.button`
  margin-top: 2rem;
  padding: 0.8rem;
  background-color: #ef4452;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  &:disabled {
    background-color: #6b7683;
    cursor: not-allowed;
  }
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

  // ✅ 필요한 상태/함수 추가
  const { username, dollars, points, setPoints, setDollars } = useStore();

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
    const usdValue = e.target.value;
    setUsd(usdValue);
    if (rate && !isNaN(Number(usdValue))) {
      const krwValue = bankersRound(Number(usdValue) * rate, 2);
      setKrw(krwValue);
    } else {
      setKrw(null);
    }
  };

  const handleExchange = async () => {
    if (!usd || !rate || !krw) return;

    const roundedUsd = bankersRound(Number(usd), 2);

    try {
      const res = await baseAxios.post('/user/exchange', {
        name: username,
        amount: roundedUsd,
        direction: 'points',
      });

      if (res.data?.points !== undefined) {
        await setPoints(res.data.points, 'exchange'); // 포인트 먼저 반영
        await setDollars(); // 그 다음에 setDollars 호출 (환전 API 호출 후 반드시 실행)
      }

      alert(
        `환전 성공! 💵 ${roundedUsd.toFixed(2)} USD → 💴 ${res.data.points.toLocaleString()}원`,
      );

      // 입력값 초기화
      setUsd('');
      setKrw(null);
    } catch (err: any) {
      console.error('❌ 환전 실패:', err);
      alert(err.response?.data?.message || '환전 중 오류가 발생했습니다.');
    }
  };

  return (
    <Box>
      <Title>달러 → 원화 환전</Title>
      {rate ? (
        <>
          <InputWrapper>
            <Label>현재 환율</Label>
            <ResultText>1 USD ≈ {rate.toLocaleString()} KRW</ResultText>
            <ResultText
              onClick={() => {
                if (rate) {
                  const maxUsd = Math.floor(dollars * 100) / 100;
                  setUsd(String(maxUsd));
                  setKrw(bankersRound(maxUsd * rate));
                }
              }}
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              보유 달러: ${dollars.toFixed(2)}
            </ResultText>
            <ResultText>보유 포인트: {points.toLocaleString()}원</ResultText>
          </InputWrapper>

          <InputWrapper>
            <Label>달러 입력</Label>
            <InputAmount
              type="number"
              value={usd}
              onChange={handleChange}
              placeholder="$ 달러 금액 입력"
            />
            {krw !== null && (
              <ResultText>💴 환전 결과: {bankersRound(krw, 2).toLocaleString()} KRW</ResultText>
            )}
            {Number(usd) > dollars && (
              <ResultText style={{ color: 'tomato' }}>⚠️ 보유 달러를 초과했습니다!</ResultText>
            )}
          </InputWrapper>

          <ExchangeButton onClick={handleExchange} disabled={!krw || Number(usd) > dollars}>
            환전하기
          </ExchangeButton>
        </>
      ) : (
        <ResultText>환율 정보를 불러오는 중입니다...</ResultText>
      )}
    </Box>
  );
};

export default KRWExchangeRate;
