import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

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
  const { symbol } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // ✅ 쿼리 파라미터에서 ETF 데이터 가져오기
  const currentPrice = parseFloat(searchParams.get('currentPrice') || '0');
  const priceChange = parseFloat(searchParams.get('priceChange') || '0');
  const changePercent = parseFloat(searchParams.get('changePercent') || '0');

  const [quantity, setQuantity] = useState<number | null>(null);
  const [ownedQuantity, setOwnedQuantity] = useState<number>(0);
  const totalPrice = quantity ? currentPrice * quantity : 0;

  /** ✅ 보유 수량 가져오기 */
  /** ✅ 보유 수량 가져오기 */
  useEffect(() => {
    const fetchOwnedQuantity = async () => {
      try {
        // ✅ localStorage에서 데이터 가져오기 (빠른 표시)
        const localOwnedETFs = JSON.parse(localStorage.getItem('ownedETFs') || '[]');
        const localETF = localOwnedETFs.find((etf: any) => etf.name === symbol);
        if (localETF) {
          setOwnedQuantity(localETF.quantity);
        }

        // ✅ 백그라운드에서 최신 데이터 가져와 업데이트
        const response = await axios.get(`http://localhost:3000/invest/owned-etfs?name=tester`);
        if (response.data && response.data.ownedETFs) {
          // ✅ 최신 데이터 localStorage에 저장
          localStorage.setItem('ownedETFs', JSON.stringify(response.data.ownedETFs));

          // ✅ 현재 symbol과 일치하는 ETF 찾기
          const updatedETF = response.data.ownedETFs.find((etf: any) => etf.name === symbol);
          setOwnedQuantity(updatedETF ? updatedETF.quantity : 0);
        }
      } catch (error) {
        console.error('❌ 보유 수량 가져오기 실패:', error);
      }
    };

    fetchOwnedQuantity();
  }, [symbol]);

  const handleSell = async () => {
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

    try {
      // ✅ localStorage에서 ownedETFs 가져오기
      const storedETFs = JSON.parse(localStorage.getItem('ownedETFs') || '[]');

      // ✅ 현재 symbol에 해당하는 ETF 찾기
      const updatedETFs = storedETFs
        .map((etf: any) => {
          if (etf.name === symbol) {
            return { ...etf, quantity: etf.quantity - quantity };
          }
          return etf;
        })
        .filter((etf: any) => etf.quantity > 0); // ✅ 수량이 0 이하이면 제거

      // ✅ localStorage 업데이트
      localStorage.setItem('ownedETFs', JSON.stringify(updatedETFs));

      // ✅ 최신 보유 수량 반영
      const updatedETF = updatedETFs.find((etf: any) => etf.name === symbol);
      setOwnedQuantity(updatedETF ? updatedETF.quantity : 0);

      alert(`${symbol} ETF ${quantity}주 판매 완료!`);
      navigate('/InvestmentHome');
    } catch (error) {
      console.error('❌ 판매 실패:', error);
      alert('판매 처리 중 오류가 발생했습니다.');
    }
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
        {changePercent !== 0 ? `${changePercent.toFixed(2)}%` : '데이터 없음'})
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
      <SellBox onClick={ownedQuantity > 0 ? handleSell : undefined}>
        <SellBtn $disabled={ownedQuantity === 0}>
          {ownedQuantity > 0 ? '판매하기' : '판매 불가'}
        </SellBtn>
      </SellBox>
    </Box>
  );
};

export default ETFSellSetting;
