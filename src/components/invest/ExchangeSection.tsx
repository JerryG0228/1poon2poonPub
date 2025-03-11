import { colors } from '@/styles/colors';
import styled from 'styled-components';
import useStore from '@/store/User'; // 상태 가져오기
import { Link } from 'react-router-dom';

const ExchangeWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
`;

const ExchangeTitle = styled.div`
  display: flex;
  color: ${colors.White};
  font-size: 1.2rem;
  font-weight: 600;
`;

const ExchangeContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  gap: 1rem;
`;

// const ExchangeBoxContainer = styled(Link)`
//   flex: 1; /* 두 개의 박스를 균등하게 배치 */
//   min-width: 150px; /* 너무 작아지는 걸 방지 */
//   display: flex;
// `;

const ExchangeBox = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 1rem 1.2rem;
  gap: 0.5rem;
  flex: 1;
  background-color: #313845;
  border-radius: 0.5rem;
`;

const ExchangeSubTitle = styled.div`
  display: flex;
  color: ${colors.Grey};
`;

const ExchangeAmount = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 1.2rem;
`;

export default function ExchangeSection() {
  const { points, dollars } = useStore(); // 상태에서 포인트, 달러 가져오기

  return (
    <ExchangeWrap>
      <ExchangeTitle>내 계좌보기</ExchangeTitle>
      <ExchangeContent>
        {/* <ExchangeBoxContainer to={'/investDollarsHistory'}> */}
        <ExchangeBox to={'/investPointsHistory'}>
          <ExchangeSubTitle>포인트</ExchangeSubTitle>
          <ExchangeAmount>{points.toLocaleString()}원</ExchangeAmount> {/* ✅ 포인트 표시 */}
        </ExchangeBox>
        {/* </ExchangeBoxContainer> */}
        {/* <ExchangeBoxContainer to={'/investPointsHistory'}> */}
        <ExchangeBox to={'/investDollarsHistory'}>
          <ExchangeSubTitle>달러</ExchangeSubTitle>
          <ExchangeAmount>${dollars.toFixed(2)}</ExchangeAmount> {/* ✅ 달러 표시 */}
        </ExchangeBox>
        {/* </ExchangeBoxContainer> */}
      </ExchangeContent>
    </ExchangeWrap>
  );
}
