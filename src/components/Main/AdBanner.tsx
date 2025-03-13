import Slider from 'react-slick';
import styled from 'styled-components';
import adImage1 from '@/assets/banner1.png';
import adImage2 from '@/assets/banner2.png';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
 /* 슬라이드 트랙 높이 강제 조정 */
  .slick-track {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    height: 5rem !important;  /* 강제로 슬라이드 높이 지정 */
  }

  /* slick-slide에서 이미지 크기, 정렬 조정 */
  .slick-slide {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }
`;

const SlideItem = styled.div`
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  border-radius: 1rem;
  margin-right: 1rem;

  > img {
    width: 22.5rem;
    height: 5rem;
    border-radius: 1rem;
  }
`;

function AutoPlaySlider() {
  const settings = {
    infinite: true,
    slidesToShow: 1, // 한 번에 보이는 슬라이드 개수 줄이기
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    cssEase: 'linear',
    arrows: false,
    variableWidth: true,
  };

  return (
    <>
      <GlobalStyles />
      <Slider {...settings}>
        <SlideItem>
          <img src={adImage1} alt="배너 이미지1" />
        </SlideItem>
        <SlideItem>
          <img src={adImage2} alt="배너 이미지2" />
        </SlideItem>
      </Slider>
    </>
  );
}

export default AutoPlaySlider;
