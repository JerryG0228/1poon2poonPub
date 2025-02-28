import { colors } from '@/styles/colors';
import styled from 'styled-components';
import buildingImage from '@/assets/categorybox/building_image.png';
import computerImage from '@/assets/categorybox/computer_image.png';
import moneyImage from '@/assets/categorybox/money_image.png';
import shoppingImage from '@/assets/categorybox/shopping_image.png';

const Wrapper = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.active ? 1.0 : 0.5)};
`;

const ImageWrapper = styled.div`
  display: flex;
  background-color: #313845;
  padding: 2rem;
  border-radius: 1rem;
`;
const ContentImg = styled.img`
  display: flex;
  width: 2.7rem;
  height: 2.7rem;
`;

const TitleBox = styled.div`
  width: 6rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentTitle = styled.div`
  display: flex;
  font-size: 1rem;
  color: ${colors.White};
  margin: 0.5rem 0;
  text-align: center;
`;

const categoryImages = {
  //기부 카테고리

  //투자 카테고리
  '기술 & AI 관련': computerImage,
  '금융 & 경제 성장 관련': moneyImage,
  // '사회적 가치 & ESG 투자': earthImage,
  // '헬스케어 & 바이오': hospitalImage,
  '리츠 & 인프라': buildingImage,
  '소비 & 리테일': shoppingImage,
};

// type CategoryBoxProps = {
//   title: string;
// };

interface Props {
  title: string;
  imageSrc: string;
  active: boolean;
  onClick: () => void;
}

export default function CategoryBox({ title, imageSrc, active, onClick }: Props) {
  //title이 categoryImages의 키 값들 중 하나라는 것을 명확하게 명시

  return (
    <>
      <Wrapper active={active} onClick={onClick}>
        <ImageWrapper>
          <ContentImg src={imageSrc} />
        </ImageWrapper>
        <TitleBox>
          <ContentTitle>{title}</ContentTitle>
        </TitleBox>
      </Wrapper>
    </>
  );
}
