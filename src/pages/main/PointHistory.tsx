import Btn from '@/components/Btn';
import PressMotion from '@/components/PressMotion';
import { colors } from '@/styles/colors';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import downArrowImage from '@/assets/Main/DownArrow.png';
import usageIcon from '@/assets/Main/UsageIcon.png';
import { useState } from 'react';
import blueCheckImage from '@/assets/Main/check_blue.png';
import greyCheckImage from '@/assets/Main/check_grey.png';

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
  padding: 3rem 0;
  gap: 3rem;
`;

const TopText = styled.div`
  display: flex;
  flex-direction: column;
`;

const Balance = styled.div`
  display: flex;
  font-size: 2.5rem;
  font-weight: bold;
`;

const Button = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PointFilter = styled.div`
  display: flex;
  flex-direction: row;
  height: 2rem;
  margin: 2rem 0 0.5rem 0;
`;

const PointNav = styled.div`
  display: flex;
  font-size: 1rem;
  height: 2rem;
  align-items: center;
  gap: 1rem;
  > img {
    width: 1rem;
    height: 0.6rem;
  }
`;

const CurrentNav = styled.div`
  height: 2rem;
  line-height: 2rem;
`;

interface FilterListProps {
  clicked: boolean;
}

//오버레이
const Overlay = styled.div<FilterListProps>`
  display: ${({ clicked }) => (clicked ? 'block' : 'none')};
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
`;

//필터 리스트
const FilterList = styled.div<FilterListProps>`
  display: ${({ clicked }) => (clicked ? 'flex' : 'none')};
  flex-direction: column;
  position: fixed;
  background-color: ${colors.Navy};
  width: 100%;
  max-width: 92%;
  border-radius: 1.2rem;
  padding: 1rem;
  z-index: 10;
  bottom: 1rem;
  left: 1rem;
`;

const SelectTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem 0;
`;

const SelectMenu = styled.ul`
  display: flex;
  flex-direction: column;
`;

