// Layouts
import DefaultLayout from './layout/DefaultLayout';
import PlusLayout from './layout/PlusLayout';
import HomeLayout from './layout/HomeLayout';
import DonateMainLayout from './layout/DonateMainLayout';

// Pages
import Main from './pages/main/Main'; // 메인 페이지
import PointHistory from './pages/main/PointHistory'; // 포인트 내역
import DonateMainBefore from './pages/donate/DonateMainBefore';
import InvestCategory from '@/pages/invest/Category'; // 투자 카테고리 선택
import ETFList from '@/pages/invest/ETFList'; // ETF 목록
import ETFDetail from '@/pages/invest/ETFDetail'; // ETF 상세 페이지
import ETFCategoryList from '@/pages/invest/ETFCategoryList';
import DonateCategory from './pages/donate/DonateCategory';
import DonateGoal from './pages/donate/DonateGoal';
import InvestMainBefore from './pages/invest/InvestMainBefore';
import DonateHome from './pages/donate/DonateHome';
import Invest from '@/pages/invest/InvestMainBefore';
import ETFBuy from '@/pages/invest/ETFBuy';
import ETFSell from '@/pages/invest/ETFSell';
import Donate from '@/pages/donate/Donate';
import InvestmentHome from '@/pages/invest/InvestmentHome';
import DonateSetFinish from './pages/donate/DonateSetFinish';
import DonateComplete from './pages/donate/DonateComplete';

const routes = [
  // DefaultLayout
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <Main /> },
      { path: 'pointhistory', element: <PointHistory /> },
      { path: 'donatebefore', element: <DonateMainBefore /> },
      { path: 'donatecategory', element: <DonateCategory /> },
      { path: 'donategoal', element: <DonateGoal /> },
      { path: 'donate', element: <Donate /> },
      { path: 'investbefore', element: <InvestMainBefore /> },
      { path: 'etf-detail/:symbol', element: <ETFDetail /> },
      { path: 'InvestMainBefore', element: <Invest /> },
      { path: 'investCategory', element: <InvestCategory /> },
    ],
  },

  // DonateMainLayout
  {
    path: '/donatehome',
    element: <DonateMainLayout />,
    children: [{ path: '', element: <DonateHome /> }],
  },

  // PlusLayout
  {
    path: '/InvestmentHome',
    element: <PlusLayout />,
    children: [{ path: '', element: <InvestmentHome /> }],
  },

  // HomeLayout
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      { path: 'etf-list', element: <ETFList /> },
      { path: 'etf-category/:category', element: <ETFCategoryList /> },
      { path: 'etf-buy/:symbol', element: <ETFBuy /> },
      { path: 'etf-sell/:symbol', element: <ETFSell /> },
    ],
  },

  { path: 'donatesetfinish', element: <DonateSetFinish /> },
  { path: 'donatecomplete', element: <DonateComplete /> },
];

export default routes;
