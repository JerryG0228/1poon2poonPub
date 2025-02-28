import GlobalStyle from '@/styles/GlobalStyles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import DonateMainBefore from './pages/donate/DonateMainBefore';
import InvestMain from './pages/invest/InvestMain';
import DefaultLayout from './layout/DefaultLayout';
import PlusLayout from './layout/PlusLayout';
import DonateCategory from './pages/donate/DonateCategory';
import InvestMainBefore from './pages/invest/InvestMainBefore';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Main />} /> {/* 메인 페이지 */}
          <Route path="/donate" element={<DonateMainBefore />} /> {/* 기부 페이지 */}
          <Route path="/donateCategory" element={<DonateCategory />} />
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
