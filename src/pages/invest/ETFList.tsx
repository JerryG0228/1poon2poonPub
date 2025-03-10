import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import EtfCategoryBox from '@/components/invest/EtfCategoryBox';
import ETFBox from '@/components/invest/ETFBox';
import buildingImage from '@/assets/categorybox/building_image.png';
import computerImage from '@/assets/categorybox/computer_image.png';
import moneyImage from '@/assets/categorybox/money_image.png';
import shoppingImage from '@/assets/categorybox/shopping_image.png';
import earthImage from '@/assets/categorybox/earth_image.png';
import hospitalImage from '@/assets/categorybox/hospital_image.png';
import etfData from '@/data/etfData';
import baseAxios from '@/apis/axiosInstance';

const Container = styled.div`
  padding: 1rem;
  padding-bottom: 2rem;
  color: white;
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 1rem;
`;

const CategoryHeader = styled.div`
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const ETFSection = styled.div`
  margin-top: 10px;
`;

const ETFTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: bold;
  letter-spacing: 0.25rem;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 2rem;
  cursor: pointer;
  font-weight: bold;
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #4a4a4a;
  border: none;
  margin: 1rem 0;
`;

const categoryMapping: { [key: string]: string } = {
  '기술 & AI 관련': 'tech',
  '금융 & 경제 성장 관련': 'finance',
  '사회적 가치 & ESG 투자': 'esg',
  '헬스케어 & 바이오': 'healthcare',
  '리츠 & 인프라': 'reit',
  '소비 & 리테일': 'consumer',
};

const categoryImages: { [key: string]: string } = {
  '기술 & AI 관련': computerImage,
  '금융 & 경제 성장 관련': moneyImage,
  '사회적 가치 & ESG 투자': earthImage,
  '헬스케어 & 바이오': hospitalImage,
  '리츠 & 인프라': buildingImage,
  '소비 & 리테일': shoppingImage,
};

function ETFList() {
  const navigate = useNavigate();
  const location = useLocation();
  const storedCategories = JSON.parse(localStorage.getItem('selectedCategories') || '[]');

  const selectedCategories: string[] = location.state?.selectedCategories ?? storedCategories;
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [prices, setPrices] = useState<{ [key: string]: number }>({});
  const [previousCloseData, setPreviousCloseData] = useState<{ [key: string]: number }>({});
  const [randomETFs, setRandomETFs] = useState<{ [key: string]: any[] }>({});

  useEffect(() => {
    if (Object.keys(randomETFs).length > 0) return;

    console.log('etfData 확인:', etfData);
    console.log('선택된 카테고리:', selectedCategories);

    if (selectedCategories.length > 0) {
      localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
    }

    const selectedETFData: { [key: string]: any[] } = {};

    selectedCategories.forEach((category) => {
      const englishCategory = categoryMapping[category] || category;
      console.log('📢 변환된 category:', englishCategory, etfData[englishCategory]);

      const etfs = etfData[englishCategory] ?? [];

      if (etfs.length > 0) {
        selectedETFData[category] = [...etfs].sort(() => 0.5 - Math.random()).slice(0, 3);
      } else {
        selectedETFData[category] = [];
        console.error(`ETF 데이터 없음: ${category} (${englishCategory})`);
      }
    });

    console.log('랜덤 ETF 선택됨:', selectedETFData);
    setRandomETFs(selectedETFData);
  }, [selectedCategories]);

  useEffect(() => {
    if (Object.keys(randomETFs).length === 0) return;

    async function fetchPrices() {
      const priceData: { [key: string]: number } = {};
      const previousCloseData: { [key: string]: number } = {};

      console.log('가격 데이터 가져오는 중...');

      const requests = Object.values(randomETFs)
        .flat()
        .map(async (etf) => {
          try {
            const res = await baseAxios.get(`/invest/getData/${etf}`);
            console.log(`API 응답 (${etf}):`, res.data);

            const marketPrice = res.data?.chart?.result?.[0]?.meta?.regularMarketPrice ?? 0;
            const previousClose = res.data?.chart?.result?.[0]?.meta?.chartPreviousClose ?? 0;

            priceData[etf] = marketPrice;
            previousCloseData[etf] = previousClose;
          } catch (error) {
            console.error(`가격 가져오기 실패 (${etf}):`, error);
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
      <ETFTitle>관심 ETF 카테고리</ETFTitle>
      <CategoryList>
        {selectedCategories.map((category) => (
          <EtfCategoryBox
            key={category}
            title={category}
            imageSrc={categoryImages[category]}
            active={true}
            onClick={() => console.log(`${category} 클릭됨`)}
          />
        ))}
      </CategoryList>

      <Divider />

      <ETFTitle>추천 ETF</ETFTitle>
      {selectedCategories.map((category) => (
        <ETFSection key={category}>
          <CategoryHeader>
            <EtfCategoryBox
              title={category}
              imageSrc={categoryImages[category]}
              active={true}
              onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
            />
            <MoreButton onClick={() => navigate(`/etf-category/${categoryMapping[category]}`)}>
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
                onClick={() => navigate(`/etf-detail/${etf}`)}
              />
            );
          })}
        </ETFSection>
      ))}
    </Container>
  );
}

export default ETFList;
