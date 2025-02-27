import CategoryBox from '@/components/CategoryBox';
import styled from 'styled-components';

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export default function Main() {
  return (
    <Wrap>
      <CategoryBox title={'교육·문화'}></CategoryBox>
      <CategoryBox title={'공익·인권'}></CategoryBox>
      <CategoryBox title={'사회적 가치 & ESG 투자'}></CategoryBox>
    </Wrap>
  );
}
