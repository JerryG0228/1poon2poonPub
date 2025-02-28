import StampBox from '@/components/StampBox';
import TitleBox from '@/components/TitleBox';
import busImage from '@/assets/StampBox/BusIcon.png';
import cafeImage from '@/assets/StampBox/CafeIcon.png';
import foodImage from '@/assets/StampBox/FoodIcon.png';
import movieImage from '@/assets/StampBox/MovieIcon.png';
import storeImage from '@/assets/StampBox/StoreIcon.png';
import taxiImage from '@/assets/StampBox/TaxiIcon.png';
import styled from 'styled-components';
import NonTitleBox from '@/components/NonTitleBox';
import cashbackImage from '@/assets/CashbackIcon.png';
import vectorImage from '@/assets/Vector.png';
import donateImage from '@/assets/donateIcon.png';
import investUpImage from '@/assets/investUpIcon.png';
import investDownImage from '@/assets/investDownIcon.png';
import PressMotion from '@/components/PressMotion';
import { colors } from '@/styles/colors';
import { Link } from 'react-router-dom';
import oneCoin from '@/assets/Coin/100coin.png';
import fiveCoin from '@/assets/Coin/500coin.png';
import AnimatedComponent from '@/components/CoinRotate';

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StampBoxWrap = styled.div`
  display: flex;
  grid-template-columns: repeat(6, 1fr);
  justify-content: space-between;
`;

const StampBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
  row-gap: 1rem;
  column-gap: 1rem;
  grid-auto-flow: dense;
`;

const Circle = styled.div<{ index: number }>`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 3rem;
  background-color: #ffffff;
  > img {
    width: 3.2rem;
    height: 3.2rem;
  }
`;

const CashBackWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CashBackImageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6e6430;
  border-radius: 0.3rem;
  width: 2rem;
  height: 2rem;
  > img {
    width: 1.2rem;
    height: 1.25rem;
  }
`;

const CashBackTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 15rem;
`;

const Balance = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
`;

const Point = styled.div`
  font-size: 0.7rem;
`;

const CashBacArrowWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    justify-content: center;
    align-items: center;
    width: 0.8rem;
    height: 1.1rem;
  }
`;

const Service = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

const VerticalLine = styled.div`
  display: flex;
  width: 1px;
  height: 100px;
  background: linear-gradient(to bottom, #313845 0%, #4d596e 24%, #4d596e 73%, #313845 100%);
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

const InvestProgressRate = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 0.2rem;
  color: ${colors.Red};
`;

export default function Main() {
  const stampItem = [
    { title: '대중교통', img: busImage, bgColor: '#6E5230' },
    { title: '택시', img: taxiImage, bgColor: '#6E5E3D' },
    { title: '편의점', img: storeImage, bgColor: '#304E7B' },
    { title: '영화관', img: movieImage, bgColor: '#683745' },
    { title: '패스트푸드', img: foodImage, bgColor: '#6E5E3D' },
    { title: '카페', img: cafeImage, bgColor: '#264038' },
  ];

  return (
    <>
      <MainWrap>
        <TitleBox title="캐시백 영역">
          <StampBoxWrap>
            {stampItem.map((item) => (
              <StampBox
                key={item.title}
                icon={item.img}
                title={item.title}
                bgColor={item.bgColor}
                active={true}
              />
            ))}
          </StampBoxWrap>
        </TitleBox>
        <TitleBox title="캐시백 스탬프판">
          <StampBoard>
            <AnimatedComponent>
              <Circle>
                <img src={oneCoin} />
              </Circle>
            </AnimatedComponent>
            <AnimatedComponent>
              <Circle>
                <img src={fiveCoin} />
              </Circle>
            </AnimatedComponent>
            {[...Array(8)].map((_, index) => (
              <Circle key={index} />
            ))}
          </StampBoard>
        </TitleBox>
        <NonTitleBox>
          <CashBackWrap>
            <CashBackImageWrap>
              <img src={cashbackImage} />{' '}
            </CashBackImageWrap>
            <CashBackTextWrap>
              <Balance>10,000원</Balance>
              <Point>캐시백 포인트</Point>
            </CashBackTextWrap>
            <CashBacArrowWrap>
              <img src={vectorImage} />
            </CashBacArrowWrap>
          </CashBackWrap>
        </NonTitleBox>
        <TitleBox title="캐시백 서비스">
          <Service>
            <Link to="/donate">
              <PressMotion>
                <Button varient="donate">
                  <img src={donateImage} />
                  <ServiceTitle>기부</ServiceTitle>
                  <DonateProgressRate>60%</DonateProgressRate>
                </Button>
              </PressMotion>
            </Link>
            <VerticalLine></VerticalLine>
            <Link to="/invest">
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
      </MainWrap>
    </>
  );
}
