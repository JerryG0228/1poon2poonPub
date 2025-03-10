import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import useStore from '@/store/User';

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
  font-size: 0.7rem;
  color: #6b7683;
`;

const SellBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SellBtn = styled.div<{ $disabled: boolean }>`
  background-color: ${({ $disabled }) => ($disabled ? '#6b7683' : '#3182f6')};
  width: 100%;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.6rem;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 19.5rem;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
`;

const ETFSellSetting = () => {
  const { symbol } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { username, ownedStocks, setOwnedStocks } = useStore(); // ✅ zustand에서 username 불러옴

  const currentPrice = parseFloat(searchParams.get('currentPrice') || '0');
  const priceChange = parseFloat(searchParams.get('priceChange') || '0');
  const changePercent = parseFloat(searchParams.get('changePercent') || '0');

  const [quantity, setQuantity] = useState<number | null>(null);
  const [ownedQuantity, setOwnedQuantity] = useState<number>(0);
  const totalPrice = quantity ? currentPrice * quantity : 0;

  // ✅ DB에서 보유 수량 가져오기
  useEffect(() => {
    if (symbol && ownedStocks.length > 0) {
      const stock = ownedStocks.find((etf) => etf.name === symbol);
      setOwnedQuantity(stock ? stock.quantity : 0);
    }
  }, [symbol, ownedStocks]);

  // ✅ 판매 처리
  const handleSell = async () => {
    if (!quantity || quantity <= 0) {
      alert('수량을 입력해 주세요!');
      return;
    }

    if (quantity > ownedQuantity) {
      alert(`최대 ${ownedQuantity}주까지 판매할 수 있습니다.`);
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/invest/sell', {
        name: username,
        etfName: symbol,
        quantity,
      });

      alert(res.data.message || 'ETF 판매가 완료되었습니다.');

      // ✅ 상태 업데이트: 판매 수량 반영
      const updatedStocks = ownedStocks
        .map((etf) => (etf.name === symbol ? { ...etf, quantity: etf.quantity - quantity } : etf))
        .filter((etf) => etf.quantity > 0); // 수량 0이면 제거

      setOwnedStocks(updatedStocks);

      navigate('/InvestmentHome');
    } catch (error: any) {
      console.error('❌ 판매 실패:', error);
      alert(error?.response?.data?.message || '판매 처리 중 오류가 발생했습니다.');
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setQuantity(val > 0 ? val : null);
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
            placeholder="몇 주 판매할까요?"
            value={quantity || ''}
            onChange={handleInput}
            $hasValue={Boolean(quantity)}
          />
        </AmountBox>
        <Text>보유 수량 {ownedQuantity > 0 ? `${ownedQuantity}주` : '(판매 불가)'}</Text>
      </InputWrapper>

      <SellBox onClick={ownedQuantity > 0 ? handleSell : undefined}>
        <SellBtn $disabled={ownedQuantity === 0}>
          {ownedQuantity > 0 ? '판매하기' : '판매 불가'}
        </SellBtn>
      </SellBox>
    </Box>
  );
};

export default ETFSellSetting;
