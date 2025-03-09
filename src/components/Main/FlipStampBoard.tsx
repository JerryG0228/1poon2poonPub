import { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

// 180도 회전 애니메이션 (중간에 90도에서 화면 변경)
const rotate180 = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(180deg);
  }
`;

// `StampBoard` 전체를 감싸는 컨테이너
const FlipWrapper = styled.div<{ isFlipping: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  perspective: 1000px;
  border: 1px solid red;

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
  const [isFlipping, setIsFlipping] = useState(false);
  const [currentChildren, setCurrentChildren] = useState(children);
  const isFirstRender = useRef(true);
  const prevIsFull = useRef(isFull);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevIsFull.current = isFull;
      return;
    }

    if (prevIsFull.current !== isFull) {
      setIsFlipping(true);

      // ✅ 90도(애니메이션 50%)에서 화면 변경
      setTimeout(() => {
        setCurrentChildren(children);
      }, 250); // 전체 0.5s 중 0.25s에서 변경

      // ✅ 180도(애니메이션 종료)에서 애니메이션 끝내기
      setTimeout(() => {
        setIsFlipping(false);
      }, 500);

      prevIsFull.current = isFull;
    }
  }, [isFull, children]);

  return <FlipWrapper isFlipping={isFlipping}>{currentChildren}</FlipWrapper>;
};

export default FlipStampBoard;
