import { useLocation } from 'react-router-dom';

export default function DonateHome() {
  const location = useLocation();
  console.log(location.state.data);

  return <div></div>;
}
