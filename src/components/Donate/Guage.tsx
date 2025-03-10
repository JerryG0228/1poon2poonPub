import { colors } from '@/styles/colors';
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
`;

const GuageBar = styled.div<{ per: number }>`
  position: absolute;
  top: 0rem;

  width: ${(props) => (props.per * 85) / 100}%;
  height: 1.2rem;
  border-radius: 5rem;

  background: linear-gradient(to right, #0064ff, #cbdfad);
`;

interface Props {
  currDonate: number;
  targetDonate: number;
}

export default function Guage({ currDonate, targetDonate }: Props) {
  const per = Math.floor((currDonate / targetDonate) * 100);

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <GuageWrapper>
          <GuageBg />
          <GuageBar per={per} />
          <Percentage per={per}>{per > 0 ? per : 0} %</Percentage>
        </GuageWrapper>
      </div>
    </div>
  );
}
