import getAllCategoryService from '@/api/services/category/getAllCategoryService';
import getAllSubCategoryService from '@/api/services/category/getAllSubCategoryService';
import getAllProductsSevices from '@/api/services/product/getAllProductsServices';
import Card from '@/components/Products/Card';
import {
  CategoryType,
  NextPageWithLayout,
  ProductType,
} from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';
import { GetServerSideProps } from 'next';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import { Navigation } from 'swiper';
import { MutableRefObject, useCallback, useRef } from 'react';
import MainSlider from '@/components/Home/MainSlider';

type Props = {
  categories: {
    status: string;
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: {
      categories: CategoryType[];
    };
  };
  products: {
    newests: ProductType[];
    specials: ProductType[];
    cheepests: ProductType[];
    populars: ProductType[];
  };
};

const swiperParams = {
  slidesPerView: 1,
  spaceBetween: 10,
  // using "ratio" endpoints
  breakpoints: {
    // when window width is >= 320px
    [580]: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    [1000]: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    [1125]: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
};

const Home: NextPageWithLayout = ({ products, categories }: Props) => {
  const { newests, specials, cheepests, populars } = products;
  const sliderRef = useRef(null);

  const handlePrev = useCallback((sliderRef: MutableRefObject<any>) => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback((sliderRef: MutableRefObject<any>) => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <>
      <div className="mb-10">
        <MainSlider slides={newests} />
      </div>
      <div className="space-y-3 mt-32">
        <div className="text-primary text-xl px-6 border-b border-gray-300 pb-3 shadow-sm w-full flex items-center justify-between">
          <span>{'جدیدترین محصولات :'}</span>
          <button className="w-24 p-2 bg-primary text-white rounded-md hover:bg-links">
            {'بیشتر'}
          </button>
        </div>
        <div className="flex items-center gap-5 bg-white p-4 rounded-md">
          <button
            onClick={() => handlePrev(sliderRef)}
            className="hover:scale-125 hover:text-primary"
          >
            <BsArrowRightCircle size={25} />
          </button>
          <Swiper
            ref={sliderRef}
            {...swiperParams}
            observer={true}
            className="mx-10"
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {newests.map((product) => (
              <SwiperSlide key={product._id}>
                <Card product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            onClick={() => handleNext(sliderRef)}
            className="hover:scale-125 hover:text-primary"
          >
            <BsArrowLeftCircle size={25} />
          </button>
        </div>
      </div>
      <div className="space-y-3 mt-32">
        <div className="text-primary text-xl px-6 border-b border-gray-300 pb-3 shadow-sm w-full flex items-center justify-between">
          <span>{'پیشنهادات ویژه:'}</span>
          <button className="w-24 p-2 bg-primary text-white rounded-md hover:bg-links">
            {'بیشتر'}
          </button>
        </div>
        <div className="flex items-center gap-5 bg-white p-4 rounded-md">
          <button
            onClick={() => handlePrev(sliderRef)}
            className="hover:scale-125 hover:text-primary"
          >
            <BsArrowRightCircle size={25} />
          </button>
          <Swiper
            ref={sliderRef}
            {...swiperParams}
            observer={true}
            className="mx-10"
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {specials.map((product) => (
              <SwiperSlide key={product._id}>
                <Card product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            onClick={() => handleNext(sliderRef)}
            className="hover:scale-125 hover:text-primary"
          >
            <BsArrowLeftCircle size={25} />
          </button>
        </div>
      </div>
      <div className="space-y-3 mt-32">
        <div className="text-primary text-xl px-6 border-b border-gray-300 pb-3 shadow-sm w-full flex items-center justify-between">
          <span>{'کالاهای محبوب :'}</span>
          <button className="w-24 p-2 bg-primary text-white rounded-md hover:bg-links">
            {'بیشتر'}
          </button>
        </div>
        <div className="flex items-center gap-5 bg-white p-4 rounded-md">
          <button
            onClick={() => handlePrev(sliderRef)}
            className="hover:scale-125 hover:text-primary"
          >
            <BsArrowRightCircle size={25} />
          </button>
          <Swiper
            ref={sliderRef}
            {...swiperParams}
            observer={true}
            className="mx-10"
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {populars.map((product) => (
              <SwiperSlide key={product._id}>
                <Card product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            onClick={() => handleNext(sliderRef)}
            className="hover:scale-125 hover:text-primary"
          >
            <BsArrowLeftCircle size={25} />
          </button>
        </div>
      </div>
      <div className="space-y-3 mt-32">
        <div className="text-primary text-xl px-6 border-b border-gray-300 pb-3 shadow-sm w-full flex items-center justify-between">
          <span>{'مقرون به صرفه :'}</span>
          <button className="w-24 p-2 bg-primary text-white rounded-md hover:bg-links">
            {'بیشتر'}
          </button>
        </div>
        <div className="flex items-center gap-5 bg-white p-4 rounded-md">
          <button
            onClick={() => handlePrev(sliderRef)}
            className="hover:scale-125 hover:text-primary"
          >
            <BsArrowRightCircle size={25} />
          </button>
          <Swiper
            ref={sliderRef}
            {...swiperParams}
            observer={true}
            className="mx-10"
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {cheepests.map((product) => (
              <SwiperSlide key={product._id}>
                <Card product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            onClick={() => handleNext(sliderRef)}
            className="hover:scale-125 hover:text-primary"
          >
            <BsArrowLeftCircle size={25} />
          </button>
        </div>
      </div>
    </>
  );
};
export default Home;

Home.getLayout = function getLayout(page: React.ReactElement) {
  const { props } = page;

  return <MainLayout {...props} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const categories = await getAllCategoryService();
  const subCategories = await getAllSubCategoryService();
  const newests = await getAllProductsSevices('?sort=-createdAt&limit=10');
  const specials = await getAllProductsSevices('?sort=-quantity&limit=10');
  const cheepests = await getAllProductsSevices('?sort=price&limit=10');
  const populars = await getAllProductsSevices('?sort=-rating.rate&limit=10');

  return {
    props: {
      products: {
        newests: newests.data.products,
        spetials: specials.data.products,
        cheepests: cheepests.data.products,
        populars: populars.data.products,
      },
      categories: categories,
      subcategories: subCategories,
    },
  };
};
