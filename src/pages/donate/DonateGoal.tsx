import { useLocation } from 'react-router-dom';

export default function DonateGoal({ props }) {
  const location = useLocation();
  console.log(location);
  return <div></div>;
}
