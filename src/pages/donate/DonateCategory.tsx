import CategoryBox from '@/components/CategoryBox';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Btn from '@/components/Btn';
import { colors } from '@/styles/colors';
import PressMotion from '@/components/PressMotion';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  gap: 0.6rem;
  margin-top: 1.5rem;
`;

const Title = styled.div`
  font-size: 2rem;
`;

const Info = styled.div`
  font-size: 0.8rem;
  color: #c5c5c5;
`;

const DonateCategoryBox = styled.div`
  display: grid;
`;

export default function DonateCategory() {
  return (
    <Box>
      <Title>
        기부 카테고리를
        <br /> 선택해주세요
      </Title>
      <Info>최대 1개 선택 가능</Info>
      <DonateCategoryBox>11</DonateCategoryBox>
      <Link to="/donateGoal">
        <Btn bgColor={colors.LightBlue} handleBtn={() => {}}>
          <PressMotion>
            <div style={{ width: '20.5rem' }}>다음</div>
          </PressMotion>
        </Btn>
      </Link>
    </Box>
  );
}
