import Btn from '@/components/Btn';
import CharacterBox from '@/components/CharacterBox';
import Guage from '@/components/Guage';
import PressMotion from '@/components/PressMotion';
import TitleBox from '@/components/TitleBox';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import DoveBadge from '@/assets/donatePage/DoveBadge.png';
import EarthBadge from '@/assets/donatePage/EarthBadge.png';
import BooksBadge from '@/assets/donatePage/BooksBadge.png';
import HosBadge from '@/assets/donatePage/HosBadge.png';

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

const BadgeBox = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1.3rem;
`;

const Badge = styled.img`
  border: none;
  padding: 0;
  cursor: pointer;
  width: 3.7rem;
  flex-basis: calc(25% - 1rem); //
`;

const Achive = [
  { badge: DoveBadge, page: 'dovePage' },
  { badge: EarthBadge, page: 'EarthPage' },
  { badge: BooksBadge, page: 'EarthPage' },
  { badge: HosBadge, page: 'EarthPage' },
  { badge: HosBadge, page: 'EarthPage' },
  { badge: HosBadge, page: 'EarthPage' },
];

export default function DonateHome() {
  const [data, setData] = useState<any>({}); // 전달 데이터

  const location = useLocation();

  useEffect(() => {
    setData(location.state.data);
  }, [location.state.data]);

  // data가 변경되었을 때, target, categoryImg, currentPrice를 안전하게 사용하기
  const target = data?.price || 0; // 목표 금액
  const categoryImg = data?.image || ''; // 기부 카테고리 이미지
  const currentPrice = data?.currentPrice || 0; // 현재 기부 금액

  const handleClick = () => {};

  return (
    <Box>
      <TitleWrapper>
        <DonationTitle>지금까지 기부한 금액</DonationTitle>
        <TotalWrapper>
          <TotalDonation>100,000</TotalDonation>
          <Unit>원</Unit>
        </TotalWrapper>
      </TitleWrapper>
      {categoryImg && <SelectCatgegory src={categoryImg} alt="기부 카테고리" />}
      <CharacterBox currDonate={currentPrice} targetDonate={target}></CharacterBox>
      <Guage currDonate={currentPrice} targetDonate={target}></Guage>
      <Link to="/donate" state={{ data }}>
        <Btn bgColor={'#313845'} handleBtn={() => {}}>
          <PressMotion>
            <div style={{ width: '20.5rem' }}>기부 포인트 교환</div>
          </PressMotion>
        </Btn>
      </Link>
      <TitleBox title="기부 뱃지">
        <BadgeBox>
          {Achive.map((item) => {
            return <Badge src={item.badge} alt="클릭 가능 이미지"></Badge>;
          })}
        </BadgeBox>
      </TitleBox>
      <div style={{ marginTop: '1rem' }}></div>
    </Box>
  );
}
