import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { colors } from '@/styles/colors';
import styled, { keyframes, css, Keyframes } from 'styled-components';
import lv1 from '@/assets/characterbox/0.png';
import lv2 from '@/assets/characterbox/25.png';
import lv3 from '@/assets/characterbox/50.png';
import lv4 from '@/assets/characterbox/75.png';
import present from '@/assets/characterbox/present.json';
import Lottie from 'lottie-react';

const Jello = keyframes` // 모찌 리액션
  0% { transform: scale3d(1,1,1); }
  30% { transform: scale3d(0.75,1.25,1); }
  40% { transform: scale3d(1.25,0.75,1); }
  50% { transform: scale3d(0.85,1.15,1); }
  65% { transform: scale3d(1.05,0.95,1); }
  75% { transform: scale3d(0.95,1.05,1); }
  100% { transform: scale3d(1,1,1); }
`;

const RunAway = keyframes` //easeInBack - 도망가는 모션 cubic-bezier(0.68, -0.55, 0.27, 1.55)
  0% {
    -webkit-transform: translateX(0) rotate(0deg);
            transform: translateX(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(-1000px) rotate(-540deg);
            transform: translateX(-1000px) rotate(-540deg);
    opacity: 0;
  }
`;

const Enter = keyframes`
  0% {
    -webkit-transform: translateY(600px) rotateX(30deg) scale(0);
            transform: translateY(600px) rotateX(30deg) scale(0);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0) rotateX(0) scale(1);
            transform: translateY(0) rotateX(0) scale(1);
    -webkit-transform-origin: 50% -1400px;
            transform-origin: 50% -1400px;
    opacity: 1;
  }
`;

const Jump = keyframes`
  0% {
    transform: scale3d(1, 1, 1) translateY(0); /* 원래 상태 */
  }
  10% {
    transform: scale3d(1, 0.6, 1) translateY(2rem); /* 앉기 시작 */
  }
  20% {
    transform: scale3d(1, 0.4, 1) translateY(5rem); /* 점차적으로 앉음 */
  }
  30% {
    transform: scale3d(1, 0.3, 1) translateY(7.5rem); /* 완전히 앉음 */
  }
  40% {
    transform: scale3d(1, 0.5, 1) translateY(2rem); /* 점프 시작 */
  }
  50% {
    transform: scale3d(0.9, 0.7, 1) translateY(-3rem); /* 점프 중반 */
  }
  60% {
    transform: scale3d(0.8, 0.9, 1) translateY(-7rem); /* 점프 최고점 */
  }
  70% {
    transform: scale3d(0.7, 1, 1) translateY(-9rem); /* 점프 최고점 */
  }
  80% {
    transform: scale3d(0.8, 1, 1) translateY(-5rem); /* 점프 하강 */
  }
  90% {
    transform: scale3d(0.9, 1, 1) translateY(-2rem); /* 착지 직전 */
  }
  100% {
    transform: scale3d(1, 1, 1) translateY(0); /* 원래 상태로 돌아옴 */
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const aniList: Record<string, Keyframes> = {
  Jello: Jello,
  Enter: Enter,
  RunAway: RunAway,
  Jump: Jump,
};

const CharacterAni = styled.div<{ isActive: boolean; animate: string }>`
  ${(props) =>
    props.isActive &&
    css`
      animation: ${aniList[props.animate]} 1s
        ${props.animate == 'RunAway' ? 'cubic-bezier(0.68, -0.55, 0.27, 1.55)' : 'ease-in-out'};
    `}
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  background-color: transparent;
  color: ${colors.White};
  border: none;
  font-size: 1.2rem;
`;

const CharacterImg = styled.img`
  width: 10rem;
  height: 10rem;
`;

const TextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
`;

const Donate = styled(motion.div)`
  width: 10rem;

  display: flex;
  justify-content: flex-end;
  margin-right: 1rem;
`;

const Target = styled.div`
  color: ${colors.Grey};

  &:last-child {
    width: 10rem;
    margin-left: 1rem;
  }
`;

interface Props {
  currDonate: number;
  targetDonate: number;
}

export default function CharacterBox({ currDonate, targetDonate }: Props) {
  const [character, setCharacter] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false); // 애니메이션 진행 상태
  const [isClickable, setIsClickable] = useState<boolean>(true); // 캐릭터 클릭 가능 상태
  const [animate, setAnimate] = useState<string>('');

  const spring = useSpring(0, { mass: 0.8, stiffness: 50, damping: 15 });
  const animatedValue = useTransform(spring, (current) => Math.round(current).toLocaleString());

  // 애니메이션 트리거 함수
  const handleClick = (animate: string) => {
    if (!isClickable) return;
    setAnimate(animate);
    setIsActive(true); // 애니메이션 시작
    setIsClickable(false); // 애니메이션 종료 후 클릭 가능

    setTimeout(() => {
      setIsActive(false); // 애니메이션 종료
      setIsClickable(true); // 애니메이션 종료 후 클릭 가능
    }, 1300); // 1.3초 후 애니메이션 후 상태 초기화
  };

  useEffect(() => {
    spring.set(currDonate);
  }, [currDonate, spring]);
  const per = Math.round((currDonate / targetDonate) * 100);
  useEffect(() => {
    if (per < 25) setCharacter(lv1);
    else if (per >= 25 && per < 50) setCharacter(lv2);
    else if (per >= 50 && per < 75) setCharacter(lv3);
    else if (per >= 75 && per < 100) setCharacter(lv4);
    else setCharacter(present);
  }, []);

  return (
    <Wrapper>
      <ButtonBox>
        <ActionButton onClick={() => handleClick('Jello')}>말랑말랑</ActionButton>
        <ActionButton onClick={() => handleClick('RunAway')}>도망가기</ActionButton>
        <ActionButton onClick={() => handleClick('Jump')}>점프하기</ActionButton>
        <ActionButton onClick={() => handleClick('Enter')}>날아오기</ActionButton>
      </ButtonBox>
      <div style={{ position: 'relative' }}>
        {per === 100 ? (
          <Lottie animationData={present} loop={true} style={{ width: '12rem', height: '12rem' }} />
        ) : (
          <CharacterAni isActive={isActive} animate={animate}>
            <CharacterImg src={character} alt="캐릭터" />
          </CharacterAni>
        )}
      </div>
      <TextBox>
        <Donate>{animatedValue}</Donate>
        <Target>/</Target>
        <Target>{targetDonate.toLocaleString()}</Target>
      </TextBox>
    </Wrapper>
  );
}
