import styled, { keyframes, css } from 'styled-components';
import { useState } from 'react';

// 회전 애니메이션 정의
const rotateInVer = keyframes`
  0% {
    transform: rotateY(90deg);
    opacity: 0;
  }
  100% {
    transform: rotateY(0);
    opacity: 1;
  }
`;

// 애니메이션 적용 스타일
const AnimatedWrapper = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;

  ${({ isActive }) =>
    isActive &&
    css`
      animation: ${rotateInVer} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    `}
`;

interface AnimatedComponentProps {
  children: React.ReactNode;
}

const AnimatedComponent: React.FC<AnimatedComponentProps> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(false); // 먼저 초기화
    setTimeout(() => setIsActive(true), 10); // 애니메이션 재실행
  };

  return (
    <AnimatedWrapper isActive={isActive} onClick={handleClick}>
      {children}
    </AnimatedWrapper>
  );
};

export default AnimatedComponent;
