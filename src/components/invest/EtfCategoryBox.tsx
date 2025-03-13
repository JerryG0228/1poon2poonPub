import { colors } from '@/styles/colors';
import styled from 'styled-components';

const Wrapper = styled.div<{ $active: boolean }>`
  // "$active"로 변경하여 DOM 전달 방지!
  display: flex;
  flex-direction: row;
  opacity: ${({ $active }) => ($active ? 1.0 : 0.5)};
  cursor: pointer; // 클릭 가능하게 변경!
  transition: opacity 0.3s;
  margin-bottom: 0.3rem;
`;

const ImageWrapper = styled.div`
  display: flex;
  background-color: #313845;
  padding: 0.5rem;
  border-radius: 0.5rem;
`;

const ContentImg = styled.img`
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
`;

const TitleBox = styled.div`
  margin-left: 1rem;
`;

const ContentTitle = styled.div`
  display: flex;
  font-size: 1.02rem;
  color: ${colors.White};
  margin: 0.5rem 0;
  font-weight: bold;
  text-align: center;
`;

interface Props {
  title: string;
  imageSrc: string;
  active: boolean;
  onClick: () => void; // 클릭 이벤트 추가!
}

export default function EtfCategoryBox({ title, imageSrc, active, onClick }: Props) {
  return (
    <>
      <Wrapper $active={active} onClick={onClick}>
        <ImageWrapper>
          <ContentImg src={imageSrc} alt={title} />
        </ImageWrapper>
        <TitleBox>
          <ContentTitle>{title}</ContentTitle>
        </TitleBox>
      </Wrapper>
    </>
  );
}
