import Btn from '@/components/Btn';
import PressMotion from '@/components/PressMotion';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { useEffect, useState } from 'react';
import baseAxios from '@/apis/axiosInstance';
import useStore from '@/store/User';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  margin-top: 1.5rem;
  font-weight: bold;
  padding: 0 1rem;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.div`
  font-size: 2rem;
`;

const Info = styled.div`
  font-size: 0.9rem;
  color: #c5c5c5;
`;

const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 17rem;
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
    color: ${(props) => (props.value < 10000 ? colors.Grey : colors.White)};
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
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
`;

export default function DonateGoal() {
  const { setGoalDonations, goalCategory, username } = useStore();
  const [targetAmount, setTargetAmount] = useState<number | null>(null); // 목표 금액
  const [data, setData] = useState<Object>({}); // 전달 데이터
  const [bgColor, setBgColor] = useState(colors.Grey);
  //input onChange 핸들러
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value); // 입력값을 숫자로 변환
    setTargetAmount(value > 0 ? value : null); // 0보다 크면 저장, 아니면 null
    setData({ category: goalCategory, targetAmount: value, name: username });
  };

  const fetchData = async () => {
    await baseAxios
      .post('/donate/setDonate', data)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setGoalDonations(data.targetAmount);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    setBgColor((targetAmount ?? 0) < 10000 ? colors.Grey : colors.LightBlue);
  }, [targetAmount]);

  return (
    <Box>
      <TitleBox>
        <Title>
          기부 목표 금액을
          <br />
          설정해주세요
        </Title>
        <Info>최소 10,000원 이상 설정 가능</Info>
      </TitleBox>
      <InputWrapper>
        <InputAmout
          id="inputAmount"
          type="number"
          value={targetAmount}
          placeholder="금액"
          onChange={handleInput}
        ></InputAmout>
        <Unit htmlFor="inputAmount">원</Unit>
      </InputWrapper>
      <CustomLink to="/donatesetfinish" disabled={(targetAmount ?? 0) < 10000}>
        <Btn bgColor={bgColor} handleBtn={fetchData}>
          <PressMotion>
            <div style={{ width: '21.3rem' }}>설정하기</div>
          </PressMotion>
        </Btn>
      </CustomLink>
    </Box>
  );
}
