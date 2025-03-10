import baseAxios from '@/apis/axiosInstance';
import Btn from '@/components/Btn';
import PressMotion from '@/components/PressMotion';
import TitleBox from '@/components/TitleBox';
import useStore from '@/store/User';
import { colors } from '@/styles/colors';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22rem;
  font-weight: bold;
  padding: 0 1rem;
`;

const DonateBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  font-size: 1.5rem;
`;

const DonateInput = styled.input<{ show: number }>`
  font-weight: bold;
  font-size: 1.7rem;
  background-color: transparent;
  border: none;
  color: ${(props) => (props.show ? 'white' : colors.Grey)};

  &:focus {
    outline: none;
    color: white;
  }
`;

const PointBalance = styled.div`
  font-size: 0.8rem;
  color: ${colors.Grey};
`;

export default function Donate() {
  const { points, goalDonations, currentDonations, username, updateCurrentDonations, setPoints } =
    useStore();
  const [value, setValue] = useState<number>(0); // 기부 할 금액 입력
  const [data, setData] = useState<{ name: string; amount: number }>({ name: username, amount: 0 });
  const [bgColor, setBgColor] = useState(colors.Grey);

  const remainAmount = goalDonations - currentDonations;

  //input onChange 핸들러
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let amount: number = Number(event.target.value); // 입력값을 숫자로 변환

    const maxAmount = Math.min(remainAmount, points);
    if (points === 0) {
      alert('포인트가 없습니다.');
      setValue(0); // 입력값을 초기화
      setData({ name: username, amount: 0 }); // 데이터 초기화
      event.preventDefault(); // 기본 입력 동작을 방지하여 더 이상 입력이 안 되도록
      return; // 더 이상 실행되지 않도록 early return
    }
    if (amount > maxAmount) {
      amount = maxAmount; // 초과시 최대값으로 설정
    }
    setValue(amount > 0 ? amount : 0); // 0보다 크면 저장, 아니면 null

    setData({ name: username, amount: amount });
  };

  const fetchData = async () => {
    console.log('data: ', data);

    await baseAxios
      .post('/donate/donation', data)
      .then(() => {
        updateCurrentDonations(data.amount);
        setPoints(data.amount, '기부');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    setBgColor(value == null ? colors.Grey : colors.LightBlue);
  }, [value]); // selectedCategory가 변경될 때마다 실행

  return (
    <Box>
      <DonateBox>
        <TitleBox title="목표 금액까지 남은 금액">
          {remainAmount.toLocaleString()}원<div></div>
        </TitleBox>
        <TitleBox title="기부 금액">
          <DonateInput
            disabled={points == 0}
            show={value}
            type="number"
            placeholder="기부 금액을 입력해 주세요"
            value={value === 0 ? '' : value}
            onChange={handleInput}
          ></DonateInput>
          <PointBalance>보유 포인트 {points}원</PointBalance>
        </TitleBox>
      </DonateBox>
      <Link to="/donateHome">
        <Btn bgColor={bgColor} handleBtn={fetchData}>
          <PressMotion>
            <div style={{ width: '21.3rem' }}>기부 하기</div>
          </PressMotion>
        </Btn>
      </Link>
    </Box>
  );
}
