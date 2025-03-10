import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useStore from '@/store/User';
import TopGainersChart from '@/components/invest/TopGainersChart';
import ETFBox from '@/components/invest/ETFBox';
import ETFQuantityBox from '@/components/invest/ETFQuantityBox';

const Container = styled.div`
  color: white;
  padding: 1rem;
`;

const Title = styled.h2`
  font-size: 1.1rem;
  font-weight: bold;
  letter-spacing: 0.25rem;
`;

const ChartWrapper = styled.div`
  padding: 1rem;
  background-color: #313845;
  border-radius: 0.5rem;
  margin-top: 1rem;
`;

const TabContainer = styled.div`
  display: flex;
  margin-top: 1.5rem;
  border-bottom: 1px solid #444;
`;

const Tab = styled.div<{ $isActive: boolean }>`
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.25rem;
  cursor: pointer;
  border-bottom: ${({ $isActive }) => ($isActive ? '3px solid white' : 'none')};
  color: ${({ $isActive }) => ($isActive ? 'white' : '#888')};
`;

const StockList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 0.5rem;
`;

const EmptyStateBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  border-radius: 0.5rem;
`;

const BuyButton = styled.button`
  background-color: #0064ff;
  color: white;
  font-size: 1rem;
  padding: 0.7rem 1.2rem;
  border-radius: 0.5rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  width: 100%;
`;

const InvestmentHome = () => {
  const navigate = useNavigate();
  const { username, interestsStock, setInterestsStock, ownedStocks, setOwnedStocks } = useStore();

  const [activeTab, setActiveTab] = useState<'내 ETF' | '관심 ETF'>('내 ETF');
  const [stocks, setStocks] = useState<
    { name: string; price: number; transPrice: number; changePercent: string; quantity: number }[]
  >([]);
  const [topETFs, setTopETFs] = useState<any[]>([]);

  // ✅ 페이지 진입 시 관심 ETF 가져오기
  useEffect(() => {
    async function fetchInterestETFs() {
      try {
        const res = await axios.get(`http://localhost:3000/invest/getInterestEtf/${username}`);
        setInterestsStock(res.data); // zustand에 관심 ETF 저장
      } catch (error) {
        console.error('❌ 관심 ETF 불러오기 실패:', error);
      }
    }

    if (username) {
      fetchInterestETFs();
    }
  }, [username]);

  useEffect(() => {
    async function fetchOwnedETFs() {
      try {
        const res = await axios.get(`http://localhost:3000/invest/getUser/${username}`);
        if (res.data.ownedETFs) {
          setOwnedStocks(res.data.ownedETFs); // 🟢 zustand에 보유 ETF 저장
        }
      } catch (error) {
        console.error('❌ 보유 ETF 불러오기 실패:', error);
      }
    }

    if (username) {
      fetchOwnedETFs();
    }
  }, [username]);

  // ✅ 보유 ETF + 관심 ETF 병합 후 데이터 요청
  useEffect(() => {
    const interestOnly = interestsStock.filter(
      (interest) => !ownedStocks.some((own) => own.name === interest.name),
    );

    const allList = [
      ...ownedStocks.map((own) => ({ name: own.name, quantity: own.quantity })),
      ...interestOnly.map((it) => ({ name: it.name, quantity: 0 })),
    ];

    if (allList.length > 0) {
      fetchStockData(allList);
    } else {
      setStocks([]);
    }
  }, [ownedStocks, interestsStock]);

  // ✅ 종목별 API 호출
  const fetchStockData = async (stockList: { name: string; quantity: number }[]) => {
    try {
      const validResponses = [];

      for (const stock of stockList) {
        try {
          const res = await axios.get(`http://localhost:3000/invest/getData/${stock.name}`);
          const meta = res.data?.chart?.result?.[0]?.meta;
          const price = meta?.regularMarketPrice ?? 0;
          const prevClose = meta?.chartPreviousClose ?? price;
          const transPrice = price - prevClose;
          const changePercent =
            prevClose !== 0 ? ((transPrice / prevClose) * 100).toFixed(2) : '0.00';

          validResponses.push({
            name: stock.name,
            price,
            transPrice,
            changePercent,
            quantity: stock.quantity,
          });
        } catch (err) {
          console.warn(`❗️ ${stock.name} 종목 데이터를 불러올 수 없습니다. 건너뜁니다.`);
        }
      }

      const sorted = validResponses
        .slice()
        .sort((a, b) => parseFloat(b.changePercent) - parseFloat(a.changePercent))
        .slice(0, 5);

      setStocks(validResponses);
      setTopETFs(sorted);
    } catch (error) {
      console.error('❌ 주식 데이터 전체 요청 실패:', error);
    }
  };

  return (
    <Container>
      {stocks.length > 0 ? (
        <ChartWrapper>
          <Title>내 ETF 차트</Title>
          <TopGainersChart topETFs={topETFs} />
        </ChartWrapper>
      ) : (
        <ChartWrapper>
          <Title>내 ETF 차트</Title>
          <EmptyStateBox>
            <BuyButton onClick={() => navigate('/etf-list')}>내 첫 주식을 가져볼까요?</BuyButton>
          </EmptyStateBox>
        </ChartWrapper>
      )}

      {/* ✅ 탭 UI */}
      <TabContainer>
        <Tab $isActive={activeTab === '내 ETF'} onClick={() => setActiveTab('내 ETF')}>
          내 ETF
        </Tab>
        <Tab $isActive={activeTab === '관심 ETF'} onClick={() => setActiveTab('관심 ETF')}>
          관심 ETF
        </Tab>
      </TabContainer>

      {/* ✅ 선택한 탭에 따라 다른 리스트 표시 */}
      {activeTab === '내 ETF' ? (
        stocks.length > 0 ? (
          <StockList>
            {stocks
              .filter((stock) => stock.quantity > 0) // ✅ 보유 수량이 1주 이상인 주식만 표시
              .map((stock, index) => (
                <ETFQuantityBox
                  key={index}
                  name={stock.name}
                  price={stock.price}
                  transPrice={stock.transPrice}
                  changePercent={stock.changePercent}
                  quantity={stock.quantity}
                  isRecommend={false}
                  isImageVisible={true}
                  onClick={() => navigate(`/etf-detail/${stock.name}`)}
                />
              ))}
          </StockList>
        ) : (
          <></>
        )
      ) : interestsStock.length > 0 ? (
        <StockList>
          {interestsStock.map((etf, index) => {
            const ownedStock = stocks.find((stock) => stock.name === etf.name);
            return (
              <ETFBox
                key={index}
                name={etf.name}
                price={ownedStock ? ownedStock.price : etf.price}
                transPrice={ownedStock ? ownedStock.transPrice : 0}
                changePercent={ownedStock ? ownedStock.changePercent : etf.changeRate.toFixed(2)}
                isRecommend={false}
                isImageVisible={true}
                onClick={() => navigate(`/etf-detail/${etf.name}`)}
              />
            );
          })}
        </StockList>
      ) : (
        <EmptyStateBox>
          <p style={{ color: 'white' }}>관심 ETF를 추가해보세요!</p>
        </EmptyStateBox>
      )}
    </Container>
  );
};

export default InvestmentHome;
