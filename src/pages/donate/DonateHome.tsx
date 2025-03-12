import Btn from '@/components/Btn';
import CharacterBox from '@/components/Donate/CharacterBox';
import Guage from '@/components/Donate/Guage';
import PressMotion from '@/components/PressMotion';
import TitleBox from '@/components/TitleBox';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EarthPage from '@/assets/donatePage/EarthPage.png';
import BooksPage from '@/assets/donatePage/BooksPage.png';
import HosPage from '@/assets/donatePage/HosPage.png';
import DovePage from '@/assets/donatePage/DovePage.png';
import HomePage from '@/assets/donatePage/HomePage.png';
import DogPage from '@/assets/donatePage/DogPage.png';
import styled, { keyframes } from 'styled-components';
import PoonStapm from '@/assets/donatePage/PoonStamp.png';
import { FaXmark } from 'react-icons/fa6';
import DonateNonTitleBox from '@/components/Donate/DonateNonTitleBox';
import wave from '@/assets/donatePage/wave.json';
import paper from '@/assets/donatePage/paper.json';
import feather from '@/assets/donatePage/feather.json';
import cloud from '@/assets/donatePage/cloud.json';
import beat from '@/assets/donatePage/beat.json';
import dog from '@/assets/donatePage/dog.json';
import booksImage from '@/assets/categorybox/books_image.png';
import doveImage from '@/assets/categorybox/dove_image.png';
import dogImage from '@/assets/categorybox/dog_image.png';
import earthImage from '@/assets/categorybox/earth_image.png';
import homeImage from '@/assets/categorybox/home_img.png';
import hospitalImage from '@/assets/categorybox/hospital_image.png';
import { colors } from '@/styles/colors';
import Lottie from 'lottie-react';
import useStore from '@/store/User';
import { aw } from 'framer-motion/dist/types.d-6pKw1mTI';
import baseAxios from '@/apis/axiosInstance';

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  gap: 1.5rem;
  margin-top: 1.5rem;
  padding: 0 1rem;
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
  font-size: 1rem;
  color: #c5c5c5;
`;

const SubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  gap: 0.5rem;
`;

const CategoryTitle = styled.div`
  font-size: 1.2rem;
  color: white;
`;

const SelectCatgegory = styled.img`
  width: 1.3rem;
`;

const BadgeBox = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4개의 열을 균등하게 설정 */
  justify-items: center; /* 항목들을 가로로 중앙 정렬 */
  align-items: center; /* 항목들을 세로로 중앙 정렬 */
  gap: 1rem;
`;

const Badge = styled.img`
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  width: 4rem;
`;

const ModalWrapper = styled.div<{ isOpen: boolean }>`
  color: black;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  z-index: 2;
  animation: ${FadeIn} 0.5s ease-in-out;
`;

const ModalButton = styled.button`
  margin-left: 19rem;
  background-color: transparent;
  color: white;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
`;

const ModalContent = styled.div<{ certSrc: URL }>`
  position: relative; /* 부모 div에 상대 위치 설정 */

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

const ModalContentWrapper = styled.div`
  position: relative; /* Lottie를 absolute로 띄우기 위한 기준 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLottie = styled(Lottie)`
  position: absolute;
  top: 23rem; /* 모달 콘텐츠 위로 이동 */
  left: 13rem;
  width: 8rem;
  height: 8rem;
  z-index: 3; /* 모달 콘텐츠보다 위에 배치 */
