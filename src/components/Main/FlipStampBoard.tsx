import { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

// 180도 회전 애니메이션 (중간에 90도에서 화면 변경)
const rotate180 = keyframes`
  0% {
    transform: rotateY(0);
  }
  60% {
    transform: rotateY(90deg); /* 90도에서 화면 변경 */
  }
  100% {
    transform: rotateY(180deg);
  }
`;

// StampBoard 전체를 감싸는 컨테이너
const FlipWrapper = styled.div<{ isFlipping: boolean }>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  perspective: 1000px;
  // 회전 중 뒷면이 보이지 않도록 설정
  backface-visibility: hidden;

  ${({ isFlipping }) =>
    isFlipping &&
    css`
      animation: ${rotate180} 0.5s ease-in-out;
    `}
`;

interface FlipStampBoardProps {
  isFull: boolean;
  children: React.ReactNode;
}

const FlipStampBoard: React.FC<FlipStampBoardProps> = ({ isFull, children }) => {
  // 애니메이션 실행 여부
  const [isFlipping, setIsFlipping] = useState(false);
  // 현재 표시할 콘텐츠
  const [currentChildren, setCurrentChildren] = useState(children);
  // 초기 렌더링시 불필요한 애니메이션 방지
  const isFirstRender = useRef(true);
  // 이전 isFull 값을 저장하여 상태 변화 감지
  const prevIsFull = useRef(isFull);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevIsFull.current = isFull;
      return;
    }

    if (prevIsFull.current !== isFull) {
      setIsFlipping(true);

      // 90도(애니메이션 50%)에서 화면 변경
      setTimeout(() => {
        setCurrentChildren(children);
      }, 250); // 전체 0.5s 중 0.25s에서 변경

      // 180도(애니메이션 종료)에서 애니메이션 끝내기
      setTimeout(() => {
        setIsFlipping(false);
      }, 500);

      prevIsFull.current = isFull;
    }
  }, [isFull, children]);

  return <FlipWrapper isFlipping={isFlipping}>{currentChildren}</FlipWrapper>;
};

export default FlipStampBoard;
