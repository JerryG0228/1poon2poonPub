import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { colors } from '@/styles/colors';
import styled from 'styled-components';
import { useRef, useState } from 'react';

import { IoChevronBackSharp } from 'react-icons/io5';
import { CiLogout } from 'react-icons/ci';

const Top = styled.div<{ bg: String; shadowOpacity: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0rem;
  padding: 0.8rem 1rem 0.7rem;
  box-shadow: ${({ shadowOpacity }) =>
    `0 3px 6px rgba(0, 0, 0, ${shadowOpacity * 0.16}), 0 3px 6px rgba(0, 0, 0, ${
      shadowOpacity * 0.23
    })`};
  z-index: 1000;
  background-color: ${(props) => {
    if (
      props.bg === '/pointhistory' ||
      props.bg === '/investPointsHistory' ||
      props.bg === '/investDollarsHistory'
    ) {
      return '#313845';
    } else if (props.bg == '/paymain') {
      console.log(11);
      return colors.White;
    } else {
      return colors.Navy;
    }
  }};
  transition: box-shadow 0.2s ease;
`;

const Icon = styled.div`
  z-index: 999;
  cursor: pointer;
  transition: opacity 0.2s ease;
  &:active {
    opacity: 0.6;
  }
`;

const Container = styled.div`
  height: 100%;
  overflow-y: auto;
  position: relative;

  /* 웹킷 브라우저용 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }

  /* IE, Edge, Firefox용 스크롤바 숨기기 */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Content = styled.div`
  height: 100%;
`;

const backNavigationMap: Record<string, string> = {
  '/': '/',
  '/pointhistory': '/',
  '/donatebefore': '/',
  '/donategoal': '/donatecategory',
  '/donate': '/donatehome',
  '/investbefore': '/',
  '/USDExchangeRate': '/investPointsHistory',
  '/KRWExchangeRate': '/investDollarsHistory',
  '/investDollarsHistory': '/investmentHome',
  '/investPointsHistory': '/investmentHome',
  '/paymain': '/pay',
  '/withdraw': '/pointhistory',
  '/investCategory': '/investmentHome',
};

export default function DefaultLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [shadowOpacity, setShadowOpacity] = useState(0);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const opacity = Math.min(scrollTop / 50, 1);
      setShadowOpacity(opacity);
    }
  };

  const HandleIcon = () => {
    const currentPath = location.pathname;

    if (backNavigationMap[currentPath]) {
      navigate(backNavigationMap[currentPath]);
    } else {
      navigate(-1);
    }
  };

  const HandleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Container ref={containerRef} onScroll={handleScroll}>
      <Top bg={location.pathname} shadowOpacity={shadowOpacity}>
        {location.pathname !== '/' ? (
          <Icon onClick={HandleIcon}>
            <IoChevronBackSharp color={colors.White} size="1.5rem" />
          </Icon>
        ) : (
          <Icon onClick={HandleLogout}>
            <CiLogout color={colors.White} size="1.5rem" />
          </Icon>
        )}
      </Top>
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
}
