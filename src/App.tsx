import GlobalStyle from '@/styles/GlobalStyles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import DonateMainBefore from './pages/donate/DonateMainBefore';
import InvestMain from './pages/invest/InvestMain';
import DefaultLayout from './layout/DefaultLayout';
import PlusLayout from './layout/PlusLayout';
import PointHistory from './pages/main/PointHistory';
import DonateCategory from './pages/donate/DonateCategory';
import DonateGoal from './pages/donate/DonateGoal';
import InvestMainBefore from './pages/invest/InvestMainBefore';
import DonateHome from './pages/donate/DonateHome';

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
          <Route path="/invest" element={<InvestMain />} /> {/* 투자 페이지 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
