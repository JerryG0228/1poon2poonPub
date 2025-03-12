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
import DonateCategory from '@/pages/donate/DonateCategory';
import DonateGoal from '@/pages/donate/DonateGoal';
import InvestMainBefore from './pages/invest/InvestMainBefore';
import DonateHome from '@/pages/donate/DonateHome';
import USDExchangeRate from '@/pages/invest/USDExchangeRate';
import KRWExchangeRate from '@/pages/invest/KRWExchangeRate';
import ETFBuy from '@/pages/invest/ETFBuy';
import ETFSell from '@/pages/invest/ETFSell';
import Donate from '@/pages/donate/Donate';
import InvestmentHome from '@/pages/invest/InvestmentHome';
import DonateSetFinish from '@/pages/donate/DonateSetFinish';
import DonateComplete from '@/pages/donate/DonateComplete';
import Pay from '@/pages/pay/Pay';
import PayMain from '@/pages/pay/PayMain';
import PayComplete from '@/pages/pay/PayComplete';
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
      { path: 'donatebefore', element: <DonateMainBefore /> }, //기부 처음 시작 페이지
      { path: 'donatecategory', element: <DonateCategory /> }, //기부 카테고리 선택 페이지
      { path: 'donategoal', element: <DonateGoal /> }, //기부 목표 금액 설정 페이지
      { path: 'donate', element: <Donate /> }, //기부 포인트 적립 페이지
      { path: 'investbefore', element: <InvestMainBefore /> },
      { path: 'etf-detail/:symbol', element: <ETFDetail /> },
      { path: 'investCategory', element: <InvestCategory /> }, // 투자 카테고리 페이지
      { path: 'USDExchangeRate', element: <USDExchangeRate /> },
      { path: 'KRWExchangeRate', element: <KRWExchangeRate /> },
      { path: 'investDollarsHistory', element: <InvestDollarsHistory /> }, // 달러 내역 페이지
      { path: 'investPointsHistory', element: <InvestPointsHistory /> }, // 포인트 내역 페이지
      { path: 'paymain', element: <PayMain /> }, //결제 페이지
      { path: 'withdraw', element: <WithDraw /> }, // 포인트 출금 페이지
    ],
  },

  // DonateMainLayout
  {
    path: '/donatehome',
    element: <DonateMainLayout />,
    children: [{ path: '', element: <DonateHome /> }], //기부 메인 페이지
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

  { path: 'withdrawfinish', element: <WithDrawFinish /> }, // 출금 완료 페이지
  { path: '/donatesetfinish', element: <DonateSetFinish /> }, //기부 설정 완료 페이지
  { path: '/donatecomplete', element: <DonateComplete /> }, //기부 완료 페이지
  { path: '/pay', element: <Pay /> }, //결제 시작 페이지
  { path: '/paycomplete', element: <PayComplete /> }, //결제 완료 페이지
];

export default routes;
