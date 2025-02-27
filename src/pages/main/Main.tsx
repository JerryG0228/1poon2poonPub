import StampBox from '@/components/StampBox';
import BusIcon from '@/assets/main/BusIcon.png';
import { useState } from 'react';

export default function Main() {
  const [title, setTitle] = useState('대중교통');
  const [img, setImg] = useState(BusIcon);
  return (
    <div>
      Main
      <StampBox icon={img} title={title}></StampBox>
    </div>
  );
}
