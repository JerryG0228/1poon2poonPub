import styled from 'styled-components';
import NonTitleBox from '@components/NonTitleBox';
import cashbackImage from '@/assets/Main/CashbackIcon.png';
import vectorImage from '@/assets/Main/Vector.png';

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CashBackWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CashBackImageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6e6430;
  border-radius: 0.3rem;
  width: 2rem;
  height: 2rem;
  > img {
    width: 1.2rem;
    height: 1.25rem;
  }
`;

const CashBackTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 15rem;
`;

const Balance = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
`;

const Point = styled.div`
  font-size: 0.7rem;
`;

const CashBacArrowWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    justify-content: center;
    align-items: center;
    width: 0.8rem;
    height: 1.1rem;
  }
`;

interface PointHistorySectionProps {
  point: number;
}

export default function PointHistorySection({ point }: PointHistorySectionProps) {
  return (
    <>
      <NonTitleBox>
        <CashBackWrap>
          <CashBackImageWrap>
            <img src={cashbackImage} />{' '}
          </CashBackImageWrap>
          <CashBackTextWrap>
            <Balance>{point}원</Balance>
            <Point>캐시백 포인트</Point>
          </CashBackTextWrap>
          <CashBacArrowWrap>
            <img src={vectorImage} />
          </CashBacArrowWrap>
        </CashBackWrap>
      </NonTitleBox>
    </>
  );
}
