import styled from 'styled-components';
import TitleBox from '@/components/TitleBox';
import PressMotion from '@/components/PressMotion';
import Btn from '@/components/Btn';
import AnimatedComponent from '@/components/CoinRotate';
import oneCoin from '@/assets/Coin/100coin.png';
import fiveCoin from '@/assets/Coin/500coin.png';
import { colors } from '@/styles/colors';

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

const Circle = styled.div<{ index: number }>`
  display: flex;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 3rem;
  background-color: #ffffff;
  > img {
    width: 3.2rem;
    height: 3.2rem;
  }
`;

interface StampBoardSectionProps {
  coins: number[];
  isFull: boolean;
  handlePointCalculate: () => void;
}

export default function StampBoardSection({
  coins,
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
                ) => (
                  <AnimatedComponent key={index}>
                    <Circle>
                      {coins[index] ? ( // 값이 있는 경우에만 이미지 표시
                        coins[index] === 500 ? (
                          <img src={fiveCoin} alt="500원 동전" />
                        ) : (
                          <img src={oneCoin} alt="100원 동전" />
                        )
                      ) : null}
                    </Circle>
                  </AnimatedComponent>
                ),
              )}
            </Board>
          )}
        </StampBoard>
      </TitleBox>
    </>
  );
}
