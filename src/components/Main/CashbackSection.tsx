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
  cashbackStatus: { [key: string]: boolean };
}

export default function CashbackSection({ cashbackStatus }: CashbackSectionProps) {
  //가져온 카테고리의 active를 false로 변경
  const stampItem = [
    { title: '대중교통', key: 'bus', img: busImage, bgColor: '#6E5230' },
    { title: '택시', key: 'taxi', img: taxiImage, bgColor: '#6E5E3D' },
    { title: '편의점', key: 'convenienceStore', img: storeImage, bgColor: '#304E7B' },
    { title: '영화관', key: 'movie', img: movieImage, bgColor: '#683745' },
    { title: '패스트푸드', key: 'fastFood', img: foodImage, bgColor: '#6E5E3D' },
    { title: '카페', key: 'cafe', img: cafeImage, bgColor: '#264038' },
  ].map((stamp) => ({
    ...stamp, //stampItem의 title, img, bgColor의 값 가져오기
    active: cashbackStatus[stamp.key],
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
