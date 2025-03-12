import styled from 'styled-components';
import Lottie from 'lottie-react';
import Heart from '@/assets/donatePage/Heart';
import Btn from '@/components/Btn';
import { colors } from '@/styles/colors';
import PressMotion from '@/components/PressMotion';
import ReactConfetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  padding-top: 10rem;
  gap: 2.5rem;
`;

const Text = styled.div`
  font-size: 2rem;
  text-align: center;
  font-weight: 700;
  width: 100%;
`;

const StyledLottie = styled(Lottie)`
  width: 17rem;
  height: 17rem;
`;

export default function DonateSetFinish() {
  const navigate = useNavigate();

  const handleBtn = () => {
    navigate('/donatehome');
  };

  return (
    <Container>
      {/* <ReactConfetti numberOfPieces={150} recycle={false} gravity={0.2} />/// */}
      <Text>기부 목표 설정 완료!</Text>
      <StyledLottie animationData={Heart} loop={true} />
      <Btn bgColor={colors.LightBlue} handleBtn={handleBtn}>
        <PressMotion>
          <div style={{ width: '12rem', fontWeight: '700' }}>기부하러 가기</div>
        </PressMotion>
      </Btn>
    </Container>
  );
}
