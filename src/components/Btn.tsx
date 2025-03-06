import styled from 'styled-components';

const Wrapper = styled.div<{ bgColor: string }>`
  all: unset;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 0.5rem 0.5rem;

  width: fit-content;
  border-radius: 1rem;

  background-color: ${(props) => props.bgColor};
`;

interface Props {
  children: React.ReactNode;
  bgColor: string;
  handleBtn: () => void;
}

export default function Btn({ children, bgColor, handleBtn }: Props) {
  return (
    <Wrapper bgColor={bgColor} onClick={handleBtn}>
      {children}
    </Wrapper>
  );
}
