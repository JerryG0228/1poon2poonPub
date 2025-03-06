import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CandlestickChart from '@/components/CandlestickChart';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa'; // ✅ 하트 아이콘 추가

const Container = styled.div`
  /* margin-left: 0.5rem; */
  color: white;
`;

const EtfTile = styled.h2`
  font-size: 1.1rem;
  font-weight: bold;
`;

const CurPrice = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
`;

const ChangeBox = styled.div`
  display: flex;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
  margin-top: 0.1rem;
`;

const ChangeBoxTitle1 = styled.p`
  margin-right: 1.2rem;
  font-weight: bold;
  color: #bbbbbb;
`;

const ChangeBoxTitle2 = styled.p`
  margin-right: 0.1rem;
  font-weight: bold;
`;

const ChangeBoxTitle3 = styled.p`
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2.5rem;
  justify-content: center;
`;

const Button = styled.button<{ $active: boolean }>`
  color: ${({ $active }) => ($active ? 'white' : '#8f9298')};
`;
const OrderBookContainer = styled.div`
  margin-top: 1rem;
  border-radius: 8px;
`;

const OrderBookTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.5rem;
`;

const OrderBookBar = styled.div`
  display: flex;
  align-items: center;
  height: 6px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const SellVolume = styled.div<{ width: number }>`
  width: ${({ width }) => width}%;
  height: 100%;
  background: #3b82f6;
`;

const BuyVolume = styled.div<{ width: number }>`
  width: ${({ width }) => width}%;
  height: 100%;
  background: #dc2626;
`;

const Marker = styled.div`
  position: absolute;
  left: 32%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 7px solid white;
`;

const GaugeContainer = styled.div`
  margin-top: 1rem;
`;

const GaugeLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #d9d9d9;
`;

const GaugeBar = styled.div`
  position: relative;
  height: 6px;
  background: #333;
  border-radius: 3px;
  overflow: hidden;
`;

const GaugeFill = styled.div<{ width: number; color: string }>`
  width: ${({ width }) => width}%;
  height: 100%;
  background: ${({ color }) => color};
`;

const CurrentPriceMarker = styled.div<{ position: number }>`
  position: absolute;
  left: ${({ position }) => position}%;
  /* top: -4px; */
  width: 0.4rem;
  height: 0.4rem;
  background: lime;
  border-radius: 50%;
  transform: translateX(-50%);
`;
const GaugeTile = styled.div`
  display: flex;
  flex-direction: column;
`;

const GaugeTitle = styled.p`
  margin-top: 0.8rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center; /* ✅ 버튼을 중앙 정렬 */
  gap: 1rem; /* ✅ 버튼 사이 간격 */
  margin-top: 2.5rem;
`;

