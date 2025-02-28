import GlobalStyle from '@/styles/GlobalStyles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import DonateMain from './pages/donate/DonateMain';
import InvestMain from './pages/invest/InvestMain';
import DefaultLayout from './layout/DefaultLayout';
import PlusLayout from './layout/PlusLayout';
import PointHistory from './pages/main/PointHistory';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Main />} /> {/* 메인 페이지 */}
          <Route path="/pointhistory" element={<PointHistory />} />
          <Route path="/donate" element={<DonateMain />} /> {/* 기부 페이지 */}
        </Route>

        <Route element={<PlusLayout />}>
          <Route path="/invest" element={<InvestMain />} /> {/* 투자 페이지 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
