import styled from 'styled-components';
import ETFIcon from '@/assets/ETFBox/ETFIcon.png';

const Box = styled.div<{ $isRecommend: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-left: ${({ $isRecommend }) => ($isRecommend ? '3rem' : '0.7rem')};
  margin-right: 0.3rem;
  font-weight: bold;
  padding: 1rme;
  border-radius: 8px;
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
  margin-bottom: 0.3rem;
`;

const ETFTitle = styled.div`
  font-size: 1.1rem;
  color: white;
`;

const ETFContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.1rem;
`;

const ETFPrice = styled.div`
  font-size: 1.1rem;
  color: white;
`;

const ETFTransPrice = styled.div<{ $transPrice?: number }>`
  font-size: 0.8rem;
  color: ${({ $transPrice }) => ($transPrice && $transPrice > 0 ? '#FF0000' : '#0064FF')};
  font-weight: lighter;
`;

const ETFChangePercent = styled.div<{ $changePercent?: string }>`
  font-size: 0.8rem;
  color: ${({ $changePercent }) =>
    $changePercent && parseFloat($changePercent) > 0 ? '#FF0000' : '#0064FF'};
  font-weight: lighter;
`;
const EtfPriceContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.2rem;
`;

interface Props {
  name: string;
  price: number;
  transPrice?: number;
  changePercent?: string;
  isRecommend: boolean;
  isImageVisible?: boolean;
  onClick?: () => void; // ✅ 클릭 이벤트 추가
}

function ETFBox({
  name,
  price,
  transPrice = 0,
  changePercent,
  isRecommend,
  isImageVisible = true,
  onClick,
}: Props) {
  return (
    <Box $isRecommend={isRecommend} onClick={onClick}>
      {' '}
      {isImageVisible && <ETFImg src={ETFIcon} alt="ETF Icon" />}
      {/* ✅ 클릭 이벤트 적용 */}
      <ETFContentBox>
        <ETFTitle>{name}</ETFTitle>
        <ETFContent>
          <ETFPrice>{price.toLocaleString()}USD</ETFPrice>
          <EtfPriceContent>
            <ETFTransPrice $transPrice={transPrice}>
              {transPrice > 0
                ? `+${transPrice.toLocaleString()}`
                : `${transPrice.toLocaleString()}`}
            </ETFTransPrice>
            <ETFChangePercent style={{ color: transPrice > 0 ? '#FF0000' : '#0064FF' }}>
              ({changePercent}%)
            </ETFChangePercent>
          </EtfPriceContent>
        </ETFContent>
      </ETFContentBox>
    </Box>
  );
}

export default ETFBox;
