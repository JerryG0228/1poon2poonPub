import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import CategoryBox from '@/components/CategoryBox';
import buildingImage from '@/assets/categorybox/building_image.png';
import computerImage from '@/assets/categorybox/computer_image.png';
import moneyImage from '@/assets/categorybox/money_image.png';
import shoppingImage from '@/assets/categorybox/shopping_image.png';
import earthImage from '@/assets/categorybox/earth_image.png';
import hospitalImage from '@/assets/categorybox/hospital_image.png';

const categories = [
  '기술 & AI 관련',
  '금융 & 경제 성장 관련',
  '사회적 가치 & ESG 투자',
  '헬스케어 & 바이오',
  '리츠 & 인프라',
  '소비 & 리테일',
];

const categoryImages: { [key: string]: string } = {
  '기술 & AI 관련': computerImage,
  '금융 & 경제 성장 관련': moneyImage,
  '사회적 가치 & ESG 투자': earthImage,
  '헬스케어 & 바이오': hospitalImage,
  '리츠 & 인프라': buildingImage,
  '소비 & 리테일': shoppingImage,
};

const Container = styled.div`
  /* padding: 0 0.7rem;
  min-height: 100vh; */
  color: white;
`;

const Title = styled.h1`
  margin-top: 0.5rem;
  width: 19rem;
  font-size: 2.2rem;
  font-weight: bold;
  line-height: 2.5rem; /* 줄간격 조정 */
`;

const TextBox = styled.div`
  margin-top: 1rem;
  color: #6b7683;
  line-height: 1.2rem;
  font-weight: bold;
  font-size: 0.9rem;
`;

const Text = styled.p``;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 8rem;
`;
const NextButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;
const NextButton = styled.button`
  margin-top: 3rem;
  padding: 1rem 5rem;
  width: 22rem;
  background: ${({ disabled }) => (disabled ? 'gray' : '#007bff')};
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: 0.3s;
`;

function Category() {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : prev.length < 3
          ? [...prev, category]
          : prev,
    );
  };

  return (
    <Container>
      <Title>ETF 투자 카테고리를 선택하세요</Title>
      <TextBox>
        <Text>관심 가는 ETF 주식 종목 3개를 골라볼까요?</Text>
        <Text>AI가 내 관심을 반영해 딱 맞는 주식을 추천해줘요!</Text>
      </TextBox>

      <Grid>
        {categories.map((category) => (
          <CategoryBox
            key={category}
            title={category}
            imageSrc={categoryImages[category]} //  이미지 자동 불러오기
            active={selectedCategories.includes(category)}
            onClick={() => toggleCategory(category)}
          />
        ))}
      </Grid>

      <NextButtonBox>
        <NextButton
          disabled={selectedCategories.length !== 3}
          onClick={() => navigate('/etf-list', { state: { selectedCategories } })} // ✅ 경로 확인
        >
          다음
        </NextButton>
      </NextButtonBox>
    </Container>
  );
}

export default Category;
