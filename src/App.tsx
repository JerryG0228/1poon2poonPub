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
import InvestmentHome from '@/pages/invest/InvestmentHome';
import HomeLayout from './layout/HomeLayout';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Main />} /> {/* 메인 페이지 */}
          <Route path="/pointhistory" element={<PointHistory />} />
          <Route path="/donatebefore" element={<DonateMainBefore />} /> {/* 기부 초기 페이지 */}
          <Route path="/donatecategory" element={<DonateCategory />} /> {/* 기부 카테고리 페이지 */}
          <Route path="/donategoal" element={<DonateGoal />} /> {/* 기부 목표 금액 설정 페이지 */}
          <Route path="/donatehome" element={<DonateHome />} /> {/* 기부 메인 페이지 */}
          <Route path="/investbefore" element={<InvestMainBefore />} /> {/* 투자 페이지 */}
          <Route path="/etf-detail/:symbol" element={<ETFDetail />} /> {/* ETF 상세 페이지 */}
          <Route path="/InvestMainBefore" element={<Invest />} /> {/* 투자 시작 페이지 */}
          <Route path="/investCategory" element={<InvestCategory />} /> {/* 투자 카테고리 페이지 */}
        </Route>

        <Route element={<PlusLayout />}>
          <Route path="/InvestmentHome" element={<InvestmentHome />} /> {/* 내 페이지 */}
        </Route>

        <Route element={<HomeLayout />}>
          <Route path="/etf-list" element={<ETFList />} /> {/* 내가 선택한 ETF 목록 */}
          <Route path="/etf-category/:category" element={<ETFCategoryList />} />{' '}
          {/* 투자 카테고리별 ETF 리스트 페이지 */}
          <Route path="/etf-buy/:symbol" element={<ETFBuy />} /> {/* ETF 구매 페이지 */}
          <Route path="/etf-sell/:symbol" element={<ETFSell />} /> {/* ETF 판매 페이지 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