`;

const Achive: Record<string, string> = {
  '교육 문화': BooksPage,
  '공익 인권': DovePage,
  '국제 구호': EarthPage,
  '사회 복지': HomePage,
  '의료 건강': HosPage,
  '환경 동물': DogPage,
};

// 기부중인 카테고리 이미지 주소 매핑
const categoryList: Record<string, string> = {
  '교육 문화': booksImage,
  '공익 인권': doveImage,
  '국제 구호': earthImage,
  '사회 복지': homeImage,
  '의료 건강': hospitalImage,
  '환경 동물': dogImage,
};

const Animation: Record<string, string> = {
  dog: dog,
  feather: feather,
  cloud: cloud,
  wave: wave,
  beat: beat,
  paper: paper,
};

export default function DonateHome() {
  const { totalDonations, goalDonations, currentDonations, goalCategory, badges, pointHistory } =
    useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectBadge, setSelectBadge] = useState<any>(null);

  // 기부중인 카테고리 이미지 매핑
  const categoryImg = categoryList[goalCategory];
  console.log(pointHistory);
  const handleClick = (item: any) => {
    setSelectBadge(item);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);
  const badgePage = Achive[selectBadge?.badge] || DovePage;

  const link =
    goalDonations == 0
      ? '/donatecategory'
      : currentDonations == goalDonations
        ? '/donatecomplete'
        : '/donate';

  const info =
    goalDonations == 0
      ? '카테고리 선택하러 가기'
      : currentDonations == goalDonations
        ? '기부 하러 가기'
        : '기부 포인트 채우기';

  return (
    <Box>
      <TitleWrapper>
        <MainTitle>
          <DonationTitle>지금까지 기부한 금액</DonationTitle>
          <CategoryName>카테고리</CategoryName>
        </MainTitle>
        <SubTitle>
          <TotalWrapper>
            <TotalDonation>{totalDonations.toLocaleString()}</TotalDonation>
            <Unit>원</Unit>
          </TotalWrapper>
          <CategoryWrapper>
            {goalCategory == '' || goalCategory == 'none' ? (
              <div>카테고리 미선택</div>
            ) : (
              <>
                <CategoryTitle>{goalCategory}</CategoryTitle>{' '}
                <SelectCatgegory src={categoryImg} alt="기부 카테고리" />
              </>
            )}
          </CategoryWrapper>
        </SubTitle>
      </TitleWrapper>
      <CharacterBox currDonate={currentDonations} targetDonate={goalDonations}></CharacterBox>
      <DonateNonTitleBox>
        <Guage currDonate={currentDonations} targetDonate={goalDonations}></Guage>

        <Link to={link}>
          <Btn bgColor={colors.Navy} handleBtn={() => {}}>
            <PressMotion>
              <div style={{ width: '19rem' }}>{info}</div>
            </PressMotion>
          </Btn>
        </Link>
      </DonateNonTitleBox>

      <TitleBox title="기부 뱃지">
        <BadgeBox>
          {badges &&
            badges.map((item) => {
              return (
                <Badge
                  key={item._id.$oid}
                  src={categoryList[item.badge]}
                  alt="클릭 가능 이미지"
                  onClick={() => handleClick(item)}
                ></Badge>
              );
            })}
        </BadgeBox>
      </TitleBox>
      <div style={{ marginTop: '1rem' }}></div>
      {isOpen && (
        <ModalWrapper isOpen={isOpen}>
          <ModalButton onClick={closeModal}>
            <FaXmark />
          </ModalButton>
          <ModalContentWrapper>
            <ModalContent certSrc={badgePage}>
              <CertWrapper>
                <div style={{ display: 'flex' }}>
                  <CertTitle>기 부 증 서</CertTitle>
                  <StyledLottie
                    animationData={Animation[selectBadge.donateInfo.animation]}
                    loop={true}
                  ></StyledLottie>
                </div>
                <InfoBox>
                  <hr />
                  {selectBadge.donateInfo.username} 기부자님 <br />
                  {selectBadge.badge}
                  <br /> 기부금 {selectBadge.donateInfo.donateAmount.toLocaleString()}원
                  <hr />
                </InfoBox>
                <Content>{selectBadge.donateInfo.content}</Content>
                <DayInfo>{selectBadge.donateInfo.day}</DayInfo>
                <Footer>
                  토스뱅크X한국경제신문 <b style={{ marginLeft: '0.3rem' }}>한 푼 두 푼</b>{' '}
                  <StampImg src={PoonStapm}></StampImg>
                </Footer>
              </CertWrapper>
            </ModalContent>
          </ModalContentWrapper>
        </ModalWrapper>
      )}
    </Box>
  );
}
