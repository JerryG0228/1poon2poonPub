import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import CashbackSection from '@/components/Main/CashbackSection';
import StampBoardSection from '@/components/Main/StampBoardSection';
import PointHistorySection from '@/components/Main/PointHistorySection';
import CashbackServiceSection from '@/components/Main/CashbackServiceSection';
import AdBanner from '@/components/Main/AdBanner';
import useStore from '@/store/User';

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem;
`;

export default function Main() {
  // 전역 상태 관리
  const {
    username,
    cashbackStatus,
    cashbackStamps,
    points,
    dollars,
    pointHistory,
    dollarHistory,
    badges,
    interests,
    ownedStocks,
    interestsStock,
    goalCategory,
    totalDonations,
    goalDonations,
    currentDonations,
    getPointCount,
    updateUser,
  } = useStore();

  // 초기 유저 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      await updateUser();
      console.log({
        name: username,
        cashbackStatus: cashbackStatus,
        cashbackStamps: cashbackStamps,
        points: points,
        dollars: dollars,
        pointHistory: pointHistory,
        dollarHistory: dollarHistory,
        badges: badges,
        interests: interests,
        ownedETFs: ownedStocks,
        interestsStock: interestsStock,
        goalCategory: goalCategory,
        totalDonations: totalDonations,
        goalDonations: goalDonations,
        currentDonations: currentDonations,
        getPointCount: getPointCount,
      });
    };
    fetchData();
  }, []);

  // 스탬프가 10개인지 확인
  const TOTAL_STAMPS = 10;

  const isFull = cashbackStamps.length === TOTAL_STAMPS;

  return (
    <MainWrap>
      <CashbackSection cashbackStatus={cashbackStatus} />
      <StampBoardSection stamps={cashbackStamps} isFull={isFull} totalStamps={TOTAL_STAMPS} />
      <Link to="/pointhistory">
        <PointHistorySection points={points} />
      </Link>
      <CashbackServiceSection />
      <AdBanner />
    </MainWrap>
  );
}
