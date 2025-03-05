import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  font-weight: bold;
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
  color: ${({ $isEmpty }) => ($isEmpty ? '#bbbbbb' : 'white')}; /* ✅ 숫자가 없을 때 회색 */
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
  color: ${({ $hasValue }) => ($hasValue ? 'white' : '#bbbbbb')}; /* ✅ 값 입력 시 하얀색 */
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
  const location = useLocation();
  const navigate = useNavigate();
  const { symbol, currentPrice, priceChange, changePercent } = location.state || {};

  // ✅ 더미 데이터: 사용자 보유 포인트 & 최대 구매 가능 주식 수
  const userPoints = 25000; // 사용자 보유 포인트 (예: 250,000원)
  const maxBuyableShares = Math.floor(userPoints / currentPrice); // 구매 가능 주식 수

  const [quantity, setQuantity] = useState<number | null>(null);
  const totalPrice = quantity ? currentPrice * quantity : 0;

  // "구매하기" 버튼 클릭 핸들러
  const handleBtn = () => {
    if (quantity === null || quantity <= 0) {
      alert('수량을 입력해 주세요!');
      return;
    }
    if (quantity > maxBuyableShares) {
      alert(`보유 포인트가 부족합니다. 최대 구매 가능 수량은 ${maxBuyableShares}주입니다.`);
      return;
    }

    // ✅ 기존 주식 데이터 가져오기
    const existingStocks = JSON.parse(localStorage.getItem('myStocks') || '[]');

    // ✅ 기존에 동일한 주식을 보유하고 있다면 업데이트
    const updatedStocks = [...existingStocks];
    const stockIndex = updatedStocks.findIndex((s) => s.name === symbol);
    if (stockIndex > -1) {
      updatedStocks[stockIndex].quantity += quantity;
    } else {
      updatedStocks.push({ name: symbol, price: currentPrice, quantity });
    }

    // ✅ 새로운 주식 데이터 저장
    localStorage.setItem('myStocks', JSON.stringify(updatedStocks));

    navigate('/InvestmentHome');
  };

  // 수량 입력 핸들러
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
        {changePercent !== null ? `${changePercent.toFixed(2)}%` : '데이터 없음'})
      </p>

      {/* 예상 체결가 */}
      <InputWrapper>
        <Label>예상체결가</Label>
        <AmountBox>
          <AmountText $isEmpty={totalPrice === 0}>
            {totalPrice > 0 ? totalPrice.toLocaleString() : '0'}
          </AmountText>
          <Unit $hasValue={Boolean(quantity)}>USD</Unit>
        </AmountBox>
      </InputWrapper>

      {/* 수량 입력 */}
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
          보유 포인트 {userPoints.toLocaleString()}USD · 구매 가능 수량 {maxBuyableShares}주
        </Text>
      </InputWrapper>

      {/* 구매하기 버튼 */}
      <BuyBox onClick={handleBtn}>
        <BuyBtn>구매하기</BuyBtn>
      </BuyBox>
    </Box>
  );
};

export default ETFTradeSetting;
