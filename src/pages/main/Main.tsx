import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import CashbackSection from '@/components/Main/CashbackSection';
import StampBoardSection from '@/components/Main/StampBoardSection';
import PointHistorySection from '@/components/Main/PointHistorySection';
import CashbackServiceSection from '@/components/Main/CashbackServiceSection';
import AdBanner from '@/components/Main/AdBanner';
import baseAxios from '@/apis/axiosInstance';
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
    pointHistory,
    badges,
    interests,
    ownedStocks,
    interestsStock,
    goalCategory,
    totalDonations,
    goalDonations,
    currentDonations,
    setDefault,
  } = useStore();

  // 초기 유저 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      await baseAxios
        .get(`/user/tester`)
        .then((res) => res.data)
        .then((data) => {
          setDefault(
            data.name,
            data.cashbackStatus,
            data.cashbackStamps,
            data.cashback.points,
            data.cashback.history,
            data.donate.badges,
            data.invest.category,
            data.invest.ownedETFs,
            data.invest.interestedETFs,
            data.donate.category,
            data.donate.totalAmount,
            data.donate.targetAmount,
            data.donate.currentAmount,
          );
          console.log({
            name: username,
            cashbackStatus: cashbackStatus,
            stamps: cashbackStamps,
            points: points,
            pointHistory: pointHistory,
            badges: badges,
            interests: interests,
            ownedETFs: ownedStocks,
            interestsStock: interestsStock,
            goalCategory: goalCategory,
            totalDonations: totalDonations,
            goalDonations: goalDonations,
            currentDonations: currentDonations,
          });
        });
    };
    fetchData();
  }, []);

  console.log(interestsStock);

  return (
    <MainWrap>
      <CashbackSection cashbackStatus={cashbackStatus} />
      <StampBoardSection
        stamps={cashbackStamps}
        // isFull={isFull}
        // handlePointCalculate={handlePointCalculate}
      />
      <Link to="/pointhistory">
        <PointHistorySection points={points} />
      </Link>
      <CashbackServiceSection />
      <AdBanner />
    </MainWrap>
  );
}
