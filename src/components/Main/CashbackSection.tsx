import styled from 'styled-components';
import TitleBox from '@/components/TitleBox';
import StampBox from '@/components/StampBox';
import busImage from '@/assets/StampBox/BusIcon.png';
import cafeImage from '@/assets/StampBox/CafeIcon.png';
import foodImage from '@/assets/StampBox/FoodIcon.png';
import movieImage from '@/assets/StampBox/MovieIcon.png';
import storeImage from '@/assets/StampBox/StoreIcon.png';
import taxiImage from '@/assets/StampBox/TaxiIcon.png';

const StampBoxWrap = styled.div`
  display: flex;
  grid-template-columns: repeat(6, 1fr);
  justify-content: space-between;
`;

interface CashbackSectionProps {
  todayCategories: string[];
}

export default function CashbackSection({ todayCategories }: CashbackSectionProps) {
  //가져온 카테고리의 active를 false로 변경
  const stampItem = [
    { title: '대중교통', img: busImage, bgColor: '#6E5230' },
    { title: '택시', img: taxiImage, bgColor: '#6E5E3D' },
    { title: '편의점', img: storeImage, bgColor: '#304E7B' },
    { title: '영화관', img: movieImage, bgColor: '#683745' },
    { title: '패스트푸드', img: foodImage, bgColor: '#6E5E3D' },
    { title: '카페', img: cafeImage, bgColor: '#264038' },
  ].map((stamp) => ({
    ...stamp, //stampItem의 title, img, bgColor의 값 가져오기
    active: !todayCategories.includes(stamp.title),
  }));

  return (
    <>
      <TitleBox title="캐시백 영역">
        <StampBoxWrap>
          {stampItem.map((item) => (
            <StampBox
              key={item.title}
              icon={item.img}
              title={item.title}
              bgColor={item.bgColor}
              active={item.active}
            />
          ))}
        </StampBoxWrap>
      </TitleBox>
    </>
  );
}