const LargeBtn1 = styled.button`
  width: 11rem; /* ✅ 버튼 너비 */
  height: 4rem; /* ✅ 버튼 높이 */
  font-size: 1.2rem; /* ✅ 글자 크기 */
  border-radius: 1.3rem; /* ✅ 버튼 둥글게 */
  background-color: #ef4452;
`;
const LargeBtn2 = styled.button`
  width: 11rem; /* ✅ 버튼 너비 */
  height: 4rem; /* ✅ 버튼 높이 */
  font-size: 1.2rem; /* ✅ 글자 크기 */
  border-radius: 1.3rem; /* ✅ 버튼 둥글게 */
  background-color: #0064ff;
`;
/* ✅ 하트(즐겨찾기) 버튼 스타일 추가 */
const FavoriteButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1.2rem;
`;

function ETFDetail() {
  const navigate = useNavigate();
  const { symbol } = useParams<{ symbol: string }>();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');
  const [buyVolume, setBuyVolume] = useState(7500);
  const [sellVolume, setSellVolume] = useState(3500);
  const [timeRange, setTimeRange] = useState<'1d' | '1w' | '1mo' | '1y'>('1d');

  // ✅ 관심 ETF 상태 추가
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      if (!symbol) return;

      try {
        const res = await axios.get(`http://localhost:5001/api/etf/${symbol}`);
        console.log('📢 ETF API 응답:', res.data);
        setData(res.data);
      } catch (err) {
        console.error('❌ 데이터 불러오기 실패:', err);
        setError('데이터 불러오기 실패');
      }
    }
    fetchData();
  }, [symbol]);

  // ✅ 관심 ETF 목록 불러오기
  useEffect(() => {
    const favoriteETFs = JSON.parse(localStorage.getItem('favoriteETFs') || '[]');
    setIsFavorite(favoriteETFs.includes(symbol));
  }, [symbol]);

  // ✅ 관심 ETF 토글 함수
  const toggleFavorite = () => {
    const favoriteETFs = JSON.parse(localStorage.getItem('favoriteETFs') || '[]');

    let updatedFavorites;
    if (favoriteETFs.includes(symbol)) {
      updatedFavorites = favoriteETFs.filter((item: string) => item !== symbol);
    } else {
      updatedFavorites = [...favoriteETFs, symbol];
    }

    localStorage.setItem('favoriteETFs', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  if (error)
    return (
      <Container>
        <h2>{symbol} 상세 정보</h2>
        <p>{error}</p>
      </Container>
    );

  // ✅ 현재가, 최고가, 최저가, 변동률 가져오기
  const meta = data?.chart?.result?.[0]?.meta;
  const currentPrice = meta?.regularMarketPrice ?? 0;
  const todayHigh = meta?.regularMarketDayHigh ?? 0;
  const todayLow = meta?.regularMarketDayLow ?? 0;
  const yearHigh = meta?.fiftyTwoWeekHigh ?? 0;
  const yearLow = meta?.fiftyTwoWeekLow ?? 0;
  const previousClose = meta?.chartPreviousClose ?? null;

  // ✅ 변동률(%) 계산
  const changePercent =
    previousClose && previousClose !== 0
      ? ((currentPrice - previousClose) / previousClose) * 100
      : null;

  const changePercentColor =
    changePercent !== null ? (changePercent > 0 ? 'red' : 'blue') : 'white';

  const priceChange = Math.floor(currentPrice - previousClose);
  const changeColor = priceChange > 0 ? 'red' : priceChange < 0 ? 'blue' : 'white';
  const formattedPriceChange =
    priceChange !== 0 ? `${priceChange > 0 ? '+' : ''}${priceChange}` : '0';

  // ✅ 게이지 바 위치 계산 함수
  const calculatePosition = (value: number, min: number, max: number) =>
    max !== min ? ((value - min) / (max - min)) * 100 : 50;
  return (
    <Container>
      <FavoriteButton onClick={toggleFavorite}>
        <FaHeart color={isFavorite ? '#FF0000' : '#CCCCCC'} /> {/* ❤️ 빨강 / 🤍 회색 */}
      </FavoriteButton>

      <EtfTile>{symbol} ETF</EtfTile>
      <CurPrice>{currentPrice} USD</CurPrice>
      <ChangeBox>
        <ChangeBoxTitle1>어제보다</ChangeBoxTitle1>
        <ChangeBoxTitle2 style={{ color: changeColor }}>{formattedPriceChange}</ChangeBoxTitle2>
        <ChangeBoxTitle3 style={{ color: changePercentColor }}>
          ({changePercent !== null ? `${changePercent.toFixed(2)}%` : '데이터 없음'})
        </ChangeBoxTitle3>
      </ChangeBox>

      {symbol && <CandlestickChart symbol={symbol} timeRange={timeRange} />}

      <ButtonContainer>
        <Button $active={timeRange === '1d'} onClick={() => setTimeRange('1d')}>
          일
        </Button>
        <Button $active={timeRange === '1w'} onClick={() => setTimeRange('1w')}>
          주
        </Button>
        <Button $active={timeRange === '1mo'} onClick={() => setTimeRange('1mo')}>
          월
        </Button>
        <Button $active={timeRange === '1y'} onClick={() => setTimeRange('1y')}>
          년
        </Button>
        <Button $active={timeRange === '1y'} onClick={() => setTimeRange('1y')}>
          📊
        </Button>
      </ButtonContainer>

      <OrderBookContainer>
        <OrderBookTitle>호가</OrderBookTitle>
        <OrderBookBar>
          <SellVolume
            width={sellVolume + buyVolume > 0 ? (sellVolume / (sellVolume + buyVolume)) * 100 : 50}
          />
          <Marker />
          <BuyVolume
            width={sellVolume + buyVolume > 0 ? (buyVolume / (sellVolume + buyVolume)) * 100 : 50}
          />
        </OrderBookBar>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '0.5rem',
            fontSize: '0.9rem',
            color: '#d9d9d9',
          }}
        >
          <div>
            <span>판매대기</span>
            <br />
            <strong>{sellVolume.toLocaleString()}주</strong>
          </div>
          <div>
            <span>구매대기</span>
            <br />
            <strong>{buyVolume.toLocaleString()}주</strong>
          </div>
        </div>
      </OrderBookContainer>

      <GaugeTitle>종목정보</GaugeTitle>
      {/* ✅ 1일 가격 범위 */}
      <GaugeContainer>
        <GaugeBar>
          <CurrentPriceMarker position={calculatePosition(currentPrice, todayLow, todayHigh)} />
          <GaugeFill width={100} color="#D9D9D9" />
        </GaugeBar>
        <GaugeLabel>
          <GaugeTile>
            <span>1일 최저가</span>
            <span>{todayLow} USD</span>
          </GaugeTile>
          <GaugeTile>
            <span>1일 최고가</span>
            <span>{todayHigh} USD</span>
          </GaugeTile>
        </GaugeLabel>
      </GaugeContainer>

      {/* ✅ 1년 가격 범위 */}
      <GaugeContainer>
        <GaugeBar>
          <CurrentPriceMarker position={calculatePosition(currentPrice, yearLow, yearHigh)} />
          <GaugeFill width={100} color="#D9D9D9" />
        </GaugeBar>
        <GaugeLabel>
          <GaugeTile>
            <span>1년 최저가</span>
            <span>{yearLow} USD</span>
          </GaugeTile>
          <GaugeTile>
            <span>1년 최고가</span>
            <span>{yearHigh} USD</span>
          </GaugeTile>
        </GaugeLabel>
      </GaugeContainer>

      <BtnBox>
        <LargeBtn1
          onClick={() =>
            navigate(`/etf-buy/${symbol}`, {
              state: { symbol, currentPrice, priceChange, changePercent },
            })
          }
        >
          구매하기
        </LargeBtn1>
        <LargeBtn2
          onClick={() =>
            navigate(`/etf-sell/${symbol}`, {
              state: { symbol, currentPrice, priceChange, changePercent },
            })
          }
        >
          판매하기
        </LargeBtn2>
      </BtnBox>
    </Container>
  );
}

export default ETFDetail;
