import styled from 'styled-components';
import Lottie from 'lottie-react';
import payComplete from '@/assets/Pay/payComplete.json';
import Btn from '@/components/Btn';
import { colors } from '@/styles/colors';
import PressMotion from '@/components/PressMotion';
import ReactConfetti from 'react-confetti';
import { Link } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  #root {
    background-color: white !important;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  padding-top: 10rem;
  gap: 2.5rem;
`;

const Text = styled.div`
  color: ${colors.Black};
  font-size: 2rem;
  text-align: center;
  font-weight: 700;
  width: 100%;
`;

const StyledLottie = styled(Lottie)`
  width: 17rem;
  height: 17rem;
`;

export default function PayComplete() {
  return (
    <Container>
      <GlobalStyle />
      <Text>결제가 완료되었습니다!</Text>
      <ReactConfetti numberOfPieces={100} recycle={false} gravity={0.2} />
      <StyledLottie animationData={payComplete} loop={true} />
      <Link to="/">
        <Btn bgColor={colors.LightBlue} handleBtn={() => {}}>
          <PressMotion>
            <div style={{ width: '12rem', fontWeight: '700' }}>결제 완료</div>
          </PressMotion>
        </Btn>
      </Link>
    </Container>
  );
}
