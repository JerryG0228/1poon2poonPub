import { Routes, Route } from 'react-router-dom';
import Category from '@/pages/invest/Category';
import ETFList from '@/pages/invest/ETFList';
import ETFDetail from '@/pages/invest/ETFDetail';

export default function DonateMain() {
  return (
    <Routes>
      <Route path="/" element={<Category />} />
      <Route path="/etf-list/:category" element={<ETFList />} />
      <Route path="/etf-detail/:symbol" element={<ETFDetail />} />
      <Route path="/donate/*" element={<DonateMain />} /> {/* ✅ `*` 추가 */}
    </Routes>
  );
}
