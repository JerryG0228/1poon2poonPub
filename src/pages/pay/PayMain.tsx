import Btn from '@/components/Btn';
import PressMotion from '@/components/PressMotion';
import { colors } from '@/styles/colors';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CategoryBox from '@/components/invest/CategoryBox';
import baseAxios from '@/apis/axiosInstance';
import { createGlobalStyle } from 'styled-components';
import useStore from '@/store/User';
import fastfood from '@/assets/Pay/fastfood.json';
import taxi from '@/assets/Pay/taxi.json';
import bus from '@/assets/Pay/bus.json';
import cafe from '@/assets/Pay/cafe.json';
import store from '@/assets/Pay/store.json';
import movie from '@/assets/Pay/movie.json';

const GlobalStyle = createGlobalStyle`
  #root {
    background-color: white !important;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-weight: bold;
  padding: 0 1rem;
`;

const Title = styled.div`
  font-size: 2rem;
  color: black;
  font-weight: bold;
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
    color: ${colors.Black};
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
    color: ${(props) => (props.value < 1 ? colors.Grey : colors.Black)};
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

const CustomLink = styled(Link)<{ disabled?: boolean }>`
  max-width: 400px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${colors.White};
  width: calc(100% - 2rem); /* 좌우 여백을 고려한 너비 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const categoryList = [
  { title: '대중교통', category: 'bus', image: bus },
  { title: '택시', category: 'taxi', image: taxi },
  { title: '편의점', category: 'convenienceStore', image: movie },
  { title: '영화관', category: 'movie', image: store },
  { title: '패스트푸드', category: 'fastFood', image: fastfood },
  { title: '카페', category: 'cafe', image: cafe },
];

interface CategoryItem {
  title: string;
  category: string;
  image: string;
}

export default function PayMain() {
  const { addStamp, username, setCashbackStatus } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [bgColor, setBgColor] = useState<string>(colors.Grey);
  const [payAmount, setPayAmount] = useState<number | null>(null); // 결제 금액
  const [point, setPoint] = useState<number>(0);
  const [data, setData] = useState<Object>({}); // 전달 데이터

  // 카테고리 클릭 핸들러
  const handleClick = (item: CategoryItem) => {
    // 한 개만 선택 가능 → 이미 선택된 경우 해제
    setSelectedCategory((prev) => (prev === item ? null : item));
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value); // 입력값을 숫자로 변환
    setPoint(value >= 10000 ? 500 : 100);

    setPayAmount(value > 0 ? value : null); // 0보다 크면 저장, 아니면 null
  };

  const fetchData = async () => {
    await baseAxios
      .post('/user/addStamp', data)
      .then(() => {
        setCashbackStatus(selectedCategory?.category);
        addStamp(point);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    setData({ name: username, value: point, stampType: selectedCategory?.category });

    // selectedCategory가 null이면 회색, 아니면 파란색
    setBgColor(selectedCategory !== null && payAmount !== null ? colors.LightBlue : colors.Grey);
  }, [selectedCategory, payAmount]); // selectedCategory가 변경될 때마다 실행

  return (
    <Box>
      <GlobalStyle />
      <Title>
        결제하실 카테고리를
        <br />
        선택해주세요
      </Title>
      <PayCategoryBox>
        {categoryList.map((item) => (
          <CategoryBox
            key={item.category}
            title={item.title}
            imageSrc={item.image}
            isPay={true}
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
      <CustomLink to="/paycomplete">
        <Btn bgColor={bgColor} handleBtn={fetchData}>
          <PressMotion>
            <div>결제하기</div>
          </PressMotion>
        </Btn>
      </CustomLink>
    </Box>
  );
}
