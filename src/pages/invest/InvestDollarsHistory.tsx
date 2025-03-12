import Btn from '@/components/Btn';
import PressMotion from '@/components/PressMotion';
import { colors } from '@/styles/colors';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import useStore from '@/store/User';
import PointBox from '@/components/PointBox';
import USDFilter from '@/components/invest/USDFilter';

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

interface DollarHistoryProps {
  name: string;
  day: string;
  time: string;
  change: number;
  finalDollars: number;
  _id: string;
}

export default function InvestDollarsHistory() {
  const { dollars, points, dollarHistory, badges, goalDonations, interestsStock } = useStore();

  const [selectedValue, setSelectedValue] = useState('전체');

  // 적립/사용에 따라 구분된 데이터
  const filterHistory = (filterResult: DollarHistoryProps[], filter: string) => {
    if (filter === '구매') {
      return filterResult.filter((item) => item.name.split(' ')[1] === '구매');
    } else if (filter === '판매') {
      return filterResult.filter((item) => item.name.split(' ')[1] === '판매');
    } else if (filter === '환전') {
      return filterResult.filter((item) => item.name.split(' ')[1] === '환전');
    }
    return filterResult;
  };

  // selectedValue(선택된 필터로) 구분된 데이터
  const filteredHistory = filterHistory(dollarHistory, selectedValue);

  // selectedValue(선택된 필터로) 구분된 데이터를 날짜별로 정렬
  const groupByDateSorted = (filterResult: DollarHistoryProps[]) => {
    const grouped: { [key: string]: DollarHistoryProps[] } = {};

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

  return (
    <>
      <GreyBox />
      <Wrap>
        <HistoryTop>
          <TopText>
            <div>보유 달러</div>
            <Balance>${dollars.toFixed(2)}</Balance>
          </TopText>
          <Button>
            <Link to={'/KRWExchangeRate'}>
              <Btn bgColor={colors.Blue} handleBtn={() => {}}>
                <PressMotion>
                  <div style={{ width: '21.5rem' }}>달러 환전 하기</div>
                </PressMotion>
              </Btn>
            </Link>
          </Button>
        </HistoryTop>
        <NavyLine />

        <div style={{ padding: '1rem' }}>
          <USDFilter selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
          <PointUsage>
            {Object.keys(groupedHistory).map((date) => (
              <div key={date} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <PointDate>{date.slice(6)}</PointDate>
                {groupedHistory[date].map((history) => (
                  <PointBox
                    key={history._id}
                    time={history.time}
                    name={history.name}
                    point={history.finalDollars}
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
