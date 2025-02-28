import CategoryBox from '@/components/CategoryBox';
import styled from 'styled-components';

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
      <DonateCategoryBox>
        <CategoryBox title={} acitve={}></CategoryBox>
      </DonateCategoryBox>
    </Box>
  );
}
