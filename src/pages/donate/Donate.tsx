import Btn from '@/components/Btn';
import PressMotion from '@/components/PressMotion';
import TitleBox from '@/components/TitleBox';
import { colors } from '@/styles/colors';
import { SetStateAction, useState } from 'react';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22rem;
  font-weight: bold;
`;

const DonateBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  font-size: 1.5rem;
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

const PointBalance = styled.div`
  font-size: 0.8rem;
  color: ${colors.Grey};
`;

export default function Donate() {
  const [value, setValue] = useState('');

  return (
    <Box>
      <DonateBox>
        <TitleBox title="목표 금액까지 남은 금액">
          50,000원
          <div></div>
        </TitleBox>
        <TitleBox title="기부 금액">
          <DonateInput
            show={value}
            type="number"
            placeholder="기부 금액을 입력해 주세요"
            value={value}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setValue(e.target.value)
            }
          ></DonateInput>

          <PointBalance>보유 포인트 250,000원</PointBalance>
        </TitleBox>
      </DonateBox>
      <Btn bgColor={colors.Blue} handleBtn={() => {}}>
        <PressMotion>
          <div style={{ width: '20.5rem' }}>기부 하기</div>
        </PressMotion>
      </Btn>
    </Box>
  );
}
