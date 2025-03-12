// Layouts
import DefaultLayout from './layout/DefaultLayout';
import PlusLayout from './layout/PlusLayout';
import HomeLayout from './layout/HomeLayout';
import DonateMainLayout from './layout/DonateMainLayout';

// Pages
import Main from './pages/main/Main';
import PointHistory from './pages/main/PointHistory'; //포인트 상세 내역 페이지
import DonateMainBefore from './pages/donate/DonateMainBefore';
import InvestCategory from '@/pages/invest/investCategory'; // 투자 카테고리 선택
import ETFList from '@/pages/invest/ETFList'; // ETF 목록
import ETFDetail from '@/pages/invest/ETFDetail'; // ETF 상세 페이지
import ETFCategoryList from '@/pages/invest/ETFCategoryList';
import DonateCategory from './pages/donate/DonateCategory';
import DonateGoal from './pages/donate/DonateGoal';
import InvestMainBefore from './pages/invest/InvestMainBefore';
import DonateHome from './pages/donate/DonateHome';
import USDExchangeRate from '@/pages/invest/USDExchangeRate';
import KRWExchangeRate from '@/pages/invest/KRWExchangeRate';
import ETFBuy from '@/pages/invest/ETFBuy';
import ETFSell from '@/pages/invest/ETFSell';
import Donate from '@/pages/donate/Donate';
import InvestmentHome from '@/pages/invest/InvestmentHome';
import DonateSetFinish from './pages/donate/DonateSetFinish';
import DonateComplete from './pages/donate/DonateComplete';
import InvestDollarsHistory from './pages/invest/InvestDollarsHistory'; // 달러 상세 내역 페이지
import InvestPointsHistory from './pages/invest/InvestPointsHistory'; // 포인트 상세 내역 페이지
import WithDraw from './pages/main/WithDraw';
import WithDrawFinish from './pages/main/WithDrawFinish';

const routes = [
  // DefaultLayout
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <Main /> }, // 메인 페이지
      { path: 'pointhistory', element: <PointHistory /> }, // 포인트 내역
      { path: 'donatebefore', element: <DonateMainBefore /> }, // 투자 카테고리 선택
      { path: 'donatecategory', element: <DonateCategory /> },
      { path: 'donategoal', element: <DonateGoal /> },
      { path: 'donate', element: <Donate /> },
      { path: 'investbefore', element: <InvestMainBefore /> },
      { path: 'etf-detail/:symbol', element: <ETFDetail /> },
      { path: 'investCategory', element: <InvestCategory /> }, // 투자 카테고리 페이지
      { path: 'USDExchangeRate', element: <USDExchangeRate /> },
      { path: 'KRWExchangeRate', element: <KRWExchangeRate /> },
      { path: 'investDollarsHistory', element: <InvestDollarsHistory /> }, // 달러 내역 페이지
      { path: 'investPointsHistory', element: <InvestPointsHistory /> }, // 포인트 내역 페이지
      { path: 'withdraw', element: <WithDraw /> }, // 포인트 출금 페이지
      { path: 'withdrawfinish', element: <WithDrawFinish /> }, // 출금 완료 페이지
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
      { path: 'etf-list', element: <ETFList /> }, // ETF 목록
      { path: 'etf-category/:category', element: <ETFCategoryList /> },
      { path: 'etf-buy/:symbol', element: <ETFBuy /> },
      { path: 'etf-sell/:symbol', element: <ETFSell /> },
    ],
  },

  { path: '/donatesetfinish', element: <DonateSetFinish /> },
  { path: '/donatecomplete', element: <DonateComplete /> },
];

export default routes;
