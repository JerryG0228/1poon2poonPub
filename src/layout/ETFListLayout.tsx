import { Outlet, useNavigate } from 'react-router-dom';
import { colors } from '@/styles/colors';
import styled from 'styled-components';
import useStore from '@/store/User';
import { useRef, useState } from 'react';

import { IoMenu } from 'react-icons/io5';
import { IoChevronBackSharp } from 'react-icons/io5';

const Top = styled.div<{ shadowOpacity: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0rem;
  padding: 0.8rem 1rem 0.7rem;
  z-index: 1000;
  box-shadow: ${({ shadowOpacity }) =>
    `0 3px 6px rgba(0, 0, 0, ${shadowOpacity * 0.16}), 0 3px 6px rgba(0, 0, 0, ${
      shadowOpacity * 0.23
    })`};
  background-color: ${colors.Navy};
  transition: box-shadow 0.2s ease;
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

export default function ETFListLayout() {
  const navigate = useNavigate();
  const { interests } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [shadowOpacity, setShadowOpacity] = useState(0);

  const HandleIcon = () => {
    navigate('/');
  };

  const HandleHomeClick = () => {
    navigate('/etf-list', { state: { selectedCategories: interests } });
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const opacity = Math.min(scrollTop / 50, 1);
      setShadowOpacity(opacity);
    }
  };

  return (
    <Container ref={containerRef} onScroll={handleScroll}>
      <Top shadowOpacity={shadowOpacity}>
        <Icon onClick={HandleIcon}>
          <IoChevronBackSharp color={colors.White} size="1.5rem" />
        </Icon>
        <Icon onClick={HandleHomeClick}>
          <IoMenu color={colors.White} size="1.6rem" />
        </Icon>
      </Top>
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
}
