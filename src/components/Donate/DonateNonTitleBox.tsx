import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #313845;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

type TitleBoxProps = {
  children: React.ReactNode;
};

export default function DonateNonTitleBox({ children }: TitleBoxProps) {
  return (
    <>
      <Wrapper>{children}</Wrapper>
    </>
  );
}
