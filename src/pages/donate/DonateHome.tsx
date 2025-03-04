import CharacterBox from '@/components/CharacterBox';
import Guage from '@/components/Guage';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export default function DonateHome() {
  const location = useLocation();
  const target = location.state.data.price;

  return (
    <Box>
      <CharacterBox currDonate={40000} targetDonate={target}></CharacterBox>

      <Guage currDonate={10000} targetDonate={target}></Guage>
    </Box>
  );
}
