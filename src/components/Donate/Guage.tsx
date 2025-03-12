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

  transition: width 1.2s ease-in-out;
`;

interface Props {
  currDonate: number;
  targetDonate: number;
}

export default function Guage({ currDonate, targetDonate }: Props) {
  const [per, setPer] = useState(0);

  useEffect(() => {
    const newPer = Math.floor((currDonate / targetDonate) * 100);
    const calculatedWidth = (newPer * 85) / 100;
    setPer(calculatedWidth);
  }, [currDonate, targetDonate]);

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <GuageWrapper>
          <GuageBg />
          <GuageBar per={per} />
          <Percentage>{per ? Math.floor((currDonate / targetDonate) * 100) : 0}%</Percentage>
        </GuageWrapper>
      </div>
    </div>
  );
}
