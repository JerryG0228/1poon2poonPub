import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { colors } from '@/styles/colors';
import styled, { keyframes, css } from 'styled-components';
import lv1 from '@/assets/characterbox/0.png';
import lv2 from '@/assets/characterbox/25.png';
import lv3 from '@/assets/characterbox/50.png';
import lv4 from '@/assets/characterbox/75.png';
import present from '@/assets/characterbox/present.json';
import Lottie from 'lottie-react';

const jello = keyframes`
  0% { transform: scale3d(1,1,1); }
  30% { transform: scale3d(0.75,1.25,1); }
  40% { transform: scale3d(1.25,0.75,1); }
  50% { transform: scale3d(0.85,1.15,1); }
  65% { transform: scale3d(1.05,0.95,1); }
  75% { transform: scale3d(0.95,1.05,1); }
  100% { transform: scale3d(1,1,1); }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const CharacterAni = styled.div<{ isActive: boolean }>`
  ${(props) =>
    props.isActive &&
    css`
      animation: ${jello} 1s ease-in-out;
    `}
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
  const [isActive, setIsActive] = useState(false);

  const spring = useSpring(0, { mass: 0.8, stiffness: 50, damping: 15 });
  const animatedValue = useTransform(spring, (current) => Math.round(current).toLocaleString());

  // 애니메이션 트리거 함수
  const handleClick = () => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), 900); // 애니메이션 후 상태 초기화
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
      <CharacterAni isActive={isActive} onClick={handleClick}>
        <div style={{ position: 'relative' }}>
          {per === 100 ? (
            <Lottie
              animationData={present}
              loop={true}
              style={{ width: '12rem', height: '12rem' }}
            />
          ) : (
            <CharacterImg src={character} alt="캐릭터" />
          )}
        </div>
      </CharacterAni>
      <TextBox>
        <Donate>{animatedValue}</Donate>
        <Target>/</Target>
        <Target>{targetDonate.toLocaleString()}</Target>
      </TextBox>
    </Wrapper>
  );
}