const SelectItem = styled.li<{ isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${({ isSelected }) => (isSelected ? colors.White : colors.Grey)};
  padding: 1rem 0;
  > img {
    width: 1rem;
    height: 1rem;
  }
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

const PointUsageItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
  align-items: center;
`;

const UsageIcon = styled.div`
  display: flex;
  > img {
    width: 2.2rem;
    height: 2.2rem;
  }
`;

const UsageText = styled.div`
  display: flex;
  flex-direction: column;
  width: 14rem;
  gap: 0.2rem;
`;

const Time = styled.div`
  display: flex;
  color: #c5c5c5;
  font-size: 0.8rem;
`;

const UsagePoint = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  align-items: flex-end;
  gap: 0.2rem;
  width: 6rem;
`;

const NewPoint = styled.div`
  display: flex;
  color: ${colors.Red};
`;

const CurrentPoint = styled.div`
  display: flex;
  color: #c5c5c5;
  font-size: 0.8rem;
`;

interface dummyPointHistoryProps {
  id: number;
  icon: string;
  name: string;
  date: string;
  time: string;
  newPoint: number;
  currentPoint: number;
  type: string;
}

const dummyPointHistory = [
  {
    id: 1,
    icon: usageIcon,
    name: '토스 뱅크',
    date: '2025-03-03',
    time: '10:59',
    newPoint: 1,
    currentPoint: 1,
    type: 'earned',
  },
  {
    id: 2,
    icon: usageIcon,
    name: '토스 뱅크',
    date: '2025-03-03',
    time: '11:30',
    newPoint: 500,
    currentPoint: 501,
    type: 'earned',
  },
  {
    id: 3,
    icon: usageIcon,
    name: '토스 뱅크',
    date: '2025-03-04',
    time: '14:20',
    newPoint: 3500,
    currentPoint: 4001,
    type: 'earned',
  },
  {
    id: 4,
    icon: usageIcon,
    name: '토스 뱅크',
    date: '2025-03-04',
    time: '16:45',
    newPoint: 10000,
    currentPoint: 14001,
    type: 'earned',
  },
  {
    id: 5,
    icon: usageIcon,
    name: '토스 뱅크',
    date: '2025-03-04',
    time: '19:10',
    newPoint: 2000,
    currentPoint: 12001,
    type: 'spent',
  },
  {
    id: 6,
    icon: usageIcon,
    name: '토스 뱅크',
    date: '2025-03-05',
    time: '08:22',
    newPoint: 2000,
    currentPoint: 10001,
    type: 'spent',
  },
  {
    id: 7,
    icon: usageIcon,
    name: '토스 뱅크',
    date: '2025-03-05',
    time: '11:30',
    newPoint: 2000,
    currentPoint: 12001,
    type: 'earned',
  },
  {
    id: 8,
    icon: usageIcon,
    name: '토스 뱅크',
    date: '2025-03-05',
    time: '14:47',
    newPoint: 2000,
    currentPoint: 10001,
    type: 'spent',
  },
  {
    id: 9,
    icon: usageIcon,
    name: '토스 뱅크',
    date: '2025-03-05',
    time: '19:21',
    newPoint: 2000,
    currentPoint: 12001,
    type: 'earned',
  },
];

export default function PointHistory() {
  const filterOptions = ['전체', '적립 내역', '사용 내역'] as const;
  //클릭 됐는지 안됐는지
  const [clicked, setClicked] = useState(false);
  const [selectedValue, setSelectedValue] = useState('전체');

  //필터링
  const handleClick = () => {
    setClicked(!clicked);
    console.log(clicked);
  };

  //클릭한 값으로 값이 바뀜
  const handleSelect = (filter: string) => {
    setSelectedValue(filter);
    setClicked(!clicked);
  };

  //선택된 필터에 따라 내역을 필터링
  const filterHistory = (history: dummyPointHistoryProps[], filter: string) => {
    if (filter === '적립 내역') {
      return history.filter((item) => item.type === 'earned');
    } else if (filter === '사용 내역') {
      return history.filter((item) => item.type === 'spent');
    }
    return history;
  };

  // 필터링된 내역 가져오기
  const filteredHistory = filterHistory(dummyPointHistory, selectedValue);

  //최신순으로 정렬 후 날짜별 그룹화
  const groupByDateSorted = (history: dummyPointHistoryProps[]) => {
    const grouped: { [key: string]: dummyPointHistoryProps[] } = {};

    history
      .sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`).getTime();
        const dateB = new Date(`${b.date} ${b.time}`).getTime();
        return dateB - dateA;
      })
      .forEach((item) => {
        if (!grouped[item.date]) {
          grouped[item.date] = [];
        }
        grouped[item.date].push(item);
      });
    return grouped;
  };

  const groupedHistory = groupByDateSorted(filteredHistory);
  console.log(groupedHistory);

  //합산 포인트 계산
  const totalCurrentPoint = dummyPointHistory.reduce(
    (acc, cur) => acc + Number(cur.newPoint) * (cur.type === 'earned' ? 1 : -1),
    0,
  );

  return (
    <>
      <Wrap>
        <HistoryTop>
          <TopText>
            <div>캐시백 포인트</div>
            <Balance>{totalCurrentPoint}원</Balance>
          </TopText>
          <Button>
            <Link to={'/donatebefore'}>
              <Btn bgColor={colors.Blue} handleBtn={() => {}}>
                <PressMotion>
                  <div style={{ width: '9rem' }}>기부하러 가기</div>
                </PressMotion>
              </Btn>
            </Link>
            <Link to={'/investbefore'}>
              <Btn bgColor={colors.Navy} handleBtn={() => {}}>
                <PressMotion>
                  <div style={{ width: '9rem' }}>투자하러 가기</div>
                </PressMotion>
              </Btn>
            </Link>
          </Button>
        </HistoryTop>
        <PointFilter>
          <PointNav>
            <CurrentNav onClick={handleClick}>{selectedValue}</CurrentNav>
            <img src={downArrowImage} />
          </PointNav>
        </PointFilter>
        <Overlay clicked={clicked}></Overlay>
        <FilterList clicked={clicked}>
          <SelectTitle>내역 선택</SelectTitle>
          <SelectMenu>
            {filterOptions.map((item) => {
              return (
                <SelectItem
                  key={item}
                  onClick={() => handleSelect(item)}
                  isSelected={selectedValue === item}
                >
                  <div>{item}</div>
                  <img src={selectedValue === item ? blueCheckImage : greyCheckImage} />
                </SelectItem>
              );
            })}
          </SelectMenu>
        </FilterList>
        <PointUsage>
          {Object.keys(groupedHistory).map((date) => (
            <>
              <PointDate>{date}</PointDate>
              {groupedHistory[date].map((history) => (
                <PointUsageItem key={history.id}>
                  <UsageIcon>
                    <img src={history.icon} />
                  </UsageIcon>
                  <UsageText>
                    <div>{history.name}</div>
                    <Time>{history.time}</Time>
                  </UsageText>
                  <UsagePoint>
                    <NewPoint
                      style={{ color: history.type === 'earned' ? colors.Red : colors.Blue }}
                    >
                      {history.type === 'earned'
                        ? `+${Number(history.newPoint)}원`
                        : `-${Number(history.newPoint)}원`}
                    </NewPoint>
                    <CurrentPoint>{history.currentPoint}원</CurrentPoint>
                  </UsagePoint>
                </PointUsageItem>
              ))}
            </>
          ))}
        </PointUsage>
      </Wrap>
    </>
  );
}
