import Btn from '@/components/Btn';
import PressMotion from '@/components/PressMotion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { useState } from 'react';
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
    color: ${(props) => (props.value < 0 || null ? colors.Grey : colors.White)};
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

const BtnWrap = styled.div`
  display: flex;
  position: fixed;
  bottom: 1rem;
`;

export default function WithDraw() {
  const navigate = useNavigate();
  const { setPoints, points } = useStore();
  const [formattedValue, setFormattedValue] = useState<string>(''); //input에

  const [amount, setAmount] = useState(0);
  const isDisabled = !formattedValue || amount <= 0 || amount > points;

  const maxPoint = Math.min(points);

  //input onChange 핸들러
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = event.target.value.replace(/,/g, ''); // 쉼표 제거 후 숫자로 변환

    let value = Number(rawValue);

    if (value > maxPoint) {
      value = maxPoint; // 초과시 최대값으로 설정
    }
    setAmount(value);
    setFormattedValue(value > 0 ? value.toLocaleString() : '');
  };

  const handleWithdraw = async () => {
    if (isDisabled) return;

    try {
      await setPoints(-amount, '출금');

      navigate('/withdrawfinish');
    } catch (err) {
      console.log('실패: ', err);
    }
  };

  return (
    <Box>
      <TitleBox>
        <Title>
          출금할 금액을
          <br />
          입력해 주세요
        </Title>
        <Info>현재 보유 포인트 : {points.toLocaleString()}원</Info>
      </TitleBox>
      <InputWrapper>
        <InputAmout
          id="inputAmount"
          type="text"
          value={formattedValue}
          placeholder="금액"
          onChange={handleInput}
        ></InputAmout>
        <Unit htmlFor="inputAmount">원</Unit>
      </InputWrapper>
      <BtnWrap>
        <Btn bgColor={isDisabled ? colors.Grey : colors.LightBlue} handleBtn={handleWithdraw}>
          <PressMotion>
            <div style={{ width: '21.5rem' }}>출금하기</div>
          </PressMotion>
        </Btn>
      </BtnWrap>
    </Box>
  );
}
