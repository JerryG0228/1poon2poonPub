import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem;
  min-height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
`;

const Price = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
`;

const ChangeBox = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${({ color }) => color || 'white'};
`;

const InputBox = styled.div`
  background: #2a2f3a;
  padding: 1.2rem;
  border-radius: 10px;
  margin-top: 1rem;
`;

const Input = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.2rem;
  text-align: center;
  outline: none;
`;

const SellButton = styled.button`
  width: 100%;
  height: 3.5rem;
  margin-top: 2rem;
  border-radius: 10px;
  background-color: #0064ff;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

const ETFSell = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState('');

  if (!state) return <Container>잘못된 접근입니다.</Container>;

  const { symbol, currentPrice, priceChange, changePercent } = state;

  return (
    <Container>
      <Title>{symbol} ETF 판매</Title>
      <Price>{currentPrice} USD</Price>
      <ChangeBox color={priceChange > 0 ? 'red' : 'blue'}>
        {priceChange} USD ({changePercent}%)
      </ChangeBox>

      <InputBox>
        <p>예상 체결가</p>
        <Input value="100,000원" readOnly />
      </InputBox>
      <InputBox>
        <p>수량</p>
        <Input
          type="number"
          placeholder="몇 주 판매할까요?"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </InputBox>
      <SellButton onClick={() => navigate(-1)}>판매하기</SellButton>
    </Container>
  );
};

export default ETFSell;
