import Btn from '@/components/Btn';
import PressMotion from '@/components/PressMotion';
import { colors } from '@/styles/colors';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import downArrowImage from '@/assets/DownArrow.png';
import usageIcon from '@/assets/UsageIcon.png';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
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
  top: 20rem;
  width: 45rem;
  right: 0.2rem;
  height: 1rem;
  background-color: #ffffff;
`;

const PointFilter = styled.div`
  display: flex;
  flex-direction: row;
  height: 2rem;
  margin: 2rem 0 1rem 0;
  align-items: center;
  overflow: hidden;
`;

const PointNav = styled.div`
  display: flex;
  font-size: 1rem;
  height: 2rem;
  align-items: start;
  > ul > li {
    height: 2rem;
    line-height: 2rem;
  }
`;

const DownArrow = styled.div`
  display: flex;
  > img {
    width: 1rem;
    height: 0.6rem;
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
            <ul>
              <li>전체</li>
              <li>적립 내역</li>
              <li>사용 내역</li>
            </ul>
          </PointNav>
          <DownArrow>
            <img src={downArrowImage} />
          </DownArrow>
        </PointFilter>
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
