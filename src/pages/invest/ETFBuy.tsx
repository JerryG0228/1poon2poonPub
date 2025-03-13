import { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useStore from '@/store/User';
import baseAxios from '@/apis/axiosInstance';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  font-weight: bold;
  padding: 1rem;
`;

const Title = styled.div`
  font-size: 1rem;
`;

const InputWrapper = styled.div`
  margin-top: 2.5rem;
  padding: 1rem;
  background-color: #313845;
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  height: 7rem;
`;

const Label = styled.p`
  font-size: 1.15rem;
  color: white;
`;

const AmountBox = styled.div`
  display: flex;
  align-items: baseline;
`;

const AmountText = styled.p<{ $isEmpty: boolean }>`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ $isEmpty }) => ($isEmpty ? '#bbbbbb' : 'white')};
`;

const InputAmount = styled.input<{ $hasValue: boolean }>`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ $hasValue }) => ($hasValue ? 'white' : '#bbbbbb')};
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;
  &:focus {
    outline: none;
  }
`;

const Unit = styled.span<{ $hasValue: boolean }>`
  font-size: 1.15rem;
  color: ${({ $hasValue }) => ($hasValue ? 'white' : '#bbbbbb')};
  margin-left: 0.3rem;
`;

const Text = styled.span`
  font-size: 0.8rem;
  color: #6b7683;
`;

const BuyBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BuyBtn = styled.div`
  background-color: #ef4452;
  width: 100%;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.6rem;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 19rem;
  cursor: pointer;
`;

const ETFTradeSetting = () => {
  const { symbol } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPrice = parseFloat(searchParams.get('currentPrice') || '0');
  const priceChange = parseFloat(searchParams.get('priceChange') || '0');
  const changePercent = parseFloat(searchParams.get('changePercent') || '0');

  const { username, dollars, updateDollars, setOwnedStocks } = useStore();
  const maxBuyableShares = currentPrice > 0 ? Math.floor(dollars / currentPrice) : 0;

  const [quantity, setQuantity] = useState<number | null>(null);
  const totalPrice = quantity ? currentPrice * quantity : 0;

  const handleBtn = async () => {
    if (!quantity || quantity <= 0) {
      alert('수량을 입력해 주세요!');
      return;
    }

    if (quantity > maxBuyableShares) {
      alert(`보유 달러가 부족합니다. 최대 구매 가능 수량은 ${maxBuyableShares}주입니다.`);
      return;
    }

    try {
      const response = await baseAxios.post('/invest/purchase', {
        name: username,
        etfName: symbol,
        price: currentPrice,
        changeRate: changePercent,
        quantity,
      });

      alert(`${symbol} ETF ${quantity}주 구매 완료!`);

      await updateDollars();

      if (response.data.ownedETFs) {
        setOwnedStocks(response.data.ownedETFs);
      }

      navigate('/InvestmentHome');
    } catch (error: any) {
      console.error('❌ 구매 실패 전체 에러:', error);

      if (error.response) {
        console.error('❌ 에러 응답 데이터:', error.response.data);
        alert(error.response.data.message || '구매 처리 중 오류가 발생했습니다.');
      } else {
        alert('서버와의 연결에 실패했습니다.');
      }
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setQuantity(value > 0 ? value : null);
  };

  return (
    <Box>
      <Title>{symbol} ETF</Title>
      <p style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>{currentPrice.toLocaleString()} USD</p>
      <p
        style={{ fontSize: '0.8rem', fontWeight: 'bold', color: priceChange > 0 ? 'red' : 'blue' }}
      >
        {priceChange > 0 ? `+${priceChange}` : priceChange} (
        {changePercent !== 0 ? `${changePercent.toFixed(2)}%` : '데이터 없음'})
      </p>

      <InputWrapper>
        <Label>예상체결가</Label>
        <AmountBox>
          <AmountText $isEmpty={totalPrice === 0}>
            {totalPrice > 0 ? totalPrice.toLocaleString() : '0'}
          </AmountText>
          <Unit $hasValue={Boolean(quantity)}>USD</Unit>
        </AmountBox>
      </InputWrapper>

      <InputWrapper>
        <Label>수량</Label>
        <AmountBox>
          <InputAmount
            type="number"
            placeholder="몇 주 구매할까요?"
            value={quantity || ''}
            onChange={handleInput}
            $hasValue={Boolean(quantity)}
          />
        </AmountBox>
        <Text>
          보유 달러 ${dollars.toLocaleString()} · 구매 가능 수량 {maxBuyableShares}주
        </Text>
      </InputWrapper>

      <BuyBox onClick={handleBtn}>
        <BuyBtn>구매하기</BuyBtn>
      </BuyBox>
    </Box>
  );
};

export default ETFTradeSetting;
