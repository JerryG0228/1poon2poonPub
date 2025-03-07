import Btn from '@/components/Btn';
import PressMotion from '@/components/PressMotion';
import { colors } from '@/styles/colors';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import blueCheckImage from '@/assets/Main/check_blue.png';
import greyCheckImage from '@/assets/Main/check_grey.png';
import { IoIosArrowDown } from 'react-icons/io';
import useStore from '@/store/User';
import PointBox from '@/components/PointBox';

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

const PointFilter = styled.div`
  display: flex;
  flex-direction: row;
`;

const PointNav = styled.div`
  display: flex;
  font-size: 1rem;
  height: 2rem;
  align-items: center;
  > img {
    width: 1rem;
    height: 0.6rem;
  }
`;

const NavContent = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
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

interface PointHistoryProps {
  name: string;
  day: string;
  time: string;
  change: number;
  finalPoints: number;
  _id: string;
}

export default function PointHistory() {
  const { points, pointHistory } = useStore();
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

  // 적립/사용에 따라 구분된 데이터
  const filterHistory = (filterResult: PointHistoryProps[], filter: string) => {
    if (filter === '적립 내역') {
      return filterResult.filter((item) => item.change > 0);
    } else if (filter === '사용 내역') {
      return filterResult.filter((item) => item.change < 0);
    }
    return filterResult;
  };

  // 필터링된 내역 가져오기
  const filteredHistory = filterHistory(pointHistory, selectedValue);

  //최신순으로 정렬 후 날짜별 그룹화
  const groupByDateSorted = (filterResult: PointHistoryProps[]) => {
    const grouped: { [key: string]: PointHistoryProps[] } = {};

    filterResult
      .sort((a, b) => {
        // 날짜 비교 (날짜가 더 최신인 것이 앞으로)
        if (a.day !== b.day) {
          return a.day > b.day ? -1 : 1;
        }
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

  const groupedHistory = groupByDateSorted(filteredHistory);
  console.log(groupedHistory);

  //overlay 클릭시 필터 닫기
  const closeFilter = () => {
    setClicked(false);
  };

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
            <Link to={'/donatebefore'}>
              <Btn bgColor={colors.Blue} handleBtn={() => {}}>
                <PressMotion>
                  <div style={{ width: '10rem' }}>기부하러 가기</div>
                </PressMotion>
              </Btn>
            </Link>
            <Link to={'/investbefore'}>
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
          <PointFilter>
            <PointNav onClick={handleClick}>
              <PressMotion>
                <NavContent>
                  <CurrentNav>{selectedValue}</CurrentNav>
                  <IoIosArrowDown style={{ fontSize: '1.5rem' }} />
                </NavContent>
              </PressMotion>
            </PointNav>
          </PointFilter>
          <Overlay clicked={clicked} onClick={closeFilter} />
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
                  <PointBox
                    key={history._id}
                    time={history.time}
                    name={history.name}
                    point={history.finalPoints}
                    transPoint={history.change}
                  />
                ))}
              </>
            ))}
          </PointUsage>
        </div>
      </Wrap>
    </>
  );
}
