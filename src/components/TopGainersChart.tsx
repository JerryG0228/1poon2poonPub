import React from 'react';
import styled from 'styled-components';
import CandlestickTopGainersChart from '@/components/CandlestickTopGainersChart';
import ETFBox from '@/components/ETFBox';

const ChartContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding: 1rem 0;
`;

const ChartBox = styled.div`
  /* background-color: #ffffff; */
  background-color: #313845;
  padding: 0.5rem;
  border-radius: 10px;
  min-width: 10rem;
  max-width: 10rem;
  min-height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface TopGainersChartProps {
  topETFs: {
    name: string;
    price: number;
    previousClose: number;
    transPrice: number;
    changePercent: string;
  }[];
}

const TopGainersChart: React.FC<TopGainersChartProps> = ({ topETFs }) => {
  if (!topETFs || topETFs.length === 0) return null;

  return (
    <ChartContainer>
      {topETFs.map((etf) => {
        return (
          <ChartBox key={etf.name}>
            {/* ✅ ETFBox 사용 (이미지 제거된 버전) */}
            <ETFBox
              name={etf.name}
              price={etf.price}
              transPrice={etf.transPrice}
              changePercent={etf.changePercent}
              isRecommend={true}
              isImageVisible={false} // ✅ 이미지 숨기기
            />

            {/* ✅ 캔들 차트 */}
            <CandlestickTopGainersChart symbol={etf.name} timeRange="1mo" />
          </ChartBox>
        );
      })}
    </ChartContainer>
  );
};

export default TopGainersChart;
