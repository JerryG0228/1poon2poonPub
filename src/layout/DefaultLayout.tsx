import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { colors } from '@/styles/colors';
import styled from 'styled-components';

import { IoChevronBackSharp } from 'react-icons/io5';
import { CiLogout } from 'react-icons/ci';

const Top = styled.div<{ bg: String }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0rem;
  padding: 0.8rem 1rem 0.7rem;
  z-index: 1000;
  background-color: ${(props) =>
    props.bg == '/pointhistory' ? '#313845' : props.bg == '/paymain' ? colors.White : colors.Navy};
`;

const Icon = styled.div`
  z-index: 999;
  cursor: pointer;
  transition: opacity 0.2s ease;
  &:active {
    opacity: 0.6;
  }
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
    <div>
      <Top>
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
      <Outlet />
    </div>
  );
}
