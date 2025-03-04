import GlobalStyle from '@/styles/GlobalStyles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import DonateMainBefore from './pages/donate/DonateMainBefore';
import DefaultLayout from './layout/DefaultLayout';
import PlusLayout from './layout/PlusLayout';
import InvestCategory from '@/pages/invest/Category'; // 투자 카테고리 선택
import ETFList from '@/pages/invest/ETFList'; // ETF 목록
import ETFDetail from '@/pages/invest/ETFDetail'; // ETF 상세 페이지
import ETFCategoryList from '@/pages/invest/ETFCategoryList';
import PointHistory from './pages/main/PointHistory';
import DonateCategory from './pages/donate/DonateCategory';
import DonateGoal from './pages/donate/DonateGoal';
import InvestMainBefore from './pages/invest/InvestMainBefore';
import DonateHome from './pages/donate/DonateHome';
import Invest from '@/pages/invest/InvestMainBefore';
import ETFBuy from '@/pages/invest/ETFBuy';
import ETFSell from '@/pages/invest/ETFSell';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Main />} /> {/* 메인 페이지 */}
          <Route path="/pointhistory" element={<PointHistory />} />
          <Route path="/donateBefore" element={<DonateMainBefore />} /> {/* 기부 초기 페이지 */}
          <Route path="/donateCategory" element={<DonateCategory />} /> {/* 기부 카테고리 페이지 */}
          <Route path="/donateGoal" element={<DonateGoal />} /> {/* 기부 목표 금액 설정 페이지 */}
          <Route path="/donateHome" element={<DonateHome />} /> {/* 기부 메인 페이지 */}
          <Route path="/investBefore" element={<InvestMainBefore />} /> {/* 투자 페이지 */}
        </Route>

        <Route element={<PlusLayout />}>
          <Route path="/InvestMainBefore" element={<Invest />} /> {/* 투자 시작 페이지 */}
          <Route path="/investCategory" element={<InvestCategory />} /> {/* 투자 카테고리 페이지 */}
          <Route path="/etf-list" element={<ETFList />} /> {/* ETF 목록 */}
          <Route path="/etf-category/:category" element={<ETFCategoryList />} />{' '}
          <Route path="/etf-detail/:symbol" element={<ETFDetail />} /> {/* ETF 상세 */}
          <Route path="/etf-buy/:symbol" element={<ETFBuy />} /> {/* ETF 구매 */}
          <Route path="/etf-sell/:symbol" element={<ETFSell />} /> {/* ETF 판매 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
