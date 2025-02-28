import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';

// 투자 카테고리 타입
type CategoryType = {
  name: string;
  id: string;
  icon: string;
};

// 투자 카테고리 목록
const categories: CategoryType[] = [
  { name: '기술 & AI 관련', id: 'tech', icon: '💻' },
  { name: '금융 & 경제 성장 관련', id: 'finance', icon: '💰' },
  { name: '사회적 가치 & ESG 투자', id: 'esg', icon: '🌍' },
  { name: '헬스케어 & 바이오', id: 'healthcare', icon: '🏥' },
  { name: '리츠 & 인프라', id: 'reit', icon: '🏢' },
  { name: '소비 & 리테일', id: 'consumer', icon: '🛍️' },
];

const Container = styled.div`
  padding: 20px;
  background: #121212;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 20px;
`;

const CategoryButton = styled.button<{ selected: boolean }>`
  padding: 15px;
  background: ${({ selected }) => (selected ? '#007BFF' : '#333')};
  border: none;
  border-radius: 8px;
  text-align: center;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const NextButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background: #007bff;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;

  &:disabled {
    background: gray;
    cursor: not-allowed;
  }
`;

function Category() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <Container>
      <Title>ETF 투자 카테고리를 선택하세요</Title>

      <Grid>
        {categories.map((cat) => (
          <CategoryButton
            key={cat.id}
            selected={selectedCategory === cat.id}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.icon} {cat.name}
          </CategoryButton>
        ))}
      </Grid>

      <NextButton
        disabled={!selectedCategory}
        onClick={() => navigate(`/etf-list/${selectedCategory}`)}
      >
        다음
      </NextButton>
    </Container>
  );
}

export default Category;
