import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #313845;
  border-radius: 1rem;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

type TitleBoxProps = {
  children: React.ReactNode;
};

export default function NonTitleBox({ children }: TitleBoxProps) {
  return (
    <>
      <Wrapper>{children}</Wrapper>
    </>
  );
}
