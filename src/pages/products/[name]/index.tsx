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
import React, { ReactElement, useEffect, useState } from 'react';
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
};
const SingleProduct: NextPageWithLayout = ({ product }: Props) => {
  const productData = product?.data?.products[0];
  console.log(product);
  const router = useRouter();

  let [tabcategories] = useState(['معرفی']);
  const [currentTab, setCurrentTab] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperRef>();

  useEffect(() => {
    router.asPath;
    // router.push(
    //   {
    //     pathname: routes.public.SingleProduct,
    //     query: { id: productData._id },
    //   },
    //   routes.public.Products + '/' + productData.name,
    //   { shallow: true }
    // );
  }, []);

  return (
    <>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-10 col-start-2 md:col-span-5 md:col-start-2">
          <Swiper
            spaceBetween={10}
            navigation={true}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Thumbs]}
            className="mySwiper2"
          >
            {productData.images.map((image) => (
              <SwiperSlide key={image}>
                <img src={IMAGES + image} />
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
            className="mySwiper mt-3"
          >
            {productData.images.map((image) => (
              <SwiperSlide key={image}>
                <img src={IMAGES + image} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="col-span-10 col-start-2 md:col-span-5">
          <div className="flex flex-col items-start justify-start gap-5">
            <div>
              <h2 className="text-xl">{productData.name}</h2>
            </div>
            <div className="w-full border-b border-gray-300 pb-3 text-gray-400 font-light">
              <span>{'برند: '}</span>
              <span>{productData.brand}</span>
            </div>
            <div className="w-full flex items-center gap-1 border-b border-gray-300 pb-3 text-gray-400 font-light">
              {[1, 2, 3, 4, 5].map((star) => {
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
            <div className="w-full border-b border-gray-300 pb-3 text-primary text-xl">
              <span>
                {Intl.NumberFormat('fa-IR').format(productData.price)}
              </span>
              <span>{' تومان'}</span>
            </div>
            <div className="w-full border-b border-gray-300 pb-3 text-primary text-xl">
              <Button
                icon="addtocart"
                type="button"
                variant="contained"
                iconClassName="w-5"
                className="w-full bg-primary text-white hover:bg-white hover:border hover:border-primary hover:text-primary"
              >
                {'افزودن به سبد خرید'}
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-12">
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

  return {
    props: {
      product: product,
      categories: categories,
      subcategories: subCategories,
    },
  };
};
