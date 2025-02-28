import styled from 'styled-components';
import ETFIcon from '@/assets/ETFBox/ETFIcon.png';

const Box = styled.div<{ isRecommend: boolean }>`
  display: flex;
  gap: 0.8rem;
  margin-left: ${(props) => (props.isRecommend ? '3.5rem' : '1rem')};
  margin-right: 1rem;
  font-weight: bold;
`;

const ETFImg = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;
const ETFContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
`;

const ETFTitle = styled.div`
  font-size: 1.1rem;
`;

const ETFContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 0.1rem;
  flex-grow: 1;
`;
const ETFPrice = styled.div`
  font-size: 1.1rem;
`;
const ETFTransPrice = styled.div<{ transPrice: number }>`
  font-size: 0.8rem;
  color: ${(props) => {
    return props.transPrice && props.transPrice > 0 ? '#FF0000' : '#0064FF';
  }};
  font-weight: lighter;
`;

interface Props {
  name: string;
  price: number;
  transPrice: number;
  isRecommend: boolean;
}

function ETFBox({ name, price, transPrice, isRecommend }: Props) {
  //숫자 1000단위마다 ,추가
  const formatPrice = (price: number): string => {
    return price.toLocaleString();
  };

  return (
    <Box isRecommend={isRecommend}>
      <ETFImg src={ETFIcon}></ETFImg>
      <ETFContentBox>
        <ETFTitle>{name}</ETFTitle>
        <ETFContent>
          <ETFPrice>{formatPrice(price)}원</ETFPrice>
          <ETFTransPrice transPrice={transPrice}>
            {transPrice > 0 ? `+${formatPrice(transPrice)}` : formatPrice(transPrice)}
          </ETFTransPrice>
        </ETFContent>
      </ETFContentBox>
    </Box>
  );
}

export default ETFBox;
