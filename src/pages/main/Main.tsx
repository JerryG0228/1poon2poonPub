import styled from 'styled-components';
import { Link, Navigate } from 'react-router-dom';
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
  const { cashbackStamps, cashbackStatus, points, username } = useStore();

  if (!username) {
    return <Navigate to="/login" replace />;
  }

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
