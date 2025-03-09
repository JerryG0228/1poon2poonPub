import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { colors } from '@/styles/colors';
import styled, { keyframes, css, Keyframes } from 'styled-components';
import lv1 from '@/assets/characterbox/0.png';
import lv2 from '@/assets/characterbox/25.png';
import lv3 from '@/assets/characterbox/50.png';
import lv4 from '@/assets/characterbox/75.png';
import present from '@/assets/characterbox/present.json';
import coin from '@/assets/characterbox/getCoin.json';
import getCoin from '@/assets/characterbox/coin.json';
import donateComplete from '@/assets/characterbox/donateComplete.json';
import Lottie from 'lottie-react';
import useStore from '@/store/User';

const Jello = keyframes` // 모찌 리액션
  0% { transform: scale3d(1,1,1); }
  30% { transform: scale3d(0.65,1.15,1); }
  40% { transform: scale3d(1.15,0.65,1); }
  50% { transform: scale3d(0.75,1.25,1); }
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
    -webkit-transform: translateX(-800px) rotate(-540deg);
            transform: translateX(-800px) rotate(-540deg);
    opacity: 0;
  }
`;

const Jump = keyframes` // 점프 모션
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
    transform: scale3d(0.8, 0.9, 1) translateY(-7rem); /* 점프 후반 */
  }
  70% {
    transform: scale3d(0.7, 1, 1) translateY(-9rem); /* 점프 최고점 */
  }
  80% {
    transform: scale3d(0.8, 1, 1) translateY(-8rem); /* 점프 하강 */
  }
  90% {
    transform: scale3d(0.9, 1, 1) translateY(-4rem); /* 착지 직전 */
  }
  100% {
    transform: scale3d(1, 1, 1) translateY(0); /* 원래 상태로 돌아옴 */
  }
`;

const Shake = keyframes`
  0%,
  100% {
            transform: translateX(0%);
            transform-origin: 50% 50%;
  }
  15% {
            transform: translateX(-23px) rotate(-20deg);
  }
  30% {
            transform: translateX(23px) rotate(20deg);
  }
  45% {
            transform: translateX(-10px) rotate(-10deg);
  }
  60% {
            transform: translateX(10px) rotate(10deg);
  }
  75% {
            transform: translateX(-5px) rotate(-5deg);
  }`;

const CoinMessage = keyframes`
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-50px);
            transform: translateY(-50px);
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.05rem;
`;

const StyledLottieMore = styled(Lottie)<{ growth: number }>`
  width: ${(props) => props.growth * 2 + 'rem'};
  height: ${(props) => props.growth * 2 + 'rem'};
`;

const StyledLottieLess = styled(Lottie)<{ growth: number }>`
  width: ${(props) => props.growth * 2.2 + 'rem'};
  height: ${(props) => props.growth * 2.2 + 'rem'};
`;

const aniList: Record<string, Keyframes> = {
  Jello: Jello,
  RunAway: RunAway,
  Jump: Jump,
  Shake: Shake,
};

const CharacterAni = styled.div<{ isActive: boolean; animate: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${(props) =>
    props.isActive &&
    css`
      animation: ${aniList[props.animate]} ${props.animate == 'RunAway' ? '2s' : '1s'}
        ${props.animate == 'RunAway' ? 'cubic-bezier(0.65 , -0.7, 0.4, 1.75)' : 'ease-in-out'};
    `}
`;

const CharacterImg = styled.img<{ growth: number }>`
  width: ${(props) => props.growth + 'rem'};
  height: ${(props) => props.growth + 'rem'};
  z-index: 1;
`;

const CharacterName = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const LottieWrapperTop = styled.div<{ isVisible: boolean; growth: number }>`
  position: absolute; /* 캐릭터 이미지 위에 배치 */
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%); /* 중앙 정렬 */
  width: ${(props) => props.growth * 2 + 'rem'};
  height: ${(props) => props.growth * 2 + 'rem'};
  pointer-events: none; /* Lottie 애니메이션이 클릭 이벤트를 방해하지 않도록 설정 */
  z-index: 0;
`;

const LottieWrapperBottom = styled.div<{ isVisible: boolean; growth: number }>`
  position: absolute; /* 캐릭터 이미지 위에 배치 */
  top: 68%;
  left: 45%;
  transform: translate(-50%, -50%) rotate(70deg); /* 중앙 정렬 */
  pointer-events: none; /* Lottie 애니메이션이 클릭 이벤트를 방해하지 않도록 설정 */
  z-index: 0;
`;

const CoinWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 1.7rem;
  padding-bottom: 1rem;
`;

