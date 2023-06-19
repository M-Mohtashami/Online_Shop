import getAllCategoryService from '@/api/services/category/getAllCategoryService';
import getAllSubCategoryService from '@/api/services/category/getAllSubCategoryService';
import getAllProductsSevices from '@/api/services/product/getAllProductsServices';
import Card from '@/components/Products/Card';
import { NextPageWithLayout, ProductType } from '@/interfaces/inretfaces';
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
  products: {
    status: string;
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: {
      products: ProductType[];
    };
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

const Home: NextPageWithLayout = ({ products }: Props) => {
  const { products: productsData } = products?.data;
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
        <MainSlider slides={productsData} />
      </div>
      <div className="flex items-center gap-5">
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
          {productsData.map((product) => (
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
  const products = await getAllProductsSevices('');

  return {
    props: {
      products: products,
      categories: categories,
      subcategories: subCategories,
    },
  };
};
