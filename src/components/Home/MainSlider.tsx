import { ProductType } from '@/interfaces/inretfaces';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// import required modules
import { IMAGES } from '@/config/variable';

type Props = {
  slides: ProductType[];
};

const MainSlider = ({ slides }: Props) => {
  return (
    <div className="relative w-full h-[30rem]">
      <Swiper slidesPerView={1} spaceBetween={30} loop={true} autoplay={true}>
        {slides.map((slide: ProductType) => (
          <SwiperSlide key={slide._id}>
            <img src={IMAGES + slide.images[0]} className="object-contain" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute top-0 z-20 w-full h-full bg-links/30"></div>
    </div>
  );
};

export default MainSlider;
