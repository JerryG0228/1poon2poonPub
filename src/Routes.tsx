// Layouts
import DefaultLayout from './layout/DefaultLayout';
import PlusLayout from './layout/PlusLayout';
import HomeLayout from './layout/HomeLayout';
import DonateMainLayout from './layout/DonateMainLayout';
import ETFListLayout from './layout/ETFListLayout';

// Pages
import Main from './pages/main/Main';
import PointHistory from './pages/main/PointHistory'; //포인트 상세 내역 페이지
import DonateMainBefore from './pages/donate/DonateMainBefore';
import InvestCategory from './pages/invest/investCategory'; // 투자 카테고리 선택
import ETFList from '@/pages/invest/ETFList'; // ETF 목록
import ETFDetail from '@/pages/invest/ETFDetail'; // ETF 상세 페이지
import ETFCategoryList from '@/pages/invest/ETFCategoryList'; // 투자 카테고리별 ETF 리스트 페이지
import DonateCategory from '@/pages/donate/DonateCategory';
import DonateGoal from '@/pages/donate/DonateGoal';
import InvestMainBefore from './pages/invest/InvestMainBefore';
import DonateHome from '@/pages/donate/DonateHome';
import USDExchangeRate from '@/pages/invest/USDExchangeRate'; // 달러 환전 페이지
import KRWExchangeRate from '@/pages/invest/KRWExchangeRate'; // 원화 환전 페이지
import ETFBuy from '@/pages/invest/ETFBuy'; // ETF 구매 페이지
import ETFSell from '@/pages/invest/ETFSell'; // ETF 판매 페이지
import Donate from '@/pages/donate/Donate';
import InvestmentHome from '@/pages/invest/InvestmentHome'; // 투자 내페이지
import DonateSetFinish from '@/pages/donate/DonateSetFinish';
import DonateComplete from '@/pages/donate/DonateComplete';
import Pay from '@/pages/pay/Pay';
import PayMain from '@/pages/pay/PayMain';
import PayComplete from '@/pages/pay/PayComplete';
import InvestDollarsHistory from './pages/invest/InvestDollarsHistory'; // 달러 상세 내역 페이지
import InvestPointsHistory from './pages/invest/InvestPointsHistory'; // 포인트 상세 내역 페이지
import WithDraw from './pages/main/WithDraw';
import WithDrawFinish from './pages/main/WithDrawFinish';
import LoginLayout from './layout/LoginLayout';
import Login from './pages/login/Login';
import Signup from './pages/login/Signup';
import HeartLayout from './layout/HeartLayout';
import SignIn from './pages/Sign/SignIn';

const routes = [
  // DefaultLayout
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { path: '', element: <Main /> }, // 메인 페이지
      { path: 'pointhistory', element: <PointHistory /> }, // 포인트 내역
      { path: 'donatebefore', element: <DonateMainBefore /> }, //기부 처음 시작 페이지
      { path: 'donatecategory', element: <DonateCategory /> }, //기부 카테고리 선택 페이지
      { path: 'donategoal', element: <DonateGoal /> }, //기부 목표 금액 설정 페이지
      { path: 'donate', element: <Donate /> }, //기부 포인트 적립 페이지
      { path: 'investbefore', element: <InvestMainBefore /> },
      { path: 'USDExchangeRate', element: <USDExchangeRate /> }, // 달러 환전 페이지
      { path: 'KRWExchangeRate', element: <KRWExchangeRate /> }, // 원화 환전 페이지
      { path: 'investDollarsHistory', element: <InvestDollarsHistory /> }, // 달러 내역 페이지
      { path: 'investPointsHistory', element: <InvestPointsHistory /> }, // 포인트 내역 페이지
      { path: 'paymain', element: <PayMain /> }, //결제 페이지
      { path: 'withdraw', element: <WithDraw /> }, // 포인트 출금 페이지
      { path: 'investmentHome', element: <InvestmentHome /> }, // 투자 카테고리 페이지
    ],
  },

  // LoginLayout
  {
    path: '/',
    element: <LoginLayout />,
    children: [
      { path: 'login', element: <Login /> }, // 로그인 페이지
      { path: 'signup', element: <Signup /> }, // 회원가입 페이지
    ],
  },

  // HeartLayout
  {
    path: '/',
    element: <HeartLayout />,
    children: [{ path: 'etf-detail/:symbol', element: <ETFDetail /> }], // ETF 상세 페이지
  },

  // DonateMainLayout
  {
    path: '/donatehome',
    element: <DonateMainLayout />,
    children: [{ path: '', element: <DonateHome /> }], //기부 메인 페이지
  },

  // PlusLayout
  {
    path: '/etf-list',
    element: <PlusLayout />,
    children: [{ path: '', element: <ETFList /> }], // 투자 내 페이지
  },

  // ETFListLayout
  {
    path: '/investmentHome',
    element: <ETFListLayout />,
    children: [{ path: '', element: <InvestmentHome /> }], // 투자 내 페이지
  },

  // HomeLayout
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      { path: 'etf-category/:category', element: <ETFCategoryList /> }, // 투자 카테고리별 ETF 리스트 페이지
      { path: 'etf-buy/:symbol', element: <ETFBuy /> }, // ETF 구매 페이지
      { path: 'etf-sell/:symbol', element: <ETFSell /> }, // ETF 판매 페이지
    ],
  },

  { path: 'withdrawfinish', element: <WithDrawFinish /> }, // 출금 완료 페이지
  { path: '/donatesetfinish', element: <DonateSetFinish /> }, //기부 설정 완료 페이지
  { path: '/donatecomplete', element: <DonateComplete /> }, //기부 완료 페이지
  { path: '/pay', element: <Pay /> }, //결제 시작 페이지
  { path: '/paycomplete', element: <PayComplete /> }, //결제 완료 페이지
  { path: 'investCategory', element: <InvestCategory /> }, // 투자 카테고리 페이지
  { path: 'signin', element: <SignIn /> }, // 투자 카테고리 페이지
];

export default routes;