const GetCoin = styled.div<{ isClicked: boolean }>`
  display: ${(props) => (props.isClicked ? 'inline-block' : 'none')};
  background-color: ${colors.Grey};
  border-radius: 0.5rem;
  width: 2rem;
  text-align: center;
  padding: 0.3rem, 0.6rem;
  animation: ${CoinMessage} 1.3s ease-in-out;
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
  const { goalDonations } = useStore();
  const [character, setCharacter] = useState<string>('');
  const [growth, setGrowth] = useState<number>(10);
  const [isActive, setIsActive] = useState<boolean>(false); // 애니메이션 진행 상태
  const [isClickable, setIsClickable] = useState<boolean>(true); // 캐릭터 클릭 가능 상태
  const [animate, setAnimate] = useState<string>('');
  const [isLottieVisible, setIsLottieVisible] = useState(false);
  const [getCoinCount, setGetCoinCount] = useState<number>(5);
  const [isClicked, setIsClicked] = useState(false);
  const [getPoint, setGetPoint] = useState(0);
  const spring = useSpring(0, { mass: 0.8, stiffness: 50, damping: 15 });
  const animatedValue = useTransform(spring, (current) => Math.round(current).toLocaleString());

  //랜덤 애니메이션 설정
  const weightedRandomAnimation = () => {
    const weightedAnimations = [
      { name: 'Jello', weight: 40 }, // 40% 확률
      { name: 'RunAway', weight: 10 }, // 10% 확률
      { name: 'Jump', weight: 20 }, // 20% 확률
      { name: 'Shake', weight: 30 }, // 30% 확률
    ];

    const totalWeight = weightedAnimations.reduce((acc, anim) => acc + anim.weight, 0);
    const randomNum = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    for (const anim of weightedAnimations) {
      cumulativeWeight += anim.weight;
      if (randomNum < cumulativeWeight) {
        return anim.name;
      }
    }
    return 'Jello'; // 기본값
  };

  const getRandomPoint = () => {
    return Math.floor(Math.random() * 10) + 1;
  };

  // 애니메이션 트리거 함수
  const handleClick = () => {
    if (!isClickable) return;
    setIsActive(true); // 애니메이션 시작
    setIsClickable(false); // 애니메이션 종료 후 클릭 가능

    //코인 얻을 때 까진 말랑말랑, 횟수 끝나면 랜덤 모션 재생
    if (getCoinCount > 0) {
      setIsLottieVisible(true);
      setGetCoinCount(getCoinCount - 1);
      setIsClicked(true);

      const randomPoint = getRandomPoint();
      setGetPoint(randomPoint);
      setAnimate(randomPoint > 5 ? 'Jello' : 'Shake');
    } else {
      setAnimate(weightedRandomAnimation());
    }

    setTimeout(() => {
      setIsActive(false); // 애니메이션 종료
      setIsClickable(true); // 애니메이션 종료 후 클릭 가능
      setIsLottieVisible(false); // 일정 시간이 지나면 Lottie 숨김
      setIsClicked(false);
    }, 1000); // 1.3초 후 애니메이션 후 상태 초기화
  };

  useEffect(() => {
    spring.set(currDonate);
  }, [currDonate, spring]);
  const per = Math.round((currDonate / targetDonate) * 100);
  useEffect(() => {
    if (per < 25 && goalDonations > 0) {
      setCharacter(lv1);
      setGrowth(7);
    } else if (per >= 25 && per < 50) {
      setCharacter(lv2);
      setGrowth(8);
    } else if (per >= 50 && per < 75) {
      setCharacter(lv3);
      setGrowth(10);
    } else if (per >= 75 && per < 100) {
      setCharacter(lv4);
      setGrowth(11);
    } else if (goalDonations == 0) {
      setCharacter(donateComplete);
    } else setCharacter(present);
  }, [currDonate, targetDonate, character]);

  return (
    <Wrapper>
      <div style={{ marginLeft: '20rem' }}>{getCoinCount}/5</div>
      <div style={{ position: 'relative', marginTop: (13 % growth) + 1 + 'rem' }}>
        {per === 100 ? (
          <Lottie animationData={present} loop={true} style={{ width: '12rem', height: '12rem' }} />
        ) : goalDonations == 0 ? (
          <Lottie
            animationData={donateComplete}
            loop={true}
            style={{ width: '12rem', height: '12rem' }}
          />
        ) : (
          <>
            {getPoint > 5 ? (
              <LottieWrapperTop>
                {isLottieVisible && (
                  <StyledLottieMore animationData={coin} loop={true} growth={growth} />
                )}
              </LottieWrapperTop>
            ) : (
              <LottieWrapperBottom>
                {isLottieVisible && (
                  <StyledLottieLess animationData={getCoin} loop={true} growth={growth} />
                )}
              </LottieWrapperBottom>
            )}

            <CoinWrapper>
              <GetCoin isClicked={isClicked}>+{getPoint}</GetCoin>
              <div style={{ visibility: 'hidden' }}>1</div>
            </CoinWrapper>
            <CharacterAni isActive={isActive} animate={animate} onClick={() => handleClick()}>
              <CharacterImg src={character} alt="캐릭터" growth={growth} />
            </CharacterAni>
          </>
        )}
      </div>
      <CharacterName>한푼이</CharacterName>
      <TextBox>
        <Donate>{targetDonate > 0 ? animatedValue : '?'}</Donate>
        <Target>/</Target>
        <Target>{targetDonate > 0 ? targetDonate.toLocaleString() : '?'}</Target>
      </TextBox>
    </Wrapper>
  );
}
