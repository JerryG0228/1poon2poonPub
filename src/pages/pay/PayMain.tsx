import Btn from '@/components/Btn';
import PressMotion from '@/components/PressMotion';
import { colors } from '@/styles/colors';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import busImage from '@/assets/StampBox/BusIcon.png';
import cafeImage from '@/assets/StampBox/CafeIcon.png';
import foodImage from '@/assets/StampBox/FoodIcon.png';
import movieImage from '@/assets/StampBox/MovieIcon.png';
import storeImage from '@/assets/StampBox/StoreIcon.png';
import taxiImage from '@/assets/StampBox/TaxiIcon.png';
import CategoryBox from '@/components/CategoryBox';
import baseAxios from '@/apis/axiosInstance';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  font-weight: bold;
  padding: 0 1rem;
`;

const PayCategoryBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 5rem;
  margin-bottom: 1.5rem;
  row-gap: 1rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
  &:focus-within label {
    color: white;
  }
`;

const InputAmout = styled.input<{ value: number }>`
  font-size: 1.55rem;
  border: none;
  border-bottom: 1px solid ${colors.Grey};
  color: ${colors.Grey};
  background-color: transparent;
  padding: 0.7rem 2rem 0.7rem 0.3rem;
  width: 100%;
  font-weight: bold;
  /* 기본 포커스 아웃라인 제거 */
  /* 금액 입력 되어 있으면 글자 흰색, 밑줄 파란색 */
  &:focus {
    outline: none;
    border-bottom: 1px solid ${colors.LightBlue};
    color: ${(props) => (props.value < 1 ? colors.Grey : colors.White)};
  }

  /* 파이어폭스 스핀 버튼 숨기기 */
  -moz-appearance: textfield;

  /* 웹킷 브라우저(크롬, 사파리, 엣지,  오페라)에서 스핀 버튼 숨기기 */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

//input 끝에 '원' 글자 고정
const Unit = styled.label`
  position: absolute;
  right: 0.5rem;
  bottom: 0.7rem;
  font-size: 1.55rem;
  color: ${colors.Grey};
`;

const categoryList = [
  { title: '대중교통', category: 'bus', image: busImage },
  { title: '택시', category: 'taxi', image: taxiImage },
  { title: '편의점', category: 'convenienceStore', image: storeImage },
  { title: '영화관', category: 'movie', image: movieImage },
  { title: '패스트푸드', category: 'fastFood', image: foodImage },
  { title: '카페', category: 'cafe', image: cafeImage },
];

export default function PayMain() {
  const [selectedCategory, setSelectedCategory] = useState<Object | null>(null);
  const [bgColor, setBgColor] = useState<string>(colors.Grey);
  const [payAmount, setPayAmount] = useState<number | null>(null); // 결제 금액
  const [point, setPoint] = useState<number>(0);
  const [data, setData] = useState<Object>({}); // 전달 데이터

  // 카테고리 클릭 핸들러
  const handleClick = (item: Object) => {
    // 한 개만 선택 가능 → 이미 선택된 경우 해제
    setSelectedCategory((prev) => (prev === item ? null : item));
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value); // 입력값을 숫자로 변환
    setPoint(value >= 10000 ? 500 : 100);

    setPayAmount(value > 0 ? value : null); // 0보다 크면 저장, 아니면 null
  };

  console.log(data);
  const fetchData = async () => {
    await baseAxios
      .post('/user/addStamp', data)
      .then(() => {})
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    setData({ name: 'tester', value: point, stampType: selectedCategory?.category });

    // selectedCategory가 null이면 회색, 아니면 파란색
    setBgColor(selectedCategory !== null && payAmount !== null ? colors.LightBlue : colors.Grey);
  }, [selectedCategory, payAmount]); // selectedCategory가 변경될 때마다 실행

  return (
    <Box>
      <PayCategoryBox>
        {categoryList.map((item) => (
          <CategoryBox
            key={item.category}
            title={item.title}
            imageSrc={item.image}
            active={selectedCategory === item} // 선택된 경우 true로 active 적용
            onClick={() => handleClick(item)} // 클릭 이벤트 추가
          />
        ))}
      </PayCategoryBox>
      <InputWrapper>
        <InputAmout
          id="inputAmount"
          type="number"
          value={payAmount}
          placeholder="금액"
          onChange={handleInput}
        ></InputAmout>
        <Unit htmlFor="inputAmount">원</Unit>
      </InputWrapper>
      <Link to="/">
        <Btn bgColor={bgColor} handleBtn={fetchData}>
          <PressMotion>
            <div style={{ width: '21.3rem' }}>결제하기</div>
          </PressMotion>
        </Btn>
      </Link>
    </Box>
  );
}
