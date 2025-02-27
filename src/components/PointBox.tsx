import styled from 'styled-components';
import Point from '@/assets/PointBox/PointImg.png';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-left: 1rem;
  margin-right: 1rem;
  height: 6rem;
`;
const Date = styled.div`
  color: #c5c5c5;
  font-size: 0.9rem;
`;
const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;
const PointImg = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;
const PointContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
const PointMainContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;
const PointTitle = styled.div`
  font-size: 1rem;
`;
const PointRecord = styled.div<{ transPoint: number }>`
  font-size: 1rem;
  color: ${(props) => {
    return props.transPoint && props.transPoint > 0 ? '#FF0000' : '#0064FF';
  }};
`;
const PointSubContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  color: #c5c5c5;
`;
const PointTime = styled.div`
  font-size: 0.6rem;
`;
const PointAcc = styled.div`
  font-size: 0.6rem;
`;

interface Props {
  date: string;
  time: string;
  name: string;
  point: string;
  transPoint: number;
}

function PointBox({ date, time, name, point, transPoint }: Props) {
  return (
    <Box>
      <Date>{date}</Date>
      <ContentBox>
        <PointImg src={Point}></PointImg>
        <PointContent>
          <PointMainContent>
            <PointTitle>{name}</PointTitle>
            <PointRecord transPoint={transPoint}>
              {transPoint > 0 ? `+${transPoint}` : transPoint}원
            </PointRecord>
          </PointMainContent>
          <PointSubContent>
            <PointTime>{time}</PointTime>
            <PointAcc>{point}원</PointAcc>
          </PointSubContent>
        </PointContent>
      </ContentBox>
    </Box>
  );
}

export default PointBox;
