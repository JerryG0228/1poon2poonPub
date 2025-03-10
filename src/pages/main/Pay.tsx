import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22rem;
  font-weight: bold;
  padding: 0 1rem;
`;
const Logo = styled.img``;
const ButtonBox = styled.div``;
const EtcButton = styled.button``;

const PayButton = styled.button``;

export default function Pay() {
  return (
    <Box>
      <Logo></Logo>
      <ButtonBox>
        <EtcButton>정보 보기</EtcButton>
        <Link to="/paymain">
          <PayButton>결제 하기</PayButton>
        </Link>
      </ButtonBox>
    </Box>
  );
}
