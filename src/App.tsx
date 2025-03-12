import { useRoutes } from 'react-router-dom';
import routes from '@/Routes';

const App = () => {
  const content = useRoutes(routes, location);

  return <>{content}</>;
};

export default App;
