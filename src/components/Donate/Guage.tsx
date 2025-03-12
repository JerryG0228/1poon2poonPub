import { colors } from '@/styles/colors';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Percentage = styled.div<{ per: number }>`
  color: ${colors.White};
  font-weight: 500;
  font-size: 0.9rem;

  text-align: right;
`;

const GuageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const GuageBg = styled.div`
  width: 85%;
  height: 1.2rem;
  border-radius: 5rem;
  background-color: ${colors.Navy};
  position: relative;
  overflow: hidden;
`;

const GuageBar = styled.div<{ per: number }>`
  position: absolute;
  top: 0rem;

  width: ${(props) => props.per}%;
  height: 1.2rem;
  border-radius: 5rem;

  background: linear-gradient(to right, #0064ff, #cbdfad);

  transition: width 1s ease-in-out;
`;

interface Props {
  currDonate: number;
  targetDonate: number;
}

export default function Guage({ currDonate, targetDonate }: Props) {
  const [per, setPer] = useState(0);

  useEffect(() => {
    const newPer = Math.floor((currDonate / targetDonate) * 100);
    const calculatedWidth = (newPer * 85) / 100; // 전체 너비의 비율 계산 (85% 기준)
    setTimeout(() => setPer(calculatedWidth), 100); // 약간의 딜레이 추가
  }, [currDonate, targetDonate]);

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <GuageWrapper>
          <GuageBg />
          <GuageBar per={per} />
          <Percentage>{Math.floor((currDonate / targetDonate) * 100)}%</Percentage>
        </GuageWrapper>
      </div>
    </div>
  );
}
