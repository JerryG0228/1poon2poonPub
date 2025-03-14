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
  justify-content: space-between;
  width: 100%;
  gap: 0.5rem; /* 버튼 사이 간격 조절 */
`;

const StyledLink = styled(Link)`
  flex-grow: 1; /* 버튼을 동일한 크기로 확장 */
  display: flex;
  justify-content: center;
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

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const WithdrawBox = styled.div<{ clicked: boolean }>`
  flex-grow: 1;
  height: 5rem;
  background-color: ${({ clicked }) => (clicked ? 'transparent' : '#313845')};
`;

const WithdrawBtn = styled(Link)`
  display: flex;
  flex-grow: 1; /* 내부 요소가 확장되도록 설정 */
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
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
  const [clicked, setClicked] = useState(false);

  // 적립/사용에 따라 구분된 데이터
  const filterHistory = (filterResult: PointHistoryProps[], filter: string) => {
    if (filter === '적립 내역') {
      return filterResult.filter((item) => item.change > 0);
    } else if (filter === '사용 내역') {
      return filterResult.filter((item) => item.change < 0);
    }
    return filterResult;
  };

  console.log('pointHistory: ', pointHistory);

  // pointhistory 데이터에서 선택된 electedValue 필터로 나뉜 데이터
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

  // 날짜&시간 최신 순으로 정렬
  let groupedHistory = groupByDateSorted(filteredHistory);

  //상황별 기부 페이지 이동 경로
  const donateLink = badges.length == 0 && goalDonations === 0 ? '/donatebefore' : '/donatehome';

  //상황별 투자 페이지 이동 경로
  const investLink = interestsStock.length === 0 ? '/investbefore' : '/InvestmentHome';

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
            <StyledLink to={donateLink}>
              <Btn bgColor={colors.Blue} handleBtn={() => {}}>
                <PressMotion>
                  <div style={{ fontWeight: '500' }}>기부하러 가기</div>
                </PressMotion>
              </Btn>
            </StyledLink>
            <StyledLink to={investLink}>
              <Btn bgColor={colors.Red} handleBtn={() => {}}>
                <PressMotion>
                  <div style={{ fontWeight: '500' }}>투자하러 가기</div>
                </PressMotion>
              </Btn>
            </StyledLink>
          </Button>
        </HistoryTop>

        <NavyLine />

        <div style={{ padding: '1rem' }}>
          <Filter
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            clicked={clicked}
            setClicked={setClicked}
          />
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

        {/* 버튼 자리만큼 공간 생성 */}
        <div style={{ height: '4rem' }}></div>
        <ButtonWrapper>
          <WithdrawBox clicked={clicked}>
            <WithdrawBtn to={'/withdraw'}>
              <Btn bgColor={colors.Blue} handleBtn={() => {}}>
                <PressMotion>
                  <div
                    style={{
                      color: `${colors.White}`,
                      fontWeight: '500',
                      letterSpacing: '0.2em',
                    }}
                  >
                    출금하기
                  </div>
                </PressMotion>
              </Btn>
            </WithdrawBtn>
          </WithdrawBox>
        </ButtonWrapper>
      </Wrap>
    </>
  );
}
