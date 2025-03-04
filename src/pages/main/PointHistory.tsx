import Btn from '@/components/Btn';
import PressMotion from '@/components/PressMotion';
import { colors } from '@/styles/colors';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import downArrowImage from '@/assets/DownArrow.png';
import usageIcon from '@/assets/UsageIcon.png';
import { useState } from 'react';
import { color } from 'framer-motion';
import blueCheckImage from '@/assets/check_blue.png';
import greyCheckImage from '@/assets/check_grey.png';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  flex-direction: column;
  position: relative;
  overflow: hidden;
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

const EmptySpace = styled.div`
  display: flex;
  //임의로 우선 설정
  position: absolute;
  top: 16rem;
  width: 100%;
  height: 1rem;
  background-color: #ffffff;
`;

const PointFilter = styled.div`
  display: flex;
  flex-direction: row;
  height: 2rem;
  margin: 2rem 0 1rem 0;
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
  position: absolute;
  bottom: 0;
  background-color: ${colors.Navy};
  width: 100%;
  border-radius: 1.2rem;
  padding: 1rem;
  border: 1px solid pink;
  z-index: 10;
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
  gap: 1rem;
  margin: 1rem 0;
`;

const PointDate = styled.div`
  display: flex;
  color: #c5c5c5;
`;

const PointUsageItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
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
  width: 5rem;
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

export default function PointHistory() {
  const filterOptions = ['전체', '적립 내역', '사용 내역'] as const;
  //클릭 됐는지 안됐는지
  const [clicked, setClicked] = useState(false);
  const [selectedValue, setSelectedValue] = useState('전체');

  const handleClick = () => {
    setClicked(!clicked);
    console.log(clicked);
  };

  //클릭한 값으로 값이 바뀜
  const handleSelect = (filter: string) => {
    setSelectedValue(filter);
    setClicked(!clicked);
  };

  return (
    <>
      <Wrap>
        <HistoryTop>
          <TopText>
            <div>캐시백 포인트</div>
            <Balance>10,000원</Balance>
          </TopText>
          <Button>
            <Link to={'/donate'}>
              <Btn bgColor={colors.Blue} handleBtn={() => {}}>
                <PressMotion>
                  <div style={{ width: '9rem' }}>기부하러 가기</div>
                </PressMotion>
              </Btn>
            </Link>
            <Link to={'/invest'}>
              <Btn bgColor={colors.Navy} handleBtn={() => {}}>
                <PressMotion>
                  <div style={{ width: '9rem' }}>투자하러 가기</div>
                </PressMotion>
              </Btn>
            </Link>
          </Button>
        </HistoryTop>
        <EmptySpace />
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
          <PointDate>2월 17일</PointDate>
          <PointUsageItem>
            <UsageIcon>
              <img src={usageIcon} />
            </UsageIcon>
            <UsageText>
              <div>토스 뱅크</div>
              <Time>10:59</Time>
            </UsageText>
            <UsagePoint>
              <NewPoint>+1원</NewPoint>
              <CurrentPoint>1원</CurrentPoint>
            </UsagePoint>
          </PointUsageItem>
        </PointUsage>
      </Wrap>
    </>
  );
}
