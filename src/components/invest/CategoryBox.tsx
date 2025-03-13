import { colors } from '@/styles/colors';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import { useEffect, useRef } from 'react';
const Wrapper = styled.div<{ $active: boolean }>`
  // "$active"로 변경하여 DOM 전달 방지!
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: ${({ $active }) => ($active ? 1.0 : 0.5)};
  cursor: pointer; // 클릭 가능하게 변경!
  transition: opacity 0.3s;
`;

const ImageWrapper = styled.div<{ isPay: boolean }>`
  display: flex;
  background-color: ${(props) => (props.isPay ? colors.Grey : '#313845')};
  padding: ${(props) => (props.isPay ? '0.8rem' : '2rem')};
  border-radius: 1rem;
`;

const ContentImg = styled.img`
  display: flex;
  width: 2.7rem;
  height: 2.7rem;
`;

const TitleBox = styled.div`
  width: 6rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentTitle = styled.div<{ isPay: boolean }>`
  display: flex;
  font-size: 1rem;
  color: ${(props) => (props.isPay ? colors.Black : colors.White)};
  margin: 0.5rem 0;
  text-align: center;
`;

const StyledLottie = styled(Lottie)`
  width: 5rem;
  height: 5rem;
`;

interface Props {
  title: string;
  imageSrc: string;
  active: boolean;
  isPay: boolean;
  onClick: () => void; // 클릭 이벤트 추가!
}

export default function CategoryBox({ title, imageSrc, active, isPay, onClick }: Props) {
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    if (lottieRef.current && typeof imageSrc === 'object') {
      if (active) {
        lottieRef.current.play(); // 활성화되면 재생
      } else {
        lottieRef.current.goToAndStop(60, true);
      }
    }
  }, [active]); // active 상태가 변경될 때 실행

  const handleClick = () => {
    if (lottieRef.current && typeof imageSrc === 'object') {
      lottieRef.current.playSegments([0, 90], true);
    }
    onClick();
  };

  return (
    <>
      <Wrapper $active={active} onClick={handleClick}>
        <ImageWrapper isPay={isPay}>
          {isPay ? (
            <StyledLottie
              lottieRef={lottieRef}
              animationData={imageSrc}
              loop={false}
              autoplay={false}
              play={true}
            ></StyledLottie>
          ) : (
            <ContentImg src={imageSrc} alt={title} />
          )}
        </ImageWrapper>
        <TitleBox>
          <ContentTitle isPay={isPay}>{title}</ContentTitle>
        </TitleBox>
      </Wrapper>
    </>
  );
}
