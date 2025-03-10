import Btn from '@/components/Btn';
import PressMotion from '@/components/PressMotion';
import { colors } from '@/styles/colors';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import useStore from '@/store/User';
import PointBox from '@/components/PointBox';
import Filter from '@/components/Main/Filter';

const GreyBox = styled.div`
  background-color: #313845;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  height: 100%;
`;

const NavyLine = styled.div`
  background-color: ${colors.Navy};
  position: absolute;
  top: 15rem;
  width: 430px;
  height: 1.2rem;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
`;

const HistoryTop = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem 1rem;
  gap: 3rem;
`;

const TopText = styled.div`
  display: flex;
  flex-direction: column;
`;

const Balance = styled.div`
  display: flex;
  font-size: 2.3rem;
  font-weight: 700;
  letter-spacing: 0.05rem;
`;

const Button = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PointUsage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  margin: 1rem 0;
`;

const PointDate = styled.div`
  display: flex;
  color: #c5c5c5;
`;

interface PointHistoryProps {
  name: string;
  day: string;
  time: string;
  change: number;
  finalPoints: number;
  _id: string;
}

export default function PointHistory() {
  const { points, pointHistory, badges, goalDonations, interestsStock } = useStore();

  const [selectedValue, setSelectedValue] = useState('전체');

  // 적립/사용에 따라 구분된 데이터
  const filterHistory = (filterResult: PointHistoryProps[], filter: string) => {
    if (filter === '적립 내역') {
      return filterResult.filter((item) => item.change > 0);
    } else if (filter === '사용 내역') {
      return filterResult.filter((item) => item.change < 0);
    }
    return filterResult;
  };

  // selectedValue(선택된 필터로) 구분된 데이터
  const filteredHistory = filterHistory(pointHistory, selectedValue);

  // selectedValue(선택된 필터로) 구분된 데이터를 날짜별로 정렬
  const groupByDateSorted = (filterResult: PointHistoryProps[]) => {
    const grouped: { [key: string]: PointHistoryProps[] } = {};

    filterResult
      .sort((a, b) => {
        // 날짜 비교 (날짜가 더 최신인 것이 앞으로)

        const [aY, aM, aD] = a.day
          .replace(/년|월|일/g, '')
          .split(' ')
          .map(Number);

        const [bY, bM, bD] = b.day
          .replace(/년|월|일/g, '')
          .split(' ')
          .map(Number);

        if (aY !== bY) return bY - aY; // 연도 비교 (내림차순)
        if (aM !== bM) return bM - aM; // 월 비교 (내림차순)
        if (aD !== bD) return bD - aD; // 일 비교 (내림차순)

        // 날짜가 같다면, 시간 비교 (시간이 더 늦은 것이 앞으로)
        return a.time > b.time ? -1 : 1;
      })
      .forEach((item) => {
        if (!grouped[item.day]) {
          grouped[item.day] = [];
        }
        grouped[item.day].push(item);
      });
    return grouped;
  };

  let groupedHistory = groupByDateSorted(filteredHistory);

  //상황별 기부 페이지 이동 경로
  const donateLink = badges.length == 0 && goalDonations === 0 ? '/donatebefore' : '/donatehome';

  //상황별 투자 페이지 이동 경로
  const investLink = interestsStock.length === 0 ? '/donatebefore' : '/donate';

  return (
    <>
      <GreyBox />
      <Wrap>
        <HistoryTop>
          <TopText>
            <div>캐시백 포인트</div>
            <Balance>{points.toLocaleString()}원</Balance>
          </TopText>
          <Button>
            <Link to={donateLink}>
              <Btn bgColor={colors.Blue} handleBtn={() => {}}>
                <PressMotion>
                  <div style={{ width: '10rem' }}>기부하러 가기</div>
                </PressMotion>
              </Btn>
            </Link>
            <Link to={investLink}>
              <Btn bgColor={colors.Navy} handleBtn={() => {}}>
                <PressMotion>
                  <div style={{ width: '10rem' }}>투자하러 가기</div>
                </PressMotion>
              </Btn>
            </Link>
          </Button>
        </HistoryTop>

        <NavyLine />

        <div style={{ padding: '1rem' }}>
          <Filter selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
          <PointUsage>
            {Object.keys(groupedHistory).map((date) => (
              <div key={date} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <PointDate>{date.slice(6)}</PointDate>
                {groupedHistory[date].map((history) => (
                  <PointBox
                    key={history._id}
                    time={history.time}
                    name={history.name}
                    point={history.finalPoints}
                    transPoint={history.change}
                  />
                ))}
              </div>
            ))}
          </PointUsage>
        </div>
      </Wrap>
    </>
  );
}
