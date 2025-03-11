import { colors } from '@/styles/colors';
import styled from 'styled-components';

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

const ExchangeBox = styled.div`
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
  return (
    <>
      <ExchangeWrap>
        <ExchangeTitle>내 계좌보기</ExchangeTitle>
        <ExchangeContent>
          <ExchangeBox>
            <ExchangeSubTitle>원화</ExchangeSubTitle>
            <ExchangeAmount>0원</ExchangeAmount>
          </ExchangeBox>
          <ExchangeBox>
            <ExchangeSubTitle>달러</ExchangeSubTitle>
            <ExchangeAmount>$0.00</ExchangeAmount>
          </ExchangeBox>
        </ExchangeContent>
      </ExchangeWrap>
    </>
  );
}
