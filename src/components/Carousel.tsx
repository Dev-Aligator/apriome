import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/Carousel.sass';
import { weathering_with_you, overlord, slime, mirai } from '../assets/anime-posters';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';

const Carousel = () => {
  const hotAnimeList = [
    {
      name: "Weathering With You",
      year: "2019",
      poster: weathering_with_you, 
    },
    {
      name: "Overlord",
      year: "2015",
      poster: overlord,
    },
    {
      name: "That Time I Got Reincarnated as a Slime",
      year: "2018",
      poster: slime,
    },
    {
      name: "Mirai",
      year: "2018",
      poster: mirai,
    }
  ];

  return (
  <div className="main-carousel-container">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          // clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {hotAnimeList.map((anime, index) => (
          <SwiperSlide key={index}>
            <img src={anime.poster} alt={anime.name + anime.year}/>
          </SwiperSlide>
        ))}
        
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <HiArrowLeft color="#222222" size={25}/>
          </div>
          <div className="swiper-button-next slider-arrow">
            <HiArrowRight color="#222222" size={25}/>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  )
}


export default Carousel;
