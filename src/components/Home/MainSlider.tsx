import { ProductType } from '@/interfaces/inretfaces';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// import required modules
import { IMAGES } from '@/config/variable';
import { Autoplay } from 'swiper';
import Button from '../shared_components/Button';

type Props = {
  slides: ProductType[];
};

const MainSlider = ({ slides }: Props) => {
  return (
    <div className="relative w-full h-[30rem]">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        speed={1500}
        autoplay={{ delay: 5000 }}
        modules={[Autoplay]}
        className="main-slider"
      >
        {slides.map((slide: ProductType) => (
          <SwiperSlide key={slide._id}>
            <img src={IMAGES + slide.images[0]} className="object-contain" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute top-0 z-20 w-full h-full bg-primary/50"></div>
      <div className="absolute top-0 left-0 z-30 w-full h-full flex items-center justify-around gap-6 ">
        <div className="p-4 max-w-lg h-96 overflow-hidden">
          <Swiper
            slidesPerView={1}
            spaceBetween={40}
            loop={true}
            speed={1500}
            autoplay={{ delay: 5000 }}
            modules={[Autoplay]}
            className="inner-content-swiper bg-transparent"
          >
            {slides.map((slide: ProductType) => (
              <SwiperSlide key={slide._id} className="bg-transparent">
                <div
                  className="h-full flex flex-col items-start justify-between my-3 gap-3"
                  dir="rtl"
                >
                  <h2 className="font-semibold text-2xl">{slide.name}</h2>
                  <div
                    className="text-right h-40 overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: slide.description }}
                  />
                  <div className="w-full p-4 text-right">
                    <Button
                      icon="addtocart"
                      type="button"
                      variant="contained"
                      iconClassName="w-5"
                      className="w-full max-w-[200px] hover:bg-white hover:text-primary bg-transparent border border-white text-white"
                    >
                      {'افزودن به سبد خرید'}
                    </Button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="hidden lg:flex p-4 w-80 bg-white h-96 overflow-hidden">
          <Swiper
            slidesPerView={1}
            spaceBetween={40}
            loop={true}
            speed={1500}
            autoplay={{ delay: 5000 }}
            modules={[Autoplay]}
            className="inner-swiper"
          >
            {slides.map((slide: ProductType) => (
              <SwiperSlide key={slide._id}>
                <div className="w-80 h-96 bg-white flex items-center justify-center">
                  <img src={IMAGES + slide.images[0]} className="w-full" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MainSlider;
