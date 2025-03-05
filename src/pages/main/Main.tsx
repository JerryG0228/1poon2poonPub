import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CashbackSection from '@/components/Main/CashbackSection';
import StampBoardSection from '@/components/Main/StampBoardSection';
import PointHistorySection from '@/components/Main/PointHistorySection';
import CashbackServiceSection from '@/components/Main/CashbackServiceSection';
import AdBanner from '@/components/Main/AdBanner';

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  { id: 7, amount: 9000, category: '카페', date: '2025-03-05' },
  { id: 8, amount: 1200, category: '대중교통', date: '2025-03-05' },
  { id: 9, amount: 800, category: '편의점', date: '2025-03-05' },
  { id: 10, amount: 20000, category: '영화관', date: '2025-03-05' },
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
        <CashbackSection todayCategories={todayCategories} />
        <StampBoardSection
          coins={coins}
          isFull={isFull}
          handlePointCalculate={handlePointCalculate}
        />
        <Link to="/pointhistory">
          <PointHistorySection point={point} />
        </Link>
        <CashbackServiceSection />
        <AdBanner />
      </MainWrap>
    </>
  );
}
