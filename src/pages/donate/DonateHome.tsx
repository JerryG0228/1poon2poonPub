import Btn from '@/components/Btn';
import CharacterBox from '@/components/CharacterBox';
import Guage from '@/components/Guage';
import PressMotion from '@/components/PressMotion';
import TitleBox from '@/components/TitleBox';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import DoveBadge from '@/assets/donatePage/DoveBadge.png';
import EarthBadge from '@/assets/donatePage/EarthBadge.png';
import BooksBadge from '@/assets/donatePage/BooksBadge.png';
import HosBadge from '@/assets/donatePage/HosBadge.png';
import EarthPage from '@/assets/donatePage/EarthPage.png';
import BooksPage from '@/assets/donatePage/BooksPage.png';
import HosPage from '@/assets/donatePage/HosPage.png';
import DovePage from '@/assets/donatePage/DovePage.png';
import styled, { keyframes } from 'styled-components';
import PoonStapm from '@/assets/donatePage/PoonStamp.png';
import { FaXmark } from 'react-icons/fa6';

const TiltIn = keyframes`
  0% {
    -webkit-transform: rotateY(30deg) translateY(-300px) skewY(-30deg);
            transform: rotateY(30deg) translateY(-300px) skewY(-30deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateY(0deg) translateY(0) skewY(0deg);
            transform: rotateY(0deg) translateY(0) skewY(0deg);
    opacity: 1;
  }
`;

const FadeOut = keyframes`
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-1000px);
            transform: translateY(-1000px);
    opacity: 0;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const MainTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DonationTitle = styled.div`
  font-size: 1rem;
  color: #c5c5c5;
`;

const CategoryName = styled.div`
  font-size: 0.8rem;
  color: #c5c5c5;
`;

const SubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5rem;
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

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const CategoryTitle = styled.div`
  font-size: 0.9rem;
  color: white;
`;

const SelectCatgegory = styled.img`
  width: 1.2rem;
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

const ModalWrapper = styled.div<{ isOpen: boolean }>`
  color: black;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

const ModalButton = styled.button`
  position: relative;
  top: -18rem; /* 왼쪽 위에 배치 */
  left: 20.3rem;
  background-color: transparent;
  color: white;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
`;

const ModalContent = styled.div<{ certSrc: URL }>`
  position: relative; /* 부모 div에 상대 위치 설정 */
  right: 0.8rem;
  border-radius: 3px;
  width: 21rem;
  height: 30rem;
  text-align: center;
  background-image: ${(props) =>
    props.certSrc ? `url(${props.certSrc})` : `url(${DovePage})`}; /* 기본 이미지로 DovePage 사용 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.4rem;
  width: 15rem;
  font-size: 0.8rem;
  font-weight: 500;
`;

const CertTitle = styled.div`
  font-size: 1.7rem;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 10rem;
  font-size: 0.7rem;
`;
const Content = styled.div`
  line-height: 1.5rem;
`;
const DayInfo = styled.div`
  font-size: 0.7rem;
`;
const Footer = styled.div`
  font-size: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StampImg = styled.img`
  width: 1.2rem;
`;

const Achive = [
  { badge: DoveBadge, page: DovePage },
  { badge: EarthBadge, page: EarthPage },
  { badge: BooksBadge, page: BooksPage },
  { badge: HosBadge, page: HosPage },
  { badge: HosBadge, page: HosPage },
  { badge: HosBadge, page: HosPage },
];

export default function DonateHome() {
  const [data, setData] = useState<any>({}); // 전달 데이터
  const [isOpen, setIsOpen] = useState(false);
  const [selectBadge, setSelectBadge] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    setData(location.state.data);
  }, [location.state.data]);

  // data가 변경되었을 때, target, categoryImg, currentPrice를 안전하게 사용하기
  const target = data?.price || 0; // 목표 금액
  const categoryImg = data?.image || ''; // 기부 카테고리 이미지
  const currentPrice = data?.currentPrice || 0; // 현재 기부 금액

  const handleClick = (item: any) => {
    setSelectBadge(item);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);
  const badgePage = selectBadge?.page || DovePage;

  return (
    <Box>
      <TitleWrapper>
        <MainTitle>
          <DonationTitle>지금까지 기부한 금액</DonationTitle>
          <CategoryName>카테고리</CategoryName>
        </MainTitle>
        <SubTitle>
          <TotalWrapper>
            <TotalDonation>100,000</TotalDonation>
            <Unit>원</Unit>
          </TotalWrapper>
          <CategoryWrapper>
            <CategoryTitle>교육 인권</CategoryTitle>
            <SelectCatgegory src={categoryImg} alt="기부 카테고리" />
          </CategoryWrapper>
        </SubTitle>
      </TitleWrapper>
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
            return (
              <Badge
                src={item.badge}
                alt="클릭 가능 이미지"
                onClick={() => handleClick(item)}
              ></Badge>
            );
          })}
        </BadgeBox>
      </TitleBox>
      <div style={{ marginTop: '1rem' }}></div>
      <ModalWrapper isOpen={isOpen}>
        <ModalButton onClick={closeModal}>
          <FaXmark />
        </ModalButton>
        <ModalContent certSrc={badgePage}>
          <CertWrapper>
            <CertTitle>기 부 증 서</CertTitle>
            <InfoBox>
              <hr />
              이름 기부자님 <br />
              카테고리
              <br /> 기부금: 금액
              <hr />
            </InfoBox>
            <Content>
              따뜻한 마음으로 보내주신 기부금은 <br />
              소외된 이웃과 어려운 가정을 돕고
              <br /> 누구나 행복한 사회를 만들기 위해 사용됩니다.
              <br /> 이에 깊은 존경과 감사의 마음을 담아
              <br /> 이 증서를 드립니다.
            </Content>
            <DayInfo>2025년 03월 18일</DayInfo>
            <Footer>
              토스뱅크X한국경제신문 <b style={{ marginLeft: '0.3rem' }}>한 푼 두 푼</b>{' '}
              <StampImg src={PoonStapm}></StampImg>
            </Footer>
          </CertWrapper>
        </ModalContent>
      </ModalWrapper>
    </Box>
  );
}
