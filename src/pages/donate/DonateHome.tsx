import Btn from '@/components/Btn';
import CharacterBox from '@/components/CharacterBox';
import Guage from '@/components/Guage';
import PressMotion from '@/components/PressMotion';
import TitleBox from '@/components/TitleBox';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const DonationTitle = styled.div`
  font-size: 1rem;
  color: #c5c5c5;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const TotalWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const TotalDonation = styled.div`
  font-size: 2rem;
`;

const Unit = styled.div`
  font-size: 1.2rem;
  align-items: flex-end;
  margin-top: 0.3rem;
`;

const SelectCatgegory = styled.img`
  width: 1.5rem;
  margin-bottom: 3.5rem;
`;

export default function DonateHome() {
  const location = useLocation();
  const target = location.state.data.price;
  const categoryImg = location.state.data.image;

  const handleBtn = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // 카테고리를 선택하지 않으면 다음으로 넘어가지 않음.
    if (true) {
      event.preventDefault();
      alert('기부 할 카테고리를 선택해 주세요!');
    }
  };

  return (
    <Box>
      <TitleWrapper>
        <DonationTitle>지금까지 기부한 금액</DonationTitle>
        <TotalWrapper>
          <TotalDonation>100,000</TotalDonation>
          <Unit>원</Unit>
        </TotalWrapper>
      </TitleWrapper>
      <SelectCatgegory src={categoryImg}></SelectCatgegory>
      <CharacterBox currDonate={40000} targetDonate={target}></CharacterBox>

      <Guage currDonate={10000} targetDonate={target}></Guage>
      <Link to="/donateGoal" state={{}} onClick={handleBtn}>
        <Btn bgColor={'#313845'} handleBtn={() => {}}>
          <PressMotion>
            <div style={{ width: '20.5rem' }}>기부 포인트 교환</div>
          </PressMotion>
        </Btn>
      </Link>
      <TitleBox title="기부 뱃지">1</TitleBox>
    </Box>
  );
}
