import styled from 'styled-components';

//전체 감싸는 박스
const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  width: 2rem;
`;
//이미지 감싸는 박스
const ImageBox = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgColor || 'transparent'};
  border-radius: 0.3rem;
  padding: 0.4rem 0.3rem 0.3rem;
  width: 2rem;
  height: 2rem;
`;
//이미지
const Icon = styled.img`
  width: 1.2rem;
  height: 1rem;
`;
//영역 제목
const Title = styled.div`
  font-size: 0.5rem;
`;

interface Props {
  icon: string;
  title: string;
  bgColor: string;
}

function StampBox({ icon, title, bgColor }: Props) {
  return (
    <Box>
      <ImageBox bgColor={bgColor}>
        <Icon src={icon}></Icon>
      </ImageBox>
      <Title>{title}</Title>
    </Box>
  );
}

export default StampBox;
