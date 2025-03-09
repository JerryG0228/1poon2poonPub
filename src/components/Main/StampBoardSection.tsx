import styled from 'styled-components';
import TitleBox from '@components/TitleBox';
import PressMotion from '@components/PressMotion';
import Btn from '@components/Btn';
import AnimatedComponent from '@/components/Main/CoinRotate';
import oneCoin from '@/assets/Coin/100coin.png';
import fiveCoin from '@/assets/Coin/500coin.png';
import oneCoinBack from '@/assets/Coin/100coinback.png';
import fiveCoinBack from '@/assets/Coin/500coinback.png';
import { colors } from '@/styles/colors';
import FlipImage from './FlipImage';
import axios from 'axios';
import { useState, useEffect } from 'react';

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
  justify-content: center;
`;

const OverlayText = styled.div`
  font-size: 1.2rem;
  align-items: center;
  justify-content: center;
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
  background-color: ${({ hasImage }) => (hasImage ? 'transparent' : colors.Navy)};
`;

//props를 받는 부분
interface StampBoardSectionProps {
  stamps: number[];
  isFull: boolean;
  totalStamps: number;
  handlePointCalculate: () => void;
}

export default function StampBoardSection({
  stamps,
  isFull: initialIsFull, //부모 컴포넌트에서 전달한 isFull 값을 initialIsFull이라는 이름으로 받음
  totalStamps,
  handlePointCalculate,
}: StampBoardSectionProps) {
  const [isFull, setIsFull] = useState(initialIsFull); // 상태로 관리

  //스탬프 10개 이상이면 isFull=true로 설정
  useEffect(() => {
    setIsFull(stamps.length >= totalStamps);
  }, [stamps]);

  // 버튼 클릭시 실행되는 함수
  const handlePoints = async () => {
    try {
      const response = await axios.put('http://localhost:3000/user/resetStamp', {
        name: 'tester',
      });

      console.log('초기화된 스탬프:', response.data);

      // 빈 배열로 변경
      handlePointCalculate();

      //isFull 상태 변경
      setIsFull(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <TitleBox title="캐시백 스탬프판">
        <StampBoard isFull={isFull}>
          {isFull ? (
            <OverLay>
              <OverlayText>스탬프 10개를 다 모았습니다!</OverlayText>
              <div>
                <Btn bgColor={colors.Blue} handleBtn={handlePoints}>
                  <PressMotion>
                    <div
                      style={{
                        display: 'flex',
                        width: '7rem',
                        height: '0.6rem',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      포인트 전환
                    </div>
                  </PressMotion>
                </Btn>
              </div>
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
