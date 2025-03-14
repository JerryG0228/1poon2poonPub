import baseAxios from '@/apis/axiosInstance';
import Btn from '@/components/Btn';
import PressMotion from '@/components/PressMotion';
import TitleBox from '@/components/TitleBox';
import useStore from '@/store/User';
import { colors } from '@/styles/colors';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 22rem; */
  font-weight: bold;
  padding: 0 1rem;
  margin-top: 3rem;
`;

const DonateBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.5rem;
`;
const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
  &:focus-within label {
    color: white;
  }
`;

const DonateInput = styled.input<{ show: number }>`
  font-weight: bold;
  font-size: 1.7rem;
  background-color: transparent;
  border: none;
  color: ${(props) => (props.show ? 'white' : colors.Grey)};

  &:focus {
    outline: none;
    color: white;
  }
`;

//input 끝에 '원' 글자 고정
const Unit = styled.label`
  position: absolute;
  right: 0.5rem;
  bottom: 0.2rem;
  font-size: 1.55rem;
  color: ${colors.Grey};
`;

const PointBalance = styled.div`
  font-size: 0.8rem;
  color: ${colors.Grey};
`;

const BtnWrap = styled(Link)<{ disabled: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%; /* 전체 너비 사용 */
  display: flex; /* 내부 요소 정렬 */
  justify-content: center; /* 가운데 정렬 */
  align-items: center;
  padding: 1rem; /* 버튼과 화면 하단 사이 여백 */
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')}; // 클릭 막기
  opacity: ${(props) => (props.disabled ? 0.5 : 1)}; // 비활성화 시 시각적 피드백
`;

export default function Donate() {
  const { points, goalDonations, currentDonations, username, updateCurrentDonations, setPoints } =
    useStore();
  const [formattedValue, setFormattedValue] = useState<string>('');
  const [data, setData] = useState<{ name: string; amount: number }>({ name: username, amount: 0 });
  const [bgColor, setBgColor] = useState(colors.Grey);

  const remainAmount = goalDonations - currentDonations;

  //input onChange 핸들러
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = event.target.value.replace(/,/g, ''); // 쉼표 제거 후 숫자로 변환
    let amount: number = Number(rawValue); // 입력값을 숫자로 변환

    const maxAmount = Math.min(remainAmount, points);
    if (points === 0) {
      alert('포인트가 없습니다.');
      setFormattedValue('');
      setData({ name: username, amount: 0 }); // 데이터 초기화
      event.preventDefault(); // 기본 입력 동작을 방지하여 더 이상 입력이 안 되도록
      return; // 더 이상 실행되지 않도록 early return
    }
    if (amount > maxAmount) {
      amount = maxAmount; // 초과시 최대값으로 설정
    }
    setFormattedValue(amount > 0 ? amount.toLocaleString() : '');
    setData({ name: username, amount: amount });
  };

  const fetchData = async () => {
    console.log('data: ', data);

    await baseAxios
      .post('/donate/donation', data)
      .then(() => {
        updateCurrentDonations(data.amount);
        setPoints(data.amount, '기부');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  useEffect(() => {
    setBgColor(formattedValue == '' ? colors.Grey : colors.LightBlue);
  }, [formattedValue]); // selectedCategory가 변경될 때마다 실행

  return (
    <Box>
      <DonateBox>
        <TitleBox title="목표 금액까지 남은 금액">
          {remainAmount.toLocaleString()}원<div></div>
        </TitleBox>
        <TitleBox title="기부 금액">
          <InputWrapper>
            <DonateInput
              disabled={points == 0}
              type="text"
              placeholder="금액"
              inputmode="numeric"
              value={formattedValue}
              onChange={handleInput}
            ></DonateInput>
            <Unit htmlFor="inputAmount">원</Unit>
          </InputWrapper>
          <PointBalance>보유 포인트 {points.toLocaleString()}원</PointBalance>
        </TitleBox>
      </DonateBox>
      <BtnWrap to="/donateHome" disabled={Number(formattedValue) === 0}>
        <Btn bgColor={bgColor} handleBtn={fetchData}>
          <PressMotion>
            <div style={{ fontWeight: '500', letterSpacing: '0.2em' }}>기부 하기</div>
          </PressMotion>
        </Btn>
      </BtnWrap>
    </Box>
  );
}
