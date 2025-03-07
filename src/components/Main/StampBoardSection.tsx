import styled from 'styled-components';
import TitleBox from '@components/TitleBox';
import PressMotion from '@components/PressMotion';
import Btn from '@components/Btn';
import AnimatedComponent from '@components/CoinRotate';
import oneCoin from '@/assets/Coin/100coin.png';
import fiveCoin from '@/assets/Coin/500coin.png';
import oneCoinBack from '@/assets/Coin/100coinback.png';
import fiveCoinBack from '@/assets/Coin/500coinback.png';
import { colors } from '@/styles/colors';
import FlipImage from '../FlipImage';

const StampBoard = styled.div<{ isFull: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OverLay = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.8rem 0;
  gap: 1rem;
  align-items: center;
`;

const OverlayText = styled.div`
  font-size: 1.2rem;
`;

const Board = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
  row-gap: 1rem;
  column-gap: 1rem;
`;

const Circle = styled.div<{ index: number; hasImage: boolean }>`
  display: flex;
  width: 13vw;
  height: 13vw;
  max-width: 56px;
  max-height: 56px;
  border-radius: 3rem;
  background-color: ${({ hasImage }) => (hasImage ? 'transparent' : '#ffffff')};
`;

interface StampBoardSectionProps {
  stamps: number[];
  isFull: boolean;
  handlePointCalculate: () => void;
}

export default function StampBoardSection({
  stamps,
  isFull,
  handlePointCalculate,
}: StampBoardSectionProps) {
  const totalStamps = 10;

  return (
    <>
      <TitleBox title="캐시백 스탬프판">
        <StampBoard isFull={isFull}>
          {isFull ? (
            <OverLay>
              <OverlayText>스탬프 10개를 다 모았습니다!</OverlayText>
              <PressMotion>
                <Btn bgColor={colors.Blue} handleBtn={handlePointCalculate}>
                  포인트 전환
                </Btn>
              </PressMotion>
            </OverLay>
          ) : (
            <Board>
              {[...Array(totalStamps)].map(
                (
                  _, //빈 배열 생성했으므로 명시
                  index: number, // index 추가
                ) =>
                  stamps[index] ? (
                    <AnimatedComponent key={index}>
                      <Circle hasImage={true}>
                        <FlipImage
                          srcA={stamps[index] === 500 ? fiveCoin : oneCoin}
                          srcB={stamps[index] === 500 ? fiveCoinBack : oneCoinBack}
                          alt={`${stamps[index]}원 동전`}
                        />
                      </Circle>
                    </AnimatedComponent>
                  ) : (
                    <Circle key={index} />
                  ),
              )}
            </Board>
          )}
        </StampBoard>
      </TitleBox>
    </>
  );
}
