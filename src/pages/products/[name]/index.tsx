import getAllCategoryService from '@/api/services/category/getAllCategoryService';
import getAllSubCategoryService from '@/api/services/category/getAllSubCategoryService';
import getAllProductsSevices from '@/api/services/product/getAllProductsServices';
import Button from '@/components/shared_components/Button';
import { routes } from '@/config/routes';
import { IMAGES } from '@/config/variable';
import { NextPageWithLayout, ProductType } from '@/interfaces/inretfaces';
import MainLayout from '@/layout/MainLayout';
import { classNames } from '@/utils';
import { Tab } from '@headlessui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, {
  MutableRefObject,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { type Swiper as SwiperRef } from 'swiper';
// import required modules
import { FreeMode, Thumbs } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import Card from '@/components/Products/Card';

const swiperParams = {
  slidesPerView: 1,
  spaceBetween: 10,
  // using "ratio" endpoints
  breakpoints: {
    // when window width is >= 320px
    [750]: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    [1200]: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    // [1125]: {
    //   slidesPerView: 4,
    //   spaceBetween: 40,
    // },
  },
};

type Props = {
  product: {
    status: string;
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: {
      products: ProductType[];
    };
  };
  related: {
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
const SingleProduct: NextPageWithLayout = ({ product, related }: Props) => {
  const productData = product?.data?.products[0];
  const relatedProducts = related?.data?.products;
  console.log(relatedProducts);
  const router = useRouter();
  const relatedRef = useRef(null);
  const [quantity, setQuantity] = useState('1');

  const handlePrev = useCallback((relatedRef: MutableRefObject<any>) => {
    if (!relatedRef.current) return;
    relatedRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback((relatedRef: MutableRefObject<any>) => {
    if (!relatedRef.current) return;
    relatedRef.current.swiper.slideNext();
  }, []);

  let [tabcategories] = useState(['معرفی']);
  const [currentTab, setCurrentTab] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperRef>();

  return (
    <>
      <div className="grid grid-cols-12 gap-5 mt-20 mb-20">
        <div className="max-w-sm col-span-10  col-start-2 md:col-span-5 md:col-start-2">
          <Swiper
            spaceBetween={10}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Thumbs]}
            className="mySwiper2"
          >
            {productData.images.map((image) => (
              <SwiperSlide key={image}>
                <div className="py-6 px-8">
                  <img src={IMAGES + image} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs]}
            className="mySwiper border rounded-sm p-4 border-gray-100 shadow-md"
          >
            {productData.images.map((image) => (
              <SwiperSlide key={image} className="p-1 ">
                <img src={IMAGES + image} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="col-span-10 col-start-2 md:col-span-5">
          <div className="flex flex-col items-start justify-start gap-5">
            <div>
              <span className="text-primary text-sm">
                {productData.category.name + '/' + productData.subcategory.name}
              </span>
            </div>
            <div>
              <h2 className="text-xl">{productData.name}</h2>
            </div>
            <div className="w-full border-b border-gray-300 pb-3 text-gray-400 font-light">
              <span>{'برند: '}</span>
              <span>{productData.brand}</span>
            </div>
            <div className="w-full flex items-center justify-between gap-1 bg-white border rounded-md border-gray-300 p-3 py-8 text-gray-400 font-light">
              <div>
                <span>{'امتیازات :'}</span>
              </div>
              <div className="flex items-center ">
                <div className="ml-3 flex items-center gap-1">
                  <span className="text-primary">
                    {productData.rating.rate}
                  </span>
                  <span>{`(${productData.rating.count})`}</span>
                </div>
                {[5, 4, 3, 2, 1].map((star) => {
                  return star <= productData.rating.rate ? (
                    <AiFillStar
                      key={star}
                      size={25}
                      color="gold"
                      className="cursor-pointer"
                    />
                  ) : (
                    <AiOutlineStar
                      key={star}
                      size={25}
                      color="gold"
                      className="cursor-pointer"
                    />
                  );
                })}
              </div>
            </div>
            <div className="w-full border-gray-300 pb-3 text-primary text-xl flex items-center justify-between">
              <div>
                <span>{'قیمت :'}</span>
              </div>
              <div>
                <span>
                  {Intl.NumberFormat('fa-IR').format(productData.price)}
                </span>
                <span>{' تومان'}</span>
              </div>
            </div>
            <div className="w-full border-b border-gray-300 pb-3 text-primary text-xl flex items-center justify-between">
              <div>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-16 p-2 rounded-sm text-md shadow-sm text-center focus:border focus:border-primary"
                />
              </div>
              <Button
                icon="addtocart"
                type="button"
                variant="contained"
                iconClassName="w-5"
                className="max-w-sm bg-primary text-white hover:bg-white hover:border hover:border-primary hover:text-primary"
              >
                {'افزودن به سبد خرید'}
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-10 col-start-2">
          <Tab.Group
            defaultIndex={currentTab}
            onChange={(currentTab) => {
              setCurrentTab(currentTab);
              router.push({
                pathname: router.pathname,
                query: { tab: currentTab },
              });
            }}
          >
            <Tab.List className="w-full self-center flex space-x-1 bg-gray-300/50 p-1">
              {tabcategories.map((category, idx) => (
                <Tab
                  key={category}
                  className={() =>
                    classNames(
                      'rounded-lg py-2.5 px-4 text-sm font-medium leading-5 text-primary hover:scale-110',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      currentTab === idx
                        ? 'bg-white shadow'
                        : 'text-links hover:bg-white/[0.12] hover:text-secondery'
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="w-full mt-2">
              <Tab.Panel
                key={0}
                className={classNames(
                  'rounded-xl bg-white p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}
              >
                {/* introduction section */}
                <div
                  className="text-md font-light text-gray-600"
                  dangerouslySetInnerHTML={{ __html: productData.description }}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
        <div className="w-full col-span-10 col-start-2 p-3 flex flex-col items-start gap-3 mt-10">
          <div className="text-primary text-xl px-6 border-b border-gray-300 pb-3 shadow-sm w-full">
            <span>{'محصولات مشابه :'}</span>
          </div>
          <div className="w-full flex items-center gap-5 overflow-x-hidden bg-white px-4 py-10">
            <button
              onClick={() => handlePrev(relatedRef)}
              className="hover:scale-125 hover:text-primary"
            >
              <BsArrowRightCircle size={25} />
            </button>
            <Swiper ref={relatedRef} {...swiperParams} className=" mx-10">
              {relatedProducts.map((product) => (
                <SwiperSlide key={product._id}>
                  <Card product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              onClick={() => handleNext(relatedRef)}
              className="hover:scale-125 hover:text-primary"
            >
              <BsArrowLeftCircle size={25} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;

SingleProduct.getLayout = (page: ReactElement) => {
  const { props } = page;

  return <MainLayout {...props} />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  console.log(query);

  const categories = await getAllCategoryService();
  const subCategories = await getAllSubCategoryService();
  const product = await getAllProductsSevices(`?name=${query.name}`);
  const related = await getAllProductsSevices(
    `?category=${product.data.products[0].category._id}&limit=10`
  );

  return {
    props: {
      product: product,
      categories: categories,
      subcategories: subCategories,
      related: related,
    },
  };
};
