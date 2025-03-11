import React, { useEffect, useRef, useState } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import baseAxios from '@/apis/axiosInstance';

type CandlestickChartProps = {
  symbol: string;
  timeRange: '1d' | '1w' | '1mo' | '1y';
};

const CandlestickTopGainersChart = ({ symbol, timeRange }: CandlestickChartProps) => {
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
      width: 140,
      height: 100,
      layout: { background: { color: 'transparent' }, textColor: '#FFFFFF' }, // ✅ 배경 투명 처리
      grid: {
        vertLines: { visible: false }, // 세로선 제거
        horzLines: { visible: false }, // 가로선 제거
      },
      crosshair: { mode: CrosshairMode.Normal },
      timeScale: {
        visible: false, // X축 눈금 제거
        borderVisible: false, // X축 경계선 제거
        fixLeftEdge: true, // 왼쪽 경계 고정
        fixRightEdge: true, // 오른쪽 경계 고정
        lockVisibleTimeRangeOnResize: true,
      },
      rightPriceScale: {
        visible: false, // 오른쪽 가격 눈금 제거
        borderVisible: false, // 가격 축 경계선 제거
      },
      leftPriceScale: {
        visible: false, // 왼쪽 가격 눈금 제거
        borderVisible: false, // 가격 축 경계선 제거
      },
      handleScroll: false, // 차트 스크롤 방지
      handleScale: false, // 차트 확대/축소 방지
      watermark: { visible: false }, // 워터마크 제거
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#0064FF',
      downColor: '#FF0000',
      borderUpColor: '#0064FF',
      borderDownColor: '#FF0000',
      wickUpColor: '#0064FF',
      wickDownColor: '#FF0000',
      priceLineVisible: false, // 가격 라벨 제거
    });

    candleSeries.setData(chartData);
    seriesRef.current = candleSeries;
    chartRef.current = chart;
  }, [chartData]);

  return (
    <div
      ref={chartContainerRef}
      style={{ width: '100%', height: '40%', background: 'transparent' }}
    />
  );
};

export default CandlestickTopGainersChart;
