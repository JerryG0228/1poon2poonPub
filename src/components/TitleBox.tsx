import { colors } from '@/styles/colors';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #313845;
  border-radius: 1rem;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const WrapperTitle = styled.div`
  color: ${colors.White};
  font-size: 1.2rem;
  font-weight: bold;
`;

type TitleBoxProps = {
  title: string;
  children: React.ReactNode;
};

export default function TitleBox({ title, children }: TitleBoxProps) {
  return (
    <>
      <Wrapper>
        <WrapperTitle>{title}</WrapperTitle>
        {children}
      </Wrapper>
    </>
  );
}
