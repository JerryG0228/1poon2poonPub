import { useState, useEffect } from 'react';
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
  const location = useLocation();
  const navigate = useNavigate();
  const { symbol, currentPrice, priceChange, changePercent } = location.state || {};

  const [quantity, setQuantity] = useState<number | null>(null);
  const [ownedQuantity, setOwnedQuantity] = useState<number>(0);
  const totalPrice = quantity ? currentPrice * quantity : 0;

  /** ✅ 보유 수량 불러오기 */
  useEffect(() => {
    const existingStocks = JSON.parse(localStorage.getItem('myStocks') || '[]');
    const stockData = existingStocks.find((s) => s.name === symbol);
    setOwnedQuantity(stockData ? stockData.quantity : 0);
  }, [symbol]);

  /** ✅ 판매 버튼 클릭 시 */
  const handleBtn = () => {
    if (ownedQuantity === 0) {
      alert('보유 수량이 없습니다. 판매할 수 없습니다.');
      return;
    }

    if (quantity === null || quantity <= 0) {
      alert('수량을 입력해 주세요!');
      return;
    }

    if (quantity > ownedQuantity) {
      alert(`최대 ${ownedQuantity}주까지 판매할 수 있습니다.`);
      return;
    }

    // ✅ 기존 주식 데이터 가져오기
    const existingStocks = JSON.parse(localStorage.getItem('myStocks') || '[]');

    // ✅ 보유 주식 수량 감소
    const updatedStocks = existingStocks.map((s) => {
      if (s.name === symbol) {
        return { ...s, quantity: s.quantity - quantity };
      }
      return s;
    });

    // ✅ 0 이하가 되면 제거
    const filteredStocks = updatedStocks.filter((s) => s.quantity > 0);

    // ✅ 로컬스토리지 업데이트
    localStorage.setItem('myStocks', JSON.stringify(filteredStocks));

    navigate('/InvestmentHome');
  };

  /** ✅ 수량 입력 핸들러 */
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
            placeholder="몇 주 판매할까요?"
            value={quantity || ''}
            onChange={handleInput}
            $hasValue={Boolean(quantity)}
          />
        </AmountBox>
        <Text>보유 수량 {ownedQuantity > 0 ? `${ownedQuantity}주` : '(판매 불가)'}</Text>
      </InputWrapper>

      {/* 판매하기 버튼 (보유 수량이 0이면 비활성화) */}
      <SellBox onClick={ownedQuantity > 0 ? handleBtn : undefined}>
        <SellBtn $disabled={ownedQuantity === 0}>
          {ownedQuantity > 0 ? '판매하기' : '판매 불가'}
        </SellBtn>
      </SellBox>
    </Box>
  );
};

export default ETFSellSetting;
