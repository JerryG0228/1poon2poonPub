import StampBox from '@/components/StampBox';
import BusIcon from '@/assets/main/BusIcon.png';
import { useState } from 'react';

export default function Main() {
  const [title, setTitle] = useState<string>('대중교통');
  const [img, setImg] = useState<string>(BusIcon);
  const [bgColor, setBgColor] = useState<string>('#6e5230');
  return (
    <div>
      Main
      <StampBox icon={img} title={title} bgColor={bgColor}></StampBox>
    </div>
  );
}
