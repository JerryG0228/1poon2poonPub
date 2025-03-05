import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ETFIcon from '@/assets/ETFBox/ETFIcon.png';
import { FaHeart } from 'react-icons/fa';

const Box = styled.div<{ $isRecommend: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-left: ${({ $isRecommend }) => ($isRecommend ? '1.5rem' : '0.5rem')};
  margin-right: 0.3rem;
  font-weight: bold;
  /* padding: 1rem; */
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-left: ${({ $isRecommend }) => ($isRecommend ? '3rem' : '0.7rem')};
  margin-right: 1.1rem;
  font-weight: bold;
  /* padding: 1rme; */
  border-radius: 8px;
  position: relative;
`;

const ETFImg = styled.img`
  width: 2rem;
  height: 2rem;
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
  margin-right: 1.2rem;
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

const FavoriteButton = styled.button`
  position: absolute;
  top: 50%;
  right: -1rem;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
`;

interface Props {
  name: string;
  price: number;
  transPrice?: number;
  changePercent?: string;
  isRecommend: boolean;
  isImageVisible?: boolean;
  onClick?: () => void;
  onFavoriteToggle: (name: string) => void; // ✅ 관심 ETF 토글 핸들러
  isFavorite: boolean; // ✅ 관심 ETF 여부
}

function ETFBox({
  name,
  price,
  transPrice = 0,
  changePercent,
  isRecommend,
  isImageVisible = true,
  onClick,
  onFavoriteToggle,
  isFavorite,
}: Props) {
  return (
    <Box $isRecommend={isRecommend} onClick={onClick}>
      {isImageVisible && <ETFImg src={ETFIcon} alt="ETF Icon" />}

      {/* ✅ 관심 ETF 버튼 */}
      <FavoriteButton
        onClick={(e) => {
          e.stopPropagation();
          if (typeof onFavoriteToggle === 'function') {
            onFavoriteToggle(name);
            console.log(`✅ 하트 클릭됨: ${name}, 상태: ${!isFavorite}`);
          }
        }}
      >
        <FaHeart color={isFavorite ? '#FF0000' : '#CCCCCC'} /> {/* ❤️ 빨강 / 🤍 회색 */}
      </FavoriteButton>

      <ETFContentBox>
        <ETFTitle>{name}</ETFTitle>
        <ETFContent>
          <ETFPrice>{price.toLocaleString()} USD</ETFPrice>
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
