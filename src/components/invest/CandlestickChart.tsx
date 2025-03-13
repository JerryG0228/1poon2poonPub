import { useEffect, useRef, useState } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import styled from 'styled-components';
import baseAxios from '@/apis/axiosInstance';

type CandlestickChartProps = {
  symbol: string;
  timeRange: '1d' | '1w' | '1mo' | '1y';
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center; /* 가로 가운데 정렬 */
  align-items: center; /* 세로 가운데 정렬 */
  width: 100%;
  height: auto;
`;

const ChartContainer = styled.div`
  width: 100%; /* 차트 크기 조정 */
  margin-top: 0.8rem;
  display: flex;
  margin-right: 1.2rem;
  position: relative;
`;

const CandlestickChart = ({ symbol, timeRange }: CandlestickChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchChartData() {
      if (!symbol) return;

      try {
        const res = await baseAxios.get(`/invest/getData/${symbol}?range=${timeRange}`);
        console.log('차트 데이터:', res.data);

        const quote = res.data?.chart?.result?.[0]?.indicators?.quote?.[0];
        const timestamps = res.data?.chart?.result?.[0]?.timestamp;

        if (!quote || !timestamps) {
          console.error('데이터 형식 오류');
          return;
        }

        const formattedData = timestamps.map((ts: number, idx: number) => ({
          time: ts,
          open: quote.open?.[idx] ?? 0,
          high: quote.high?.[idx] ?? 0,
          low: quote.low?.[idx] ?? 0,
          close: quote.close?.[idx] ?? 0,
        }));

        setChartData(formattedData);
      } catch (err) {
        console.error('데이터 가져오기 실패:', err);
      }
    }

    fetchChartData();
  }, [symbol, timeRange]);

  useEffect(() => {
    if (!chartContainerRef.current || chartData.length === 0) return;

    if (chartRef.current) {
      chartRef.current.remove();
    }

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 270, // 차트 크기 확대
      layout: { background: { color: '#202632' }, textColor: '#8f9298' },
      grid: {
        vertLines: { visible: false }, // 배경선 제거
        horzLines: { visible: false }, // 배경선 제거
      },
      crosshair: { mode: CrosshairMode.Normal },
      timeScale: {
        timeVisible: true,
        borderColor: 'transparent',
        rightOffset: 0,
        lockVisibleTimeRangeOnResize: true,
      },
      rightPriceScale: { visible: false }, // 기존 오른쪽 눈금 제거
      leftPriceScale: { visible: true, borderColor: 'transparent' }, // 왼쪽 눈금 활성화
      watermark: { visible: false }, // 워터마크 제거
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#0064FF',
      downColor: '#FF0000',
      borderUpColor: '#0064FF',
      borderDownColor: '#FF0000',
      wickUpColor: '#0064FF',
      wickDownColor: '#FF0000',
      priceLineVisible: false, // 가격 라벨(마크) 제거
    });

    candleSeries.setData(chartData);

    const updateVisibleRange = () => {
      const lastIndex = chartData.length - 1;
      if (lastIndex > 0) {
        const lastTime = chartData[lastIndex].time;
        const rangeSize = getVisibleRange(timeRange, lastIndex);
        const firstTime = chartData[Math.max(0, lastIndex - rangeSize)].time;
        chart.timeScale().setVisibleRange({ from: firstTime, to: lastTime });
      }
    };

    updateVisibleRange(); // 초기 설정
    seriesRef.current = candleSeries;
    chartRef.current = chart;
  }, [chartData]);

  /** 기간별 표시할 캔들 개수 계산 */
  const getVisibleRange = (range: '1d' | '1w' | '1mo' | '1y', lastIndex: number) => {
    switch (range) {
      case '1d':
        return 2; // 최근 30개 캔들 (약 하루)
      case '1w':
        return 5; // 최근 100개 캔들 (약 1주일)
      case '1mo':
        return 30; // 최근 200개 캔들 (약 1달)
      case '1y':
        return 365; // 최근 365개 캔들 (약 1년)
      default:
        return 30;
    }
  };

  return (
    <Wrapper>
      <ChartContainer ref={chartContainerRef} />
    </Wrapper>
  );
};

export default CandlestickChart;
