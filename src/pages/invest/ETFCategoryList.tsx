import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ETFBox from '@/components/invest/ETFBox';
import TopGainersChart from '@/components/invest/TopGainersChart'; // ✅ 신규 차트 추가
import etfData from '@/data/etfData'; // ✅ etfData 가져오기

const Container = styled.div`
  padding-bottom: 2rem;
`;

const Header1 = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  letter-spacing: 0.25rem;
`;

const Header2 = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  letter-spacing: 0.25rem;
  margin-top: 1.3rem;
  margin-bottom: 0.3rem;
`;

const ChartWrapper = styled.div`
  padding: 1rem;
  padding-bottom: 0.2rem;
  background-color: #313845;
  border-radius: 0.5rem;
`;

const ETFListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DividerWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  margin-bottom: 1rem;
`;

const Divider = styled.div`
  position: absolute;
  width: 100%;
  height: 0.15rem;
  background-color: #555;
  top: 50%;
  transform: translateY(-50%);

  &:nth-child(2) {
    width: 60%;
    height: 0.15rem;
    background-color: white;
  }
`;

function ETFCategoryList() {
  const { category } = useParams(); // ✅ URL 파라미터에서 category 가져오기
  const navigate = useNavigate();

  const [etfs, setEtfs] = useState<string[]>([]);
  const [prices, setPrices] = useState<{ [key: string]: number }>({});
  const [previousCloseData, setPreviousCloseData] = useState<{ [key: string]: number }>({});
  const [topETFs, setTopETFs] = useState<{ name: string; price: number; changePercent: string }[]>(
    [],
  );

  // ✅ 카테고리 매핑
  const categoryMapping: { [key: string]: string } = {
    tech: '기술 & AI 관련',
    finance: '금융 & 경제 성장 관련',
    esg: '사회적 가치 & ESG 투자',
    healthcare: '헬스케어 & 바이오',
    reit: '리츠 & 인프라',
    consumer: '소비 & 리테일',
  };

  useEffect(() => {
    if (!category) {
      console.error('❌ category 값이 없음');
      return;
    }

    const mappedCategory = categoryMapping[category];

    if (!mappedCategory || !etfData[category]) {
      console.error(`❌ etfData에서 ${category} (${mappedCategory}) 데이터 없음`);
      return;
    }

    setEtfs(etfData[category]);
  }, [category]);

  useEffect(() => {
    if (etfs.length === 0) return;

    async function fetchPrices() {
      const priceData: { [key: string]: number } = {};
      const previousClosePriceData: { [key: string]: number } = {};

      const requests = etfs.map(async (etf) => {
        try {
          const res = await axios.get(`http://localhost:3000/invest/getData/${etf}`);

          // ✅ API에서 현재가와 전일 종가 가져오기
          const marketPrice = res.data?.chart?.result?.[0]?.meta?.regularMarketPrice ?? 0;
          const previousClose = res.data?.chart?.result?.[0]?.meta?.chartPreviousClose ?? 0;

          priceData[etf] = marketPrice;
          previousClosePriceData[etf] = previousClose;
        } catch (error) {
          console.error(`❌ ${etf} 데이터 불러오기 실패:`, error);
          priceData[etf] = 0;
          previousClosePriceData[etf] = 0;
        }
      });

      await Promise.all(requests);

      setPrices(priceData);
      setPreviousCloseData(previousClosePriceData);

      // ✅ 상위 상승률 ETF 5개 선택
      const sortedETFs = etfs
        .map((etf) => {
          const price = priceData[etf] ?? 0;
          const previousClose = previousClosePriceData[etf] ?? 0;
          const transPrice = price - previousClose;
          const changePercent =
            previousClose !== 0 ? ((transPrice / previousClose) * 100).toFixed(2) : '0.00';

          return { name: etf, price, previousClose, transPrice, changePercent };
        })
        .sort((a, b) => parseFloat(b.changePercent) - parseFloat(a.changePercent))
        .slice(0, 5);

      setTopETFs(sortedETFs);
    }

    fetchPrices();
  }, [etfs]);

  return (
    <Container>
      <ChartWrapper>
        <Header1>{categoryMapping[category] || 'ETF'} 차트 상위 5개</Header1>
        {topETFs.length > 0 && <TopGainersChart topETFs={topETFs} />}
      </ChartWrapper>

      <Header2>{categoryMapping[category] || 'ETF'} ETF</Header2>
      <DividerWrapper>
        <Divider />
        <Divider />
      </DividerWrapper>

      <ETFListContainer>
        {etfs.map((etf) => {
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
              isRecommend={false}
              onClick={() => navigate(`/etf-detail/${etf}`)}
            />
          );
        })}
      </ETFListContainer>
    </Container>
  );
}

export default ETFCategoryList;
