import { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

// 360도 회전 애니메이션
const rotateVertCenter = keyframes`
  0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(360deg);
  }
`;

const FlipWrapper = styled.div<{ isFlipping: boolean }>`
  display: inline-block;
  perspective: 1000px;
  cursor: pointer;
  width: 3.2rem; /* 동전 크기 */
  height: 3.2rem;
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
      animation: ${rotateVertCenter} 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
    `}
`;

const CoinImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface FlipImageProps {
  srcA: string;
  srcB: string;
  alt: string;
}

const FlipImage: React.FC<FlipImageProps> = ({ srcA, srcB, alt }) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [isFront, setIsFront] = useState(true); // 앞면 여부
  const [showBack, setShowBack] = useState(false); // 뒷면 표시 여부

  const handleClick = () => {
    setIsFlipping(true); // 애니메이션 시작

    // 180도에서 뒷면(`srcB`)으로 변경
    setTimeout(() => {
      setShowBack(true);
    }, 160);

    // 360도에서 다시 앞면(`srcA`)으로 전환
    setTimeout(() => {
      setIsFront(true);
      setShowBack(false); // 뒷면 숨김
      setIsFlipping(false);
    }, 500); // 애니메이션이 끝나는 순간 앞면으로 복구
  };

  return (
    <FlipWrapper isFlipping={isFlipping} onClick={handleClick}>
      {showBack ? (
        <div className="side back">
          <CoinImage src={srcB} alt={alt} />
        </div>
      ) : (
        <div className="side front">
          <CoinImage src={srcA} alt={alt} />
        </div>
      )}
    </FlipWrapper>
  );
};

export default FlipImage;
