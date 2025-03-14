import styled from 'styled-components';
import NonTitleBox from '@components/NonTitleBox';
import cashbackImage from '@/assets/Main/CashbackIcon.png';
import { IoIosArrowForward } from 'react-icons/io';
import PressMotion from '../PressMotion';
import NumberFlow from '@number-flow/react';
import { useEffect, useState } from 'react';

const CashBackWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0rem 1rem;
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

const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
`;

const CashBackTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Point = styled.div`
  font-size: 0.7rem;
  font-weight: 500;
`;

const CashBacArrowWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface PointHistorySectionProps {
  points: number;
}

export default function PointHistorySection({ points }: PointHistorySectionProps) {
  const [displayPoints, setDisplayPoints] = useState(points);

  useEffect(() => {
    setDisplayPoints(points);
  }, [points]);

  return (
    <NonTitleBox>
      <PressMotion>
        <CashBackWrap>
          <CashBackImageWrap>
            <img src={cashbackImage} />
          </CashBackImageWrap>
          <ContentBox>
            <CashBackTextWrap>
              {/* toLocaleString : 숫자에 3자리마다 쉼표(,)를 자동으로 추가해주는 기능 */}
              <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                <NumberFlow value={displayPoints} duration={2} />
              </div>
              <Point>캐시백 포인트</Point>
            </CashBackTextWrap>
            <CashBacArrowWrap>
              <IoIosArrowForward style={{ fontSize: '1.5rem' }} />
            </CashBacArrowWrap>
          </ContentBox>
        </CashBackWrap>
      </PressMotion>
    </NonTitleBox>
  );
}
