import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CandlestickChart from '@/components/invest/CandlestickChart';
import { FaHeart } from 'react-icons/fa';
import Btn from '@/components/Btn';
import { colors } from '@/styles/colors';
import PressMotion from '@/components/PressMotion';
import useStore from '@/store/User';

const Container = styled.div`
  color: white;
  padding: 1rem;
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
  justify-content: center;
  gap: 1rem;
  margin-top: 2.5rem;
`;

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
  const location = useLocation();
  console.log('state:', location);

  const navigate = useNavigate();
  const { username, interestsStock, setInterestsStock } = useStore();
  const { symbol } = useParams<{ symbol: string }>();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');
  const [buyVolume] = useState(7500);
  const [sellVolume] = useState(3500);
  const [timeRange, setTimeRange] = useState<'1d' | '1w' | '1mo' | '1y'>('1d');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (!symbol) return;
    axios
      .get(`http://localhost:3000/invest/getData/${symbol}`)
      .then((res) => {
        console.log('📢 ETF API 응답:', res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.error('❌ 데이터 불러오기 실패:', err);
        setError('데이터 불러오기 실패');
      });
  }, [symbol]);

  useEffect(() => {
    if (username && symbol) {
      axios
        .get(`http://localhost:3000/invest/getInterestEtf/${username}`)
        .then((res) => {
          const list = res.data || [];
          setInterestsStock(list);
          setIsFavorite(list.some((etf: any) => etf.name === symbol));
        })
        .catch((err) => {
          console.error('❌ 관심 ETF 불러오기 실패:', err);
        });
    }
  }, [symbol, username]);

  const toggleFavorite = async () => {
    const meta = data?.chart?.result?.[0]?.meta;
    const currentPrice = meta?.regularMarketPrice ?? 0;
    const previousClose = meta?.chartPreviousClose ?? 0;
    const changeRate =
      previousClose && previousClose !== 0
        ? ((currentPrice - previousClose) / previousClose) * 100
        : 0;

    try {
      const url = 'http://localhost:3000/invest/setInterestEtf';

      await axios.post(url, {
        name: username,
        etfName: symbol,
        price: currentPrice,
        changeRate,
      });

      const updated = await axios.get(`http://localhost:3000/invest/getInterestEtf/${username}`);
      setInterestsStock(updated.data);
      setIsFavorite(updated.data.some((etf: any) => etf.name === symbol));
    } catch (err) {
      console.error('❌ 관심 ETF 등록/해제 실패:', err);
      alert('관심 ETF 등록/해제 중 오류가 발생했습니다.');
    }
  };

  if (error) {
    return (
      <Container>
        <h2>{symbol} 상세 정보</h2>
        <p>{error}</p>
      </Container>
    );
  }

  const meta = data?.chart?.result?.[0]?.meta;
  const currentPrice = meta?.regularMarketPrice ?? 0;
  const todayHigh = meta?.regularMarketDayHigh ?? 0;
  const todayLow = meta?.regularMarketDayLow ?? 0;
  const yearHigh = meta?.fiftyTwoWeekHigh ?? 0;
  const yearLow = meta?.fiftyTwoWeekLow ?? 0;
  const previousClose = meta?.chartPreviousClose ?? 0;
  const priceChange = Math.floor(currentPrice - previousClose);
  const changePercent =
    previousClose !== 0 ? ((currentPrice - previousClose) / previousClose) * 100 : null;
  const changeColor = priceChange > 0 ? 'red' : priceChange < 0 ? 'blue' : 'white';
  const formattedPriceChange =
    priceChange !== 0 ? `${priceChange > 0 ? '+' : ''}${priceChange}` : '0';
  const changePercentColor =
    changePercent !== null ? (changePercent > 0 ? 'red' : 'blue') : 'white';

  const calculatePosition = (value: number, min: number, max: number) =>
    max !== min ? ((value - min) / (max - min)) * 100 : 50;

  return (
    <Container>
      <FavoriteButton onClick={toggleFavorite}>
        <FaHeart color={isFavorite ? '#FF0000' : '#CCCCCC'} />
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
        {(['1d', '1w', '1mo', '1y'] as const).map((range) => (
          <Button key={range} $active={timeRange === range} onClick={() => setTimeRange(range)}>
            {range === '1d' ? '일' : range === '1w' ? '주' : range === '1mo' ? '월' : '년'}
          </Button>
        ))}
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
        <GaugeLabel>
          <GaugeTile>
            <span>판매대기</span>
            <strong>{sellVolume.toLocaleString()}주</strong>
          </GaugeTile>
          <GaugeTile>
            <span>구매대기</span>
            <strong>{buyVolume.toLocaleString()}주</strong>
          </GaugeTile>
        </GaugeLabel>
      </OrderBookContainer>

      <GaugeTitle>종목정보</GaugeTitle>
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
        <Btn
          bgColor={colors.Blue}
          handleBtn={() =>
            navigate(
              `/etf-buy/${symbol}?currentPrice=${currentPrice}&priceChange=${priceChange}&changePercent=${changePercent}`,
            )
          }
        >
          <PressMotion>
            <div style={{ width: '10rem' }}>구매하기</div>
          </PressMotion>
        </Btn>

        <Btn
          bgColor={colors.Red}
          handleBtn={() =>
            navigate(
              `/etf-sell/${symbol}?currentPrice=${currentPrice}&priceChange=${priceChange}&changePercent=${changePercent}`,
            )
          }
        >
          <PressMotion>
            <div style={{ width: '10rem' }}>판매하기</div>
          </PressMotion>
        </Btn>
      </BtnBox>
    </Container>
  );
}

export default ETFDetail;
