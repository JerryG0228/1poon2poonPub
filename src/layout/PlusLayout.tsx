import { Outlet, useNavigate } from 'react-router-dom';
import { colors } from '@/styles/colors';
import styled from 'styled-components';
import { useRef, useState } from 'react';

import { IoChevronBackSharp } from 'react-icons/io5';
import { CgArrowsExchangeAlt } from 'react-icons/cg';

const Top = styled.div<{ shadowOpacity: number }>`
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
  background-color: ${colors.Navy};
`;

const Icon = styled.div`
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
`;

const Content = styled.div`
  height: 100%;
`;

export default function PlusLayout() {
  const navigate = useNavigate();
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
    navigate('/InvestmentHome');
  };

  const HandleHomeClick = () => {
    navigate('/investCategory');
  };

  return (
    <Container ref={containerRef} onScroll={handleScroll}>
      <Top shadowOpacity={shadowOpacity}>
        <Icon onClick={HandleIcon}>
          <IoChevronBackSharp color={colors.White} size="1.5rem" />
        </Icon>
        <Icon onClick={HandleHomeClick}>
          <CgArrowsExchangeAlt color={colors.White} size="1.6rem" />
        </Icon>
      </Top>
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
}
