import { colors } from '@/styles/colors';
import styled from 'styled-components';

const Percentage = styled.div<{ per: number }>`
  color: ${colors.White};
  font-weight: 500;
  font-size: 0.9rem;

  width: ${(props) => props.per + 3}%;
  text-align: right;
`;

const GuageBg = styled.div`
  width: 100%;
  height: 0.8rem;
  border-radius: 5rem;
  background-color: #313845;
`;

const GuageBar = styled.div<{ per: number }>`
  position: absolute;
  top: 0;

  width: ${(props) => props.per}%;
  height: 0.8rem;
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
      <Percentage per={per}>{per}%</Percentage>
      <div style={{ marginTop: '0.5rem', position: 'relative' }}>
        <GuageBg />
        <GuageBar per={per} />
      </div>
    </div>
  );
}
