import styled from 'styled-components';
import Lottie from 'lottie-react';
import Btn from '@/components/Btn';
import WithDrawImg from '@/assets/Main/Withdraw.json';
import { colors } from '@/styles/colors';
import PressMotion from '@/components/PressMotion';
import ReactConfetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
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

const BtnWrap = styled.div`
  margin-top: 5rem;
`;

export default function WithDrawFinish() {
  const navigate = useNavigate();

  const handleBtn = () => {
    navigate('/pointhistory');
  };

  return (
    <Container>
      <ReactConfetti numberOfPieces={150} recycle={false} gravity={0.2} />
      <Text>출금 완료!</Text>
      <StyledLottie animationData={WithDrawImg} loop={true} />
      <BtnWrap>
        <Btn bgColor={colors.LightBlue} handleBtn={handleBtn}>
          <PressMotion>
            <div style={{ width: '12rem', letterSpacing: '0.1em', fontWeight: '700' }}>
              돌아가기
            </div>
          </PressMotion>
        </Btn>
      </BtnWrap>
    </Container>
  );
}
