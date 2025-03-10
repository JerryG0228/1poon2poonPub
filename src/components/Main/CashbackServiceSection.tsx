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

const InvestProgressRate = styled.div<{ totalReturnPercent: number }>`
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 0.2rem;
  color: ${(props) => (props.totalReturnPercent > 0 ? colors.Red : colors.LightBlue)};
`;

export default function CashbackServiceSection() {
  const { currentDonations, goalDonations, badges, interestsStock } = useStore();

  //상황별 기부 페이지 이동 경로
  const donateLink = !badges || goalDonations === 0 ? '/donatebefore' : '/donatehome';

  //상황별 투자 페이지 이동 경로
  const investLink = interestsStock.length === 0 ? '/donatebefore' : '/donate';

  //주식 총 수익율 계산
  //주식 데이터 가져오기
  const stock = useStore((state) => state.ownedStocks);

  //총 손실/수익율 계산
  const totalLoss = stock.reduce((acc, etf) => {
    return acc + etf.quantity * etf.price * (etf.changeRate / 100);
  }, 0);

  //총 투자 금액 계산
  const totalInvestment = stock.reduce((acc, etf) => {
    return acc + etf.quantity * etf.price;
  }, 0);

  //이율 퍼센트 계산
  const totalReturnPercent = totalInvestment !== 0 ? totalLoss / totalInvestment : 0;

  return (
    <>
      <TitleBox title="캐시백 서비스">
        <Service>
          <Link to={donateLink}>
            <PressMotion>
              <Button>
                <img src={donateImage} />
                <ServiceTitle>기부</ServiceTitle>
                <DonateProgressRate>
                  {goalDonations === 0 ? '0%' : `${(currentDonations / goalDonations) * 100}%`}
                </DonateProgressRate>
              </Button>
            </PressMotion>
          </Link>
          <VerticalLine></VerticalLine>
          <Link to={investLink}>
            <PressMotion>
              <Button varient="invest">
                <img src={totalReturnPercent > 0 ? investUpImage : investDownImage} />
                <ServiceTitle>투자</ServiceTitle>
                <InvestProgressRate totalReturnPercent={totalReturnPercent}>
                  {/* toFixed(1) : 소수점 1자리까지 */}
                  {!stock
                    ? '0%'
                    : totalReturnPercent > 0
                      ? `+${totalReturnPercent.toFixed(1)}%`
                      : `${totalReturnPercent.toFixed(1)}%`}
                </InvestProgressRate>
              </Button>
            </PressMotion>
          </Link>
        </Service>
      </TitleBox>
    </>
  );
}
