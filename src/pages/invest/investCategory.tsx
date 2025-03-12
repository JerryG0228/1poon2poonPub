import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import CategoryBox from '@/components/invest/CategoryBox';
import buildingImage from '@/assets/categorybox/building_image.png';
import computerImage from '@/assets/categorybox/computer_image.png';
import moneyImage from '@/assets/categorybox/money_image.png';
import shoppingImage from '@/assets/categorybox/shopping_image.png';
import earthImage from '@/assets/categorybox/earth_image.png';
import hospitalImage from '@/assets/categorybox/hospital_image.png';
import Btn from '@/components/Btn';
import { colors } from '@/styles/colors';
import PressMotion from '@/components/PressMotion';
import useStore from '@/store/User';
import baseAxios from '@/apis/axiosInstance';

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
  padding: 1rem;
  color: white;
`;

const Title = styled.h1`
  margin-top: 0.5rem;
  width: 19rem;
  font-size: 2.2rem;
  font-weight: bold;
  line-height: 2.5rem;
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
  margin-top: 5rem;
`;

function Category() {
  const navigate = useNavigate();
  const { username, interests, setInterests } = useStore();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(interests || []);

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
            imageSrc={categoryImages[category]}
            active={selectedCategories.includes(category)}
            onClick={() => toggleCategory(category)}
          />
        ))}
      </Grid>

      <NextButtonBox>
        <Btn
          bgColor={colors.Blue}
          handleBtn={async () => {
            if (selectedCategories.length === 3) {
              try {
                const response = await baseAxios.post('/invest/setCategory', {
                  name: username,
                  categories: selectedCategories,
                });

                setInterests(selectedCategories);
                console.log('카테고리 등록 성공:', response.data);
                navigate('/etf-list', { state: { selectedCategories } });
              } catch (error) {
                console.error('카테고리 등록 실패:', error);
                alert('카테고리 등록 중 오류가 발생했습니다.');
              }
            } else {
              alert('카테고리를 3개 선택해 주세요!');
            }
          }}
        >
          <PressMotion>
            <div style={{ width: '21.5rem' }}>다음</div>
          </PressMotion>
        </Btn>
      </NextButtonBox>
    </Container>
  );
}

export default Category;
