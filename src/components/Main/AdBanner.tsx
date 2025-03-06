import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import adImage1 from '@/assets/banner1.png';
import adImage2 from '@/assets/banner2.png';

const SliderContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const SlideItem = styled.div`
  width: 23rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  border-radius: 1rem;
  margin-right: 10px;
  > img {
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
    <SliderContainer>
      <Slider {...settings}>
        <SlideItem>
          <img src={adImage1} alt="배너 이미지1" />
        </SlideItem>
        <SlideItem>
          <img src={adImage2} alt="배너 이미지2" />
        </SlideItem>
      </Slider>
    </SliderContainer>
  );
}

export default AutoPlaySlider;
