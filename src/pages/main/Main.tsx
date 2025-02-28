import StampBox from '@/components/StampBox';
import TitleBox from '@/components/TitleBox';
import busImage from '@/assets/StampBox/BusIcon.png';
import cafeImage from '@/assets/StampBox/CafeIcon.png';
import foodImage from '@/assets/StampBox/FoodIcon.png';
import movieImage from '@/assets/StampBox/MovieIcon.png';
import storeImage from '@/assets/StampBox/StoreIcon.png';
import taxiImage from '@/assets/StampBox/TaxiIcon.png';
import styled from 'styled-components';
import NonTitleBox from '@/components/NonTitleBox';
import cashbackImage from '@/assets/CashbackIcon.png';
import vectorImage from '@/assets/Vector.png';

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StampBoxWrap = styled.div`
  display: flex;
  grid-template-columns: repeat(6, 1fr);
  justify-content: space-between;
`;

const CashBackWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const CashBackImageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6e6430;
  border-radius: 0.3rem;
  width: 2rem;
  height: 2rem;
  > img {
    width: 1.2rem;
    height: 1.25rem;
  }
`;

const CashBackTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 15rem;
`;

const Balance = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
`;

const Point = styled.div`
  font-size: 0.7rem;
`;

const CashBacArrowWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    justify-content: center;
    align-items: center;
    width: 0.8rem;
    height: 1.1rem;
  }
`;

export default function Main() {
  const stampItem = [
    { title: '대중교통', img: busImage, bgColor: '#6E5230' },
    { title: '택시', img: taxiImage, bgColor: '#6E5E3D' },
    { title: '편의점', img: storeImage, bgColor: '#304E7B' },
    { title: '영화관', img: movieImage, bgColor: '#683745' },
    { title: '패스트푸드', img: foodImage, bgColor: '#6E5E3D' },
    { title: '카페', img: cafeImage, bgColor: '#264038' },
  ];

  return (
    <>
      <MainWrap>
        <TitleBox title="캐시백 영역">
          <StampBoxWrap>
            {stampItem.map((item) => (
              <StampBox
                key={item.title}
                icon={item.img}
                title={item.title}
                bgColor={item.bgColor}
                active={true}
              />
            ))}
          </StampBoxWrap>
        </TitleBox>
        <NonTitleBox>
          <CashBackWrap>
            <CashBackImageWrap>
              <img src={cashbackImage} />{' '}
            </CashBackImageWrap>
            <CashBackTextWrap>
              <Balance>10,000원</Balance>
              <Point>캐시백 포인트</Point>
            </CashBackTextWrap>
            <CashBacArrowWrap>
              <img src={vectorImage} />
            </CashBacArrowWrap>
          </CashBackWrap>
        </NonTitleBox>
      </MainWrap>
    </>
  );
}
