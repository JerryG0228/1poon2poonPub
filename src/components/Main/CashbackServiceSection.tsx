import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PressMotion from '@/components/PressMotion';
import { colors } from '@/styles/colors';
import donateImage from '@/assets/Main/donateIcon.png';
import investUpImage from '@/assets/Main/investUpIcon.png';
import investDownImage from '@/assets/Main/investDownIcon.png';
import TitleBox from '@/components/TitleBox';
import useStore from '@/store/User';

const Service = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

const Button = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px sollid red;
  width: 7rem;
  justify-content: center;
  align-items: center;
  > img {
    width: 4rem;
    height: 4rem;
  }
`;

const ServiceTitle = styled.div`
  font-size: 1em;
  color: #b2b2b2;
  margin-top: 0.8rem;
`;

const DonateProgressRate = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 0.2rem;
  color: ${colors.Green};
`;

const VerticalLine = styled.div`
  display: flex;
  width: 1px;
  height: 100px;
  background: linear-gradient(to bottom, #313845 0%, #4d596e 24%, #4d596e 73%, #313845 100%);
`;

const InvestProgressRate = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 0.2rem;
  color: ${colors.Red};
`;
interface CashbackServiceProps {
  currentDonations: number;
  goalDonations: number;
}

export default function CashbackServiceSection() {
  const { currentDonations, goalDonations, badges } = useStore();
  console.log(currentDonations);
  console.log(goalDonations);
  console.log(badges);

  //상황별 기부 페이지 이동 경로
  const donateLink = !badges || goalDonations === 0 ? '/donatebefore' : '/donatehome';

  //주식 총 수익율 계산
  //1.구매 가격
  // const quantity = 가격 / (1 + 변화율);

  return (
    <>
      <TitleBox title="캐시백 서비스">
        <Service>
          <Link to={donateLink}>
            <PressMotion>
              <Button varient="donate">
                <img src={donateImage} />
                <ServiceTitle>기부</ServiceTitle>
                <DonateProgressRate>
                  {goalDonations === 0 ? '0%' : `${(currentDonations / goalDonations) * 100}%`}
                </DonateProgressRate>
              </Button>
            </PressMotion>
          </Link>
          <VerticalLine></VerticalLine>
          <Link to="/investBefore">
            <PressMotion>
              <Button varient="invest">
                <img src={investUpImage} />
                <ServiceTitle>투자</ServiceTitle>
                <InvestProgressRate varient="invest">+1.2%</InvestProgressRate>
              </Button>
            </PressMotion>
          </Link>
        </Service>
      </TitleBox>
    </>
  );
}
