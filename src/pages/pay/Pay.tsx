import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from '@/assets/Pay/Logo.png';
import PressMotion from '@/components/PressMotion';
import TitleBox from '@/components/TitleBox';
import NonTitleBox from '@/components/NonTitleBox';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10rem;
  font-weight: bold;
  padding: 0 1rem;
  margin-top: 10rem;
`;
const Logo = styled.img`
  width: 15rem;
`;

const Service = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

const Button = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px sollid red;
  width: 7rem;
  justify-content: center;
  align-items: center;
  > img {
    width: 4rem;
    height: 4rem;
  }
`;

const ServiceTitle = styled.div`
  font-size: 1em;
  color: #b2b2b2;
  margin-top: 0.8rem;
`;

const VerticalLine = styled.div`
  display: flex;
  width: 1px;
  height: 100px;
  background: linear-gradient(to bottom, #313845 0%, #4d596e 24%, #4d596e 73%, #313845 100%);
`;

export default function Pay() {
  return (
    <Box>
      <Logo src={LogoImg}></Logo>
      <TitleBox title="">
        <Service>
          <Link to="/">
            <PressMotion>
              <Button varient="donate">
                <img src={LogoImg} />
                <ServiceTitle>정보보기</ServiceTitle>
              </Button>
            </PressMotion>
          </Link>
          <VerticalLine></VerticalLine>
          <Link to="/paymain">
            <PressMotion>
              <Button varient="invest">
                <img src={LogoImg} />
                <ServiceTitle>결제하기</ServiceTitle>
              </Button>
            </PressMotion>
          </Link>
        </Service>
      </TitleBox>
    </Box>
  );
}
