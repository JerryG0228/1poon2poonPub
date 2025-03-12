import { useLocation } from 'react-router-dom';

const getPageByPath = (path: string) => {
  if (path === '/') {
    return 'home';
  }
  if (path === '/pointhistory') {
    return 'pointhistory';
  }
};

const useTransitionSelect = () => {
  const location = useLocation();
  const previousPath = sessionStorage.getItem('path') || '/';

  const previousPage = getPageByPath(previousPath);
  const currentPage = getPageByPath(location.pathname);

  console.log('currentPage', currentPage);
  console.log('prevPage', previousPage);

  sessionStorage.setItem('path', location.pathname);

  if (currentPage === 'home') {
    if (previousPage === 'pointhistory') {
      return 'slide-left';
    }
  }

  if (currentPage === 'pointhistory') {
    if (previousPage === 'home') {
      return 'slide-right';
    }
  }

  return '';
};

export default useTransitionSelect;
