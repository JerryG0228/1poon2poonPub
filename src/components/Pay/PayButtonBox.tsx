import { colors } from '@/styles/colors';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: rgb(238, 238, 238);
  border-radius: 1rem;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
`;

const WrapperTitle = styled.div`
  color: ${colors.White};
  font-size: 1.2rem;
  font-weight: 600;
`;

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function PayButtonBox({ title, children }: Props) {
  return (
    <>
      <Wrapper>
        <WrapperTitle>{title}</WrapperTitle>
        {children}
      </Wrapper>
    </>
  );
}
