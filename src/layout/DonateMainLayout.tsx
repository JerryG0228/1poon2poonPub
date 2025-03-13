import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { colors } from '@/styles/colors';
import styled from 'styled-components';

import { IoChevronBackSharp } from 'react-icons/io5';

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Icon = styled.div`
  z-index: 999;
  padding-top: 1rem;
  padding-left: 1rem;
  width: 1.5rem;

  margin-bottom: 1rem;
  cursor: pointer;

  transition: opacity 0.2s ease;
  &:active {
    opacity: 0.6;
  }
`;

const backNavigationMap: Record<string, string> = {
  '/donatehome': '/',
};

export default function DonateMainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  const HandleIcon = () => {
    const currentPath = location.pathname;

    if (backNavigationMap[currentPath]) {
      navigate(backNavigationMap[currentPath]);
    } else {
      navigate('/');
    }
  };

  return (
    <div>
      <Top>
        <Icon onClick={HandleIcon}>
          <IoChevronBackSharp color={colors.White} size="1.5rem" />
        </Icon>
      </Top>
      <Outlet />
    </div>
  );
}
