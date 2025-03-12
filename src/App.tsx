import { useRoutes } from 'react-router-dom';
import routes from '@/Routes';
import useTransitionSelect from '@/hooks/useTransitionSelect';
import Transitions from '@/components/Transitions';

const App = () => {
  const content = useRoutes(routes, location);
  const transition = useTransitionSelect();
  console.log('transition1: ', transition);

  return (
    <Transitions pageKey={location.pathname} transition={transition}>
      <>{content}</>
    </Transitions>
  );
};

export default App;
