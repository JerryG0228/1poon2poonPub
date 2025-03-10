import Btn from '@/components/Btn';
import PressMotion from '@/components/PressMotion';
import { colors } from '@/styles/colors';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22rem;
  font-weight: bold;
  padding: 0 1rem;
`;

const CategoryBox = styled.div``;
const Category = styled.div``;
const InputAmount = styled.input``;

export default function PyaMain() {
  const [bgColor, setBgColor] = useState(colors.Grey);

  return (
    <Box>
      <CategoryBox>
        <Category></Category>
      </CategoryBox>
      <InputAmount></InputAmount>
      <Link to="/">
        <Btn bgColor={bgColor} handleBtn={() => {}}>
          <PressMotion>결제 하기</PressMotion>
        </Btn>
      </Link>
    </Box>
  );
}
