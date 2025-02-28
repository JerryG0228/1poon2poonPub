import CategoryBox from '@/components/CategoryBox';
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
import { useState } from 'react';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  gap: 1rem;
  margin-top: 1.5rem;
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
  margin-bottom: 2.5rem;
  row-gap: 1rem;
`;

const categoryList = [
  { name: '교육·문화', image: booksImage },
  { name: '공익·인권', image: doveImage },
  { name: '국제·구호', image: earthImage },
  { name: '사회·복지', image: homeImage },
  { name: '의료·건강', image: hospitalImage },
  { name: '환경·동물', image: dogImage },
];
export default function DonateCategory() {
  //active적용. 처음엔 선택안함. 다음 페이지에 데이터 전송
  const [selectedCategory, setSelectedCategory] = useState<Object | null>(null);

  // 카테고리 클릭 핸들러
  const handleClick = (item: Object) => {
    // 한 개만 선택 가능 → 이미 선택된 경우 해제
    setSelectedCategory((prev) => (prev === item ? null : item));
  };

  // 다음 버튼 클릭 핸들러러
  const handleBtn = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // 카테고리를 선택하지 않으면 다음으로 넘어가지 않음.
    if (selectedCategory == null) {
      event.preventDefault();
      alert('기부 할 카테고리를 선택해 주세요!');
    }
  };

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
            key={item.name}
            title={item.name}
            imageSrc={item.image}
            active={selectedCategory === item} // 선택된 경우 true로 active 적용
            onClick={() => handleClick(item)} // 클릭 이벤트 추가
          />
        ))}
      </DonateCategoryBox>
      <Link to="/donateGoal" state={{ selectedCategory }} onClick={handleBtn}>
        <Btn bgColor={colors.LightBlue} handleBtn={() => {}}>
          <PressMotion>
            <div style={{ width: '20.5rem' }}>다음</div>
          </PressMotion>
        </Btn>
      </Link>
    </Box>
  );
}
