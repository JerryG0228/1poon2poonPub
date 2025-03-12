import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

const TransitionContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

interface TransitionProps {
  transition: string;
  pageKey: string;
  children: React.ReactNode;
}

// const childFactoryCreator = (props: { classNames: string }) => (child: React.ReactElement) =>
//   React.cloneElement(child, props);

const Transitions: React.FC<TransitionProps> = ({ transition, pageKey, children }) => {
  const nodeRef = React.useRef<HTMLDivElement>(null);

  console.log('transition2:', transition);

  return (
    <TransitionGroup className="transitions-group">
      <CSSTransition key={pageKey} timeout={500} nodeRef={nodeRef} classNames={transition}>
        <div ref={nodeRef}>{children}</div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Transitions;
