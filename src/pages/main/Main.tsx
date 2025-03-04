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
import cashbackImage from '@/assets/Main/CashbackIcon.png';
import vectorImage from '@/assets/Main/Vector.png';
import donateImage from '@/assets/Main/donateIcon.png';
import investUpImage from '@/assets/Main/investUpIcon.png';
import investDownImage from '@/assets/Main/investDownIcon.png';
import PressMotion from '@/components/PressMotion';
import { colors } from '@/styles/colors';
import { Link } from 'react-router-dom';
import oneCoin from '@/assets/Coin/100coin.png';
import fiveCoin from '@/assets/Coin/500coin.png';
import AnimatedComponent from '@/components/CoinRotate';
import { useState } from 'react';
import Btn from '@/components/Btn';
import { log } from 'console';

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

const StampBoard = styled.div<{ isFull: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Board = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
  row-gap: 1rem;
  column-gap: 1rem;
`;

const OverLay = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.8rem 0;
  gap: 1rem;
  align-items: center;
`;

const OverlayText = styled.div`
  font-size: 1.2rem;
`;

const Circle = styled.div<{ index: number }>`
  display: flex;
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

//더미 데이터
interface Payment {
  id: number;
  amount: number;
  category: string;
  date: string;
}

const dummyData: Payment[] = [
  { id: 1, amount: 5500, category: '카페', date: '2025-03-03' },
  { id: 2, amount: 12000, category: '패스트푸드', date: '2025-03-04' },
  { id: 3, amount: 9000, category: '편의점', date: '2025-03-04' },
  { id: 4, amount: 1200, category: '대중교통', date: '2025-03-04' },
  { id: 5, amount: 800, category: '편의점', date: '2025-03-04' },
  { id: 6, amount: 20000, category: '영화관', date: '2025-03-04' },
  { id: 7, amount: 20000, category: '영화관', date: '2025-03-04' },
  { id: 8, amount: 20000, category: '영화관', date: '2025-03-04' },
  { id: 9, amount: 20000, category: '영화관', date: '2025-03-04' },
  { id: 10, amount: 20000, category: '영화관', date: '2025-03-04' },
];

export default function Main() {
  //더미 데이터 가져오기
  const [data, setData] = useState(dummyData);

  //오늘 날짜
  const today = new Date().toISOString().split('T')[0];
  //Date 객체 변환
  const todayDate = new Date(today);

  //오늘 결제한 내역 가져오기
  const todayPayments = data.filter((payment) => {
    //Date 객체 변환
    const paymentDate = new Date(payment.date);
    return paymentDate.getTime() === todayDate.getTime();
  });

  //오늘 결제한 내역의 데이터 값
  console.log(todayPayments);

  //오늘 결제한 내역 중에서 카테고리 가져오기
  const todayCategories = todayPayments.map((payment) => payment.category);
  console.log(todayCategories);

  //가져온 카테고리의 active를 false로 변경
  const stampItem = [
    { title: '대중교통', img: busImage, bgColor: '#6E5230' },
    { title: '택시', img: taxiImage, bgColor: '#6E5E3D' },
    { title: '편의점', img: storeImage, bgColor: '#304E7B' },
    { title: '영화관', img: movieImage, bgColor: '#683745' },
    { title: '패스트푸드', img: foodImage, bgColor: '#6E5E3D' },
    { title: '카페', img: cafeImage, bgColor: '#264038' },
  ].map((stamp) => ({
    ...stamp, //stampItem의 title, img, bgColor의 값 가져오기
    active: !todayCategories.includes(stamp.title),
  }));

  //도장 칸 수
  const totalStamps = 10;

  //amount 가져와서 500원과 100원으로 나누기
  const coins = data.map((payment) => {
    return payment.amount >= 10000 ? 500 : 100;
  });

  console.log(coins);

  const totalPoint = coins.reduce((total, cur) => total + cur, 0);

  console.log(totalPoint);

  const isFull = coins.length === 10;

  //포인트
  const [point, setPoint] = useState(10000);

  //포인트 합산 함수
  const handlePointCalculate = () => {
    console.log('포인트 전환 버튼 눌림');
    setPoint(point + totalPoint);
    //dummydata 다 지우기
    setData([]);
  };

  //코인 10개 차면 다른 화면 띄우기 지우기

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
                active={item.active}
              />
            ))}
          </StampBoxWrap>
        </TitleBox>

        <TitleBox title="캐시백 스탬프판">
          <StampBoard isFull={isFull}>
            {isFull ? (
              <OverLay>
                <OverlayText>스탬프 10개를 다 모았습니다!</OverlayText>
                <PressMotion>
                  <Btn bgColor={colors.Blue} handleBtn={handlePointCalculate}>
                    포인트 전환
                  </Btn>
                </PressMotion>
              </OverLay>
            ) : (
              <Board>
                {[...Array(totalStamps)].map(
                  (
                    _, //빈 배열 생성했으므로 명시
                    index: number, // index 추가
                  ) => (
                    <AnimatedComponent key={index}>
                      <Circle>
                        {coins[index] ? ( // 값이 있는 경우에만 이미지 표시
                          coins[index] === 500 ? (
                            <img src={fiveCoin} alt="500원 동전" />
                          ) : (
                            <img src={oneCoin} alt="100원 동전" />
                          )
                        ) : null}
                      </Circle>
                    </AnimatedComponent>
                  ),
                )}
              </Board>
            )}
          </StampBoard>
        </TitleBox>

        <Link to="/pointhistory">
          <NonTitleBox>
            <CashBackWrap>
              <CashBackImageWrap>
                <img src={cashbackImage} />{' '}
              </CashBackImageWrap>
              <CashBackTextWrap>
                <Balance>{point}원</Balance>
                <Point>캐시백 포인트</Point>
              </CashBackTextWrap>
              <CashBacArrowWrap>
                <img src={vectorImage} />
              </CashBacArrowWrap>
            </CashBackWrap>
          </NonTitleBox>
        </Link>

        <TitleBox title="캐시백 서비스">
          <Service>
            <Link to="/donateBefore">
              <PressMotion>
                <Button varient="donate">
                  <img src={donateImage} />
                  <ServiceTitle>기부</ServiceTitle>
                  <DonateProgressRate>60%</DonateProgressRate>
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
      </MainWrap>
    </>
  );
}
