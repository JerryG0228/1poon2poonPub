import styled from 'styled-components';
import Lottie from 'lottie-react';
import Heart from '@/assets/donatePage/Heart';
import Btn from '@/components/Btn';
import { colors } from '@/styles/colors';
import PressMotion from '@/components/PressMotion';
import ReactConfetti from 'react-confetti';
import useStore from '@/store/User';
import baseAxios from '@/apis/axiosInstance';
import { Link } from 'react-router-dom';

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

export default function DonateComplete() {
  const {
    updateTotalDonations,
    addBadge,
    updateCurrentDonations,
    setGoalDonations,
    setGoalCategory,
    goalDonations,
    username,
  } = useStore();

  const fetchData = async () => {
    await baseAxios
      .put('/donate/complete', {
        name: username,
      })
      .then((response) => {
        const data = response.data;
        addBadge(data.responseData[data.responseData.length - 1]);
        updateTotalDonations(goalDonations);
        updateCurrentDonations(-goalDonations);
        setGoalDonations(0);
        setGoalCategory('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Container>
      <ReactConfetti numberOfPieces={150} recycle={false} gravity={0.2} />
      <Text>감사합니다!</Text>
      <StyledLottie animationData={Heart} loop={true} />
      <Link to="/donatehome">
        <Btn bgColor={colors.LightBlue} handleBtn={fetchData}>
          <PressMotion>
            <div style={{ width: '12rem', fontWeight: '700' }}>기부 완료</div>
          </PressMotion>
        </Btn>
      </Link>
    </Container>
  );
}
