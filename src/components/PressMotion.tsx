import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
}

const StyledMotion = styled(motion.div)`
  width: fit-content;
  padding: 0.5rem 0;
  border-radius: 0.5rem;
`;

export default function PressMotion({ children }: Props) {
  return (
    <StyledMotion
      whileTap={{
        scale: 0.95,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      }}
    >
      {children}
    </StyledMotion>
  );
}
