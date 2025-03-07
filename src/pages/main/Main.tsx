import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CashbackSection from '@/components/Main/CashbackSection';
import StampBoardSection from '@/components/Main/StampBoardSection';
import PointHistorySection from '@/components/Main/PointHistorySection';
import CashbackServiceSection from '@/components/Main/CashbackServiceSection';
import AdBanner from '@/components/Main/AdBanner';
import baseAxios from '@/apis/axiosInstance';
import useStore from '@/store/User';
import PressMotion from '@/components/PressMotion';

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
    goalCategory,
    totalDonations,
    goalDonations,
    currentDonations,
    setDefault,
  } = useStore();

  // const coins = data.map((payment) => {
  //   return payment.amount >= 10000 ? 500 : 100;
  // });

  // console.log(coins);

  // const totalPoint = coins.reduce((total, cur) => total + cur, 0);

  // console.log(totalPoint);

  // const isFull = coins.length === 10;

  //코인 10개 차면 다른 화면 띄우기 지우기

  // 초기 유저 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      await baseAxios
        .get(`/user/ooinl77 `)
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
            goalCategory: goalCategory,
            totalDonations: totalDonations,
            goalDonations: goalDonations,
            currentDonations: currentDonations,
          });
        });
    };
    fetchData();
  }, []);

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
