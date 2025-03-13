import CategoryBox from '@/components/invest/CategoryBox';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Btn from '@/components/Btn';
import { colors } from '@/styles/colors';
import PressMotion from '@/components/PressMotion';
import booksImage from '@/assets/categorybox/books_image.png';
import doveImage from '@/assets/categorybox/dove_image.png';
import dogImage from '@/assets/categorybox/dog_image.png';
import earthImage from '@/assets/categorybox/earth_image.png';
import homeImage from '@/assets/categorybox/home_img.png';
import hospitalImage from '@/assets/categorybox/hospital_image.png';
import { useEffect, useState } from 'react';
import useStore from '@/store/User';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 0 1rem;
`;

const Title = styled.div`
  font-size: 2rem;
`;

const Info = styled.div`
  font-size: 0.9rem;
  color: #c5c5c5;
`;

const DonateCategoryBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 5rem;
  margin-bottom: 1.5rem;
  row-gap: 1rem;
`;

const CustomLink = styled(Link)<{ disabled?: boolean }>`
  display: inline-flex;
  width: 100%;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
`;

const categoryList = [
  { category: '교육 문화', image: booksImage },
  { category: '공익 인권', image: doveImage },
  { category: '국제 구호', image: earthImage },
  { category: '사회 복지', image: homeImage },
  { category: '의료 건강', image: hospitalImage },
  { category: '환경 동물', image: dogImage },
];

interface CategoryItem {
  category: string;
  image: string;
}

export default function DonateCategory() {
  const { setGoalCategory } = useStore();
  //active적용. 처음엔 선택안함. 다음 페이지에 데이터 전송
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [bgColor, setBgColor] = useState(colors.Grey);

  // 카테고리 클릭 핸들러
  const handleClick = (item: CategoryItem) => {
    // 한 개만 선택 가능 → 이미 선택된 경우 해제
    setSelectedCategory((prev) => (prev === item ? null : item));
  };
  console.log(selectedCategory);
  useEffect(() => {
    if (selectedCategory != null) {
      setGoalCategory(selectedCategory.category); // selectedCategory가 null이 아닐 때만 호출
    }
    // selectedCategory가 null이면 회색, 아니면 파란색
    setBgColor(selectedCategory == null ? colors.Grey : colors.LightBlue);
  }, [selectedCategory]); // selectedCategory가 변경될 때마다 실행

  return (
    <Box>
      <Title>
        기부 카테고리를
        <br /> 선택해주세요
      </Title>
      <Info>최대 1개 선택 가능</Info>
      <DonateCategoryBox>
        {categoryList.map((item) => (
          <CategoryBox
            key={item.category}
            title={item.category}
            imageSrc={item.image}
            active={selectedCategory === item} // 선택된 경우 true로 active 적용
            isPay={false}
            onClick={() => handleClick(item)} // 클릭 이벤트 추가
          />
        ))}
      </DonateCategoryBox>
      <CustomLink to="/donategoal" disabled={selectedCategory == null}>
        <Btn bgColor={bgColor} handleBtn={() => {}}>
          <PressMotion>
            <div style={{ width: '21.3rem' }}>다음</div>
          </PressMotion>
        </Btn>
      </CustomLink>
    </Box>
  );
}
