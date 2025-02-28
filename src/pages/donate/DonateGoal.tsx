import Btn from '@/components/Btn';
import PressMotion from '@/components/PressMotion';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '@/styles/colors';
import { HtmlHTMLAttributes, useState } from 'react';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  margin-top: 1.5rem;
  font-weight: bold;
`;

const Title = styled.div`
  font-size: 2rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 19.45rem;
`;

const InputAmout = styled.input<{ hasValue: Boolean }>`
  font-size: 1.55rem;
  border: none;
  border-bottom: ${(props) =>
    props.hasValue ? `1px solid ${colors.Blue}` : `1px solid ${colors.Grey}`};
  color: ${(props) => (props.hasValue ? 'white' : colors.Grey)};
  background-color: transparent;
  padding: 0.7rem 2rem 0.7rem 0.3rem;
  width: 100%;
  font-weight: bold;
  /* 기본 포커스 아웃라인 제거 */
  &:focus {
    outline: none;
  }
`;
//input 끝에 '원' 글자 고정
const Unit = styled.span<{ hasValue: Boolean }>`
  position: absolute;
  right: 0.5rem;
  bottom: 0.7rem;
  font-size: 1.55rem;
  color: ${(props) => (props.hasValue ? 'white' : colors.Grey)};
`;

export default function DonateGoal() {
  const [price, setPrice] = useState<number | null>(null);

  const location = useLocation();
  console.log(location);

  // 다음 버튼 클릭 핸들러
  const handleBtn = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // 카테고리를 선택하지 않으면 다음으로 넘어가지 않음.
    if (true) {
      event.preventDefault();
      alert('기부 목표 금액을을 설정해 주세요!');
    }
  };

  //input onChange 핸들러러
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value); // 입력값을 숫자로 변환
    setPrice(value > 0 ? value : null); // 0보다 크면 저장, 아니면 null
  };

  return (
    <Box>
      <Title>
        기부 목표 금액을
        <br />
        설정해주세요
      </Title>
      <InputWrapper>
        <InputAmout
          type="number"
          value={price}
          placeholder="금액"
          onChange={handleInput}
          hasValue={Boolean(price)}
        ></InputAmout>
        <Unit hasValue={Boolean(price)}>원</Unit>
      </InputWrapper>
      <Link to="/donateGoal" state={{}} onClick={handleBtn}>
        <Btn bgColor={colors.LightBlue} handleBtn={() => {}}>
          <PressMotion>
            <div style={{ width: '20.5rem' }}>설정하기</div>
          </PressMotion>
        </Btn>
      </Link>
    </Box>
  );
}
