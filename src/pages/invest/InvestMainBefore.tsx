import styled from 'styled-components';
import Btn from '@/components/Btn';
import { colors } from '@/styles/colors';
import PressMotion from '@/components/PressMotion';
import Lottie from 'lottie-react';
import InvestAni from '@/assets/InvestPage/Invest.json';
import { Link } from 'react-router-dom';

const Box = styled.div`
  position: absolute; /* 절대 위치 설정 */
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: auto;
`;

const StyledLottie = styled(Lottie)`
  width: 13rem;
  height: 13rem;
`;

const Text = styled.div`
  font-size: 1.3rem;
  text-align: center;
  font-weight: bold;
  width: 12rem;
`;

export default function InvestMainBefore() {
  return (
    <Box>
      <StyledLottie animationData={InvestAni} loop={true} />
      <Text>투자를 시작해볼까요?</Text>
      <Link to="">
        <Btn bgColor={colors.LightBlue} handleBtn={() => {}}>
          <PressMotion>
            <div style={{ width: '7rem' }}>선택하러 가기</div>
          </PressMotion>
        </Btn>
      </Link>
    </Box>
  );
}
