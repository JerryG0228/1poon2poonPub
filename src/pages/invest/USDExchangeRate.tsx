import { useEffect, useState } from 'react';
import baseAxios from '@/apis/axiosInstance';
import axios from 'axios';
import styled from 'styled-components';
import useStore from '@/store/User';

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

const USDExchangeRate = () => {
  const [rate, setRate] = useState<number | null>(null);
  const [won, setWon] = useState('');
  const [usd, setUsd] = useState<number | null>(null);
  const { username, setPoints, points, setDollars, dollars } = useStore();

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

    const roundedUsd = bankersRound(usd, 2); // 💵 뱅커스 라운딩 적용한 달러 값

    try {
      console.log('📤 요청 데이터:', {
        name: username,
        amount: Number(won), // ✅ 원화 금액
        direction: 'dollars', // ✅ 원화 → 달러
      });

      const res = await baseAxios.post('/user/exchange', {
        name: username,
        amount: Number(won), // ✅ 실제 환전할 원화 금액
        direction: 'dollars',
      });

      console.log('✅ 응답 데이터:', res.data);

      if (res.data?.points !== undefined && res.data?.Dollars !== undefined) {
        setPoints(res.data.points, 'exchange'); // ✅ 포인트 업데이트
        setDollars(res.data.Dollars); // ✅ 달러 업데이트

        alert(`환전 성공! 💴 ${Number(won).toLocaleString()}원 → 💵 ${roundedUsd.toFixed(2)} USD`);

        // 입력값 초기화
        setWon('');
        setUsd(null);
      }
    } catch (err: any) {
      console.error('❌ 환전 실패:', err);
      console.log('❌ 오류 응답:', err.response?.data);

      alert(err.response?.data?.message || '환전 중 오류가 발생했습니다.');
    }
  };

  return (
    <Box>
      <Title>달러 환율 계산기</Title>
      {rate ? (
        <>
          <InputWrapper>
            <Label>현재 환율</Label>
            <ResultText>1 USD ≈ {rate.toLocaleString()} KRW</ResultText>
            <ResultText
              onClick={() => {
                setWon(String(points));
                if (rate) setUsd(points / rate);
              }}
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              보유 포인트: {points.toLocaleString()}원
            </ResultText>
            <ResultText>보유 달러: {dollars.toFixed(2)}</ResultText>
          </InputWrapper>

          <InputWrapper>
            <Label>원화 입력</Label>
            <InputAmount
              type="number"
              value={won}
              onChange={handleChange}
              placeholder="₩ 원화 금액 입력"
            />
            {usd !== null && (
              <ResultText>💵 환전 결과: {bankersRound(usd, 2).toFixed(2)} USD</ResultText>
            )}
          </InputWrapper>

          <ExchangeButton onClick={handleExchange} disabled={!usd}>
            환전하기
          </ExchangeButton>
        </>
      ) : (
        <ResultText>환율 정보를 불러오는 중입니다...</ResultText>
      )}
    </Box>
  );
};

export default USDExchangeRate;
