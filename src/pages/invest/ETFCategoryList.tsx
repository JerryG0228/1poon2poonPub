import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ETFBox from '@/components/ETFBox';
import TopGainersChart from '@/components/TopGainersChart'; // ✅ 신규 차트 추가
import etfData from '@/data/etfData'; // ✅ etfData 가져오기

const Container = styled.div`
  padding: 1rem 0.7rem;
  min-height: 100vh;
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
  width: 100%; /* ✅ 선의 길이 조절 */
  height: 0.15rem;
  background-color: #555; /* ✅ 어두운 배경 선 */
  top: 50%;
  transform: translateY(-50%);

  &:nth-child(2) {
    width: 60%; /* ✅ 위에 덮을 선을 조금 짧게 설정 */
    height: 0.15rem;
    background-color: white; /* ✅ 밝은 색상으로 겹치게 */
  }
`;

function ETFCategoryList() {
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state?.category;

  const [etfs, setEtfs] = useState<string[]>([]);
  const [prices, setPrices] = useState<{ [key: string]: number }>({});
  const [previousCloseData, setPreviousCloseData] = useState<{ [key: string]: number }>({});
  const [topETFs, setTopETFs] = useState<{ name: string; price: number; changePercent: string }[]>(
    [],
  );

  useEffect(() => {
    if (!category) return;

    // ✅ `categoryMapping`을 적용하여 키 변환
    const categoryMapping: { [key: string]: string } = {
      '기술 & AI 관련': 'tech',
      '금융 & 경제 성장 관련': 'finance',
      '사회적 가치 & ESG 투자': 'esg',
      '헬스케어 & 바이오': 'healthcare',
      '리츠 & 인프라': 'reit',
      '소비 & 리테일': 'consumer',
    };

    const mappedCategory = categoryMapping[category];

    if (mappedCategory && etfData[mappedCategory]) {
      setEtfs(etfData[mappedCategory]); // ✅ 올바른 키로 ETF 데이터 설정
    } else {
      console.error(`❌ etfData에서 ${category} (${mappedCategory}) 데이터 없음`);
    }
  }, [category]);

  useEffect(() => {
    if (etfs.length === 0) return;

    async function fetchPrices() {
      const priceData: { [key: string]: number } = {};
      const previousClosePriceData: { [key: string]: number } = {};

      const requests = etfs.map(async (etf) => {
        try {
          const res = await axios.get(`http://localhost:5001/api/etf/${etf}`);

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

      // ✅ 상위 상승률 ETF 5개 선택 (이전 종가 포함)
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
        .slice(0, 5); // ✅ 상승률 상위 5개 ETF 선택

      setTopETFs(sortedETFs);
    }

    fetchPrices();
  }, [etfs]);

  return (
    <Container>
      {/* ✅ 헤더 */}

      {/* ✅ 상승률 높은 5개 ETF 차트 */}
      <ChartWrapper>
        <Header1>{category} 차트 상위 5개</Header1>
        {topETFs.length > 0 && <TopGainersChart topETFs={topETFs} />}
      </ChartWrapper>

      <Header2>{category} ETF</Header2>
      <DividerWrapper>
        <Divider />
        <Divider />
      </DividerWrapper>

      {/* ✅ ETF 리스트 */}
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
              isRecommend={true}
              onClick={() => navigate(`/etf-detail/${etf}`)}
            />
          );
        })}
      </ETFListContainer>
    </Container>
  );
}

export default ETFCategoryList;
