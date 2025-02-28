import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background: #121212;
  min-height: 100vh;
  color: white;
`;

function ETFDetail() {
  const { symbol } = useParams<{ symbol: string }>();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:5001/api/etf/${symbol}`);
        setData(res.data);
      } catch (err) {
        setError('데이터 불러오기 실패');
      }
    }
    fetchData();
  }, [symbol]);

  return (
    <Container>
      <h2>{symbol} 상세 정보</h2>
      {error ? <p>{error}</p> : <p>현재가: {data?.price}원</p>}
    </Container>
  );
}

export default ETFDetail;
