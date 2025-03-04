import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ETFBox from '@/components/ETFBox';
import CategoryBox from '@/components/CategoryBox';
import etfData from '@/data/etfData';

const Container = styled.div`
  padding: 0 0.7rem;
  min-height: 100vh;
  max-height: 100vh; /* ✅ 화면 높이를 벗어나면 스크롤 가능 */
  overflow-y: auto; /* ✅ 세로 스크롤 활성화 */
  color: white;
`;

const Section = styled.div``;
const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 1rem;
`;

const CategoryHeader = styled.div<{ $active: boolean }>`
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 0;
  display: flex;
  align-items: center;
  opacity: ${({ $active }) => ($active ? 1 : 0.6)}; /* 활성 상태 시 불투명도 조정 */
  cursor: pointer;
`;

const ETFSection = styled.div`
  margin-top: 10px;
`;

const ETFTitle1 = styled.h2`
  font-size: 1.1rem;
  font-weight: bold;
  letter-spacing: 0.25rem;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 5px;
  font-weight: bold;
`;

const categoryMapping: { [key: string]: string } = {
  '기술 & AI 관련': 'tech',
  '금융 & 경제 성장 관련': 'finance',
  '사회적 가치 & ESG 투자': 'esg',
  '헬스케어 & 바이오': 'healthcare',
  '리츠 & 인프라': 'reit',
  '소비 & 리테일': 'consumer',
};

function ETFList() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCategories: string[] = location.state?.selectedCategories ?? [];
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [prices, setPrices] = useState<{ [key: string]: number }>({});
  const [previousCloseData, setPreviousCloseData] = useState<{ [key: string]: number }>({});
  const [randomETFs, setRandomETFs] = useState<{ [key: string]: any[] }>({});

  useEffect(() => {
    console.log('📢 etfData 확인:', etfData);
    console.log('📢 선택된 카테고리:', selectedCategories);

    const selectedETFData: { [key: string]: any[] } = {};

    selectedCategories.forEach((category) => {
      const englishCategory = categoryMapping[category] || category;
      console.log('📢 변환된 category:', englishCategory, etfData[englishCategory]);

      const etfs = etfData[englishCategory] ?? [];

      if (etfs && etfs.length > 0) {
        selectedETFData[category] = [...etfs].sort(() => 0.5 - Math.random()).slice(0, 3);
      } else {
        selectedETFData[category] = [];
        console.error(`🚨 ETF 데이터 없음: ${category} (${englishCategory})`);
      }
    });

    console.log('✅ 랜덤 ETF 선택됨:', selectedETFData);
    setRandomETFs(selectedETFData);
  }, [selectedCategories]);

  useEffect(() => {
    if (Object.keys(randomETFs).length === 0) return;

    async function fetchPrices() {
      const priceData: { [key: string]: number } = {};
      const previousCloseData: { [key: string]: number } = {};

      console.log('📢 가격 데이터 가져오는 중...');

      const requests = Object.values(randomETFs)
        .flat()
        .map(async (etf) => {
          try {
            const res = await axios.get(`http://localhost:5001/api/etf/${etf}`);
            console.log(`✅ API 응답 (${etf}):`, res.data);

            const marketPrice = res.data?.chart?.result?.[0]?.meta?.regularMarketPrice ?? 0;
            const previousClose = res.data?.chart?.result?.[0]?.meta?.chartPreviousClose ?? 0;

            priceData[etf] = marketPrice;
            previousCloseData[etf] = previousClose;
          } catch (error) {
            console.error(`❌ 가격 가져오기 실패 (${etf}):`, error);
            priceData[etf] = 0;
            previousCloseData[etf] = 0;
          }
        });

      await Promise.all(requests);
      console.log('📢 ETF 가격 데이터 업데이트:', priceData);
      console.log('📢 ETF 전일 종가 데이터 업데이트:', previousCloseData);

      setPrices(priceData);
      setPreviousCloseData(previousCloseData);
    }

    fetchPrices();
  }, [randomETFs]);

  return (
    <Container>
      <Section>
        <ETFTitle1>관심 ETF 카테고리</ETFTitle1>
        <CategoryList>
          {selectedCategories.map((category) => (
            <CategoryBox
              key={category}
              title={category}
              active={true} // ✅ 선택된 카테고리는 항상 활성화된 상태
              onClick={() => console.log(`${category} 클릭됨`)}
            />
          ))}
        </CategoryList>
      </Section>

      <Section>
        <h2>추천 ETF</h2>
        {selectedCategories.map((category) => (
          <ETFSection key={category}>
            <CategoryHeader>
              <CategoryBox
                title={category}
                active={true} // ✅ 선택된 카테고리는 항상 활성화된 상태
                onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
              />
              {/* ✅ 올바른 이미지 사용 */}

              <MoreButton
                onClick={() =>
                  navigate(`/etf-category/${categoryMapping[category]}`, { state: { category } })
                }
              >
                {'+'}
              </MoreButton>
            </CategoryHeader>

            {(expandedCategory === category
              ? etfData[categoryMapping[category]]
              : randomETFs[category]
            )?.map((etf) => {
              const currentPrice = prices[etf] ?? 0;
              const previousClose = previousCloseData[etf] ?? 0;
              const priceChange = currentPrice - previousClose;
              const changePercent =
                previousClose !== 0 ? ((priceChange / previousClose) * 100).toFixed(1) : '0.0';

              return (
                <ETFBox
                  key={etf}
                  name={etf}
                  price={currentPrice}
                  transPrice={priceChange}
                  changePercent={changePercent}
                  isRecommend={true}
                  onClick={() => navigate(`/etf-detail/${etf}`)} // ✅ 클릭 시 이동
                />
              );
            })}
          </ETFSection>
        ))}
      </Section>
    </Container>
  );
}

export default ETFList;
