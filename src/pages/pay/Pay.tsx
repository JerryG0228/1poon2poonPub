import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PressMotion from '@/components/PressMotion';
import Lottie from 'lottie-react';
import welcome1 from '@/assets/Pay/welcome1.json';
import { createGlobalStyle } from 'styled-components';
import { colors } from '@/styles/colors';
import PayButtonBox from '@/components/Pay/PayButtonBox';
import shopping from '@/assets/Pay/shopping.png';
import search from '@/assets/Pay/search.png';

const GlobalStyle = createGlobalStyle`
  #root {
    background-color: white !important;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  font-weight: bold;
  padding: 0 2rem;
  margin-top: 2rem;
`;

const Title = styled.div`
  font-size: 2rem;
  color: black;
  font-weight: bold;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
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
const StyledLottie = styled(Lottie)`
  width: 20rem;
  height: 20rem;
`;
const ServiceTitle = styled.div`
  font-size: 1.5em;
  color: ${colors.Black};
  margin-top: 0.8rem;
`;

const VerticalLine = styled.div`
  display: flex;
  width: 1px;
  height: 9rem;
  background: linear-gradient(
    to bottom,
    rgb(200, 200, 200) 0%,
    rgb(180, 180, 180) 24%,
    rgb(140, 140, 140) 50%,
    rgb(180, 180, 180) 73%,
    rgb(200, 200, 200) 100%
  );
`;

export default function Pay() {
  return (
    <Box>
      <GlobalStyle />
      <Title>
        반가워요!
        <br /> 무엇을 도와드릴까요?
      </Title>
      <ContentBox>
        <StyledLottie animationData={welcome1} loop={false} />
        <PayButtonBox title="">
          <Service>
            <Link to="/">
              <PressMotion>
                <Button varient="donate">
                  <img src={search} />
                  <ServiceTitle>정보보기</ServiceTitle>
                </Button>
              </PressMotion>
            </Link>
            <VerticalLine></VerticalLine>
            <Link to="/paymain">
              <PressMotion>
                <Button varient="invest">
                  <img src={shopping} />
                  <ServiceTitle>결제하기</ServiceTitle>
                </Button>
              </PressMotion>
            </Link>
          </Service>
        </PayButtonBox>
      </ContentBox>
    </Box>
  );
}
