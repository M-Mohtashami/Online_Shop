import { ProductType } from '@/interfaces/inretfaces';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
// import required modules
import { IMAGES } from '@/config/variable';
import { Autoplay, EffectFade } from 'swiper';
import Button from '../shared_components/Button';
import { classNames } from '@/utils';

type Props = {
  slides: ProductType[];
};

const colors = [
  {
    bg: 'bg-[#645CBB]',
    from: 'from-[#A084DC]',
  },
  {
    bg: 'bg-[#4A55A2]',
    from: 'from-[#7895CB]',
  },
  {
    bg: 'bg-[#6527BE]',
    from: 'from-[#9681EB]',
  },
  {
    bg: 'bg-[#FF2171]',
    from: 'from-[#FF90BB]',
  },
];

const MainSlider = ({ slides }: Props) => {
  return (
    <div className="relative w-full h-[30rem] rounded-lg shadow-md overflow-hidden">
      <Swiper
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        speed={1500}
        autoplay={{ delay: 5000 }}
        modules={[Autoplay, EffectFade]}
        className="main-slider"
      >
        {slides.map((slide: ProductType, idx) => (
          <SwiperSlide key={slide._id}>
            {/* <img src={IMAGES + slide.images[0]} className="object-contain" /> */}
            <div
              className={classNames(
                'w-full h-full bg-gradient-to-r ',
                colors[idx].bg,
                colors[idx].from
              )}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
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
