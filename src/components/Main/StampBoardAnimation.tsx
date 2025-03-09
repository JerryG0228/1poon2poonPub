import { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

// 180도 회전 애니메이션
const rotateHalf = keyframes`
  0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(180deg);
  }
`;

const FlipWrapper = styled.div<{ isFlipping: boolean }>`
  display: inline-block;
  perspective: 1000px;
  width: 13vw;
  height: 13vw;
  max-width: 56px;
  max-height: 56px;
  position: relative;

  .side {
    width: 100%;
    height: 100%;
    position: absolute;
    transition: opacity 0.3s ease-in-out; /* 부드러운 전환 */
  }

  .front {
    transform: rotateY(0);
  }

  .back {
    transform: rotateY(180deg);
  }

  ${(props) =>
    props.isFlipping &&
    css`
      animation: ${rotateHalf} 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
    `}
`;

const StampImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

interface StampBoardAnimationProps {
  frontImage: string;
  backImage: string;
  isFlipped: boolean; // true면 뒤집힘
}

const StampBoardAnimation: React.FC<StampBoardAnimationProps> = ({
  frontImage,
  backImage,
  isFlipped,
}) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [showBack, setShowBack] = useState(isFlipped);

  useEffect(() => {
    if (isFlipped !== showBack) {
      setIsFlipping(true);

      // 180도 회전 후 이미지 변경
      setTimeout(() => {
        setShowBack(isFlipped);
      }, 250); // 절반 정도 회전한 후 이미지 변경

      // 애니메이션 종료 후 상태 초기화
      setTimeout(() => {
        setIsFlipping(false);
      }, 500);
    }
  }, [isFlipped, showBack]);

  return (
    <FlipWrapper isFlipping={isFlipping}>
      {showBack ? (
        <div className="side back">
          <StampImage src={backImage} alt="뒷면" />
        </div>
      ) : (
        <div className="side front">
          <StampImage src={frontImage} alt="앞면" />
        </div>
      )}
    </FlipWrapper>
  );
};

export default StampBoardAnimation;
