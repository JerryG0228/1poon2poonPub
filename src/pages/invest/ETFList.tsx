import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import etfData from '@/data/etfData'; // ETF 데이터

const Container = styled.div`
  padding: 20px;
  background: #121212;
  min-height: 100vh;
  color: white;
`;

const ETFItem = styled.div`
  padding: 10px;
  background: #222;
  border-radius: 8px;
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #007bff;
  }
`;

function ETFList() {
  const navigate = useNavigate();
  const { category } = useParams<{ category?: string }>(); // category를 optional로 변경
  const categoryKey = category ?? 'tech'; // 기본값 'tech' 설정
  const [prices, setPrices] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    async function fetchPrices() {
      const priceData: { [key: string]: string } = {};
      const etfs = etfData[categoryKey] || []; // undefined 방지

      for (const etf of etfs.slice(0, 15)) {
        try {
          const res = await axios.get(`http://localhost:5001/api/etf/${etf}`);
          priceData[etf] = res.data.price ? `${res.data.price}원` : '데이터 없음';
        } catch (error) {
          priceData[etf] = '오류 발생';
        }
      }
      setPrices(priceData);
    }
    fetchPrices();
  }, [categoryKey]);

  return (
    <Container>
      <h2>추천 ETF</h2>

      {etfData[categoryKey]?.slice(0, 15).map((etf) => (
        <ETFItem key={etf} onClick={() => navigate(`/etf-detail/${etf}`)}>
          <span>{etf}</span>
          <span>{prices[etf] || '로딩 중...'}</span>
        </ETFItem>
      ))}
    </Container>
  );
}

export default ETFList;
