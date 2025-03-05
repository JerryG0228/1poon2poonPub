import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TopGainersChart from '@/components/TopGainersChart';
import ETFBox from '@/components/ETFBox';
import ETFQuantityBox from '@/components/ETFQuantityBox';

const Container = styled.div`
  color: white;
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
  /* margin-top: 1rem; */
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
  const [activeTab, setActiveTab] = useState<'내 ETF' | '관심 ETF'>('내 ETF');
  const [stocks, setStocks] = useState<
    { name: string; price: number; transPrice: number; changePercent: string; quantity: number }[]
  >([]);
  const [topETFs, setTopETFs] = useState<
    { name: string; price: number; transPrice: number; changePercent: string }[]
  >([]);
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('favoriteETFs') || '[]'); // ✅ 수정된 부분
  });

  // ✅ 관심 ETF 추가/제거
  const toggleFavorite = (etfName: string) => {
    setWatchlist((prevWatchlist) => {
      const updatedWatchlist = prevWatchlist.includes(etfName)
        ? prevWatchlist.filter((name) => name !== etfName)
        : [...prevWatchlist, etfName];

      localStorage.setItem('favoriteETFs', JSON.stringify(updatedWatchlist));

      console.log('✅ 관심 ETF 업데이트됨:', updatedWatchlist); // 🚀 콘솔로 확인!
      return updatedWatchlist;
    });
  };

  useEffect(() => {
    console.log('📌 관심 ETF 업데이트됨:', watchlist);
    localStorage.setItem('favoriteETFs', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    const savedStocks = JSON.parse(localStorage.getItem('myStocks') || '[]');
    const savedWatchlist = JSON.parse(localStorage.getItem('favoriteETFs') || '[]'); // ✅ 수정된 부분

    if (savedStocks.length > 0) {
      fetchStockData(savedStocks);
    } else {
      setStocks([]);
    }

    setWatchlist(savedWatchlist); // ✅ 수정된 부분
  }, []);

  useEffect(() => {
    const savedStocks = JSON.parse(localStorage.getItem('myStocks') || '[]');
    const savedWatchlist = JSON.parse(localStorage.getItem('favoriteETFs') || '[]');

    setWatchlist(savedWatchlist);

    // ✅ 관심 ETF에만 있는 종목 찾기
    const watchlistOnly = savedWatchlist.filter(
      (etf) => !savedStocks.some((stock: any) => stock.name === etf),
    );

    const allETFs = [
      ...savedStocks.map((s: any) => ({ name: s.name, quantity: s.quantity })),
      ...watchlistOnly.map((name) => ({ name, quantity: 0 })),
    ];

    if (allETFs.length > 0) {
      fetchStockData(allETFs);
    } else {
      setStocks([]);
    }
  }, []);

  /** ✅ 실제 주식 데이터를 가져와 차트와 리스트에 반영하는 함수 */
  const fetchStockData = async (stockList: { name: string; quantity: number }[]) => {
    try {
      const responses = await Promise.all(
        stockList.map(async (stock) => {
          const res = await axios.get(`http://localhost:5001/api/etf/${stock.name}`);

          const price = res.data?.chart?.result?.[0]?.meta?.regularMarketPrice ?? 0;
          const previousClose = res.data?.chart?.result?.[0]?.meta?.chartPreviousClose ?? price;

          // ✅ 변동 가격(transPrice) & 변동률 계산
          const transPrice = price - previousClose;
          const changePercent =
            previousClose !== 0 ? ((transPrice / previousClose) * 100).toFixed(2) : '0.00';

          return {
            name: stock.name,
            price,
            transPrice,
            changePercent,
            quantity: stock.quantity,
          };
        }),
      );

      // ✅ 변동률 기준 정렬 후 상위 5개 선택
      const sortedETFs = responses
        .sort((a, b) => parseFloat(b.changePercent) - parseFloat(a.changePercent))
        .slice(0, 5);

      setStocks(responses);
      setTopETFs(sortedETFs);
    } catch (error) {
      console.error('❌ 주식 데이터 불러오기 실패:', error);
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
        // ✅ `:`를 `?`와 함께 사용해야 함
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
      ) : watchlist.length > 0 ? (
        <StockList>
          {watchlist.map((etf, index) => {
            const ownedStock = stocks.find((stock) => stock.name === etf);
            return (
              <ETFBox
                key={index}
                name={etf}
                price={ownedStock ? ownedStock.price : 0}
                transPrice={ownedStock ? ownedStock.transPrice : 0}
                changePercent={ownedStock ? ownedStock.changePercent : '0.00'}
                isRecommend={false}
                isImageVisible={true}
                onClick={() => navigate(`/etf-detail/${etf}`)}
                onFavoriteToggle={toggleFavorite} // ✅ 여기 추가
                isFavorite={watchlist.includes(etf)} // ✅ 관심 ETF 여부 전달
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
