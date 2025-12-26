/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Hading from "../Elements/Hading/Hading";
import Banner from "../Elements/Banner/Banner";

const Carousel = ({ data = [] }) => {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <Swiper
      spaceBetween={0}
      centeredSlides
      slidesPerView={1}
      loop
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination]}
    >
      {data.map((carouselItem, index) => (
        <SwiperSlide key={index}>
          <section>
            <a
              href={`anime/${carouselItem.mal_id}/${carouselItem.title.replace(
                / /g,
                "_"
              )}`}
            >
              <main className="flex justify-between items-end bg-[#141518] relative">
                <div className="absolute w-full h-full xl:flex xl:items-end carousel-shadow-sm md:carousel-shadow-md xl:carousel-shadow-xl">
                  <img
                    className="hidden object-contain object-left w-auto m-4 rounded-md xl:block aspect-[4/5]"
                    src={carouselItem.images.webp.image_url}
                    alt={carouselItem.title}
                  />
                  <div className="flex flex-col items-start justify-end h-full px-3 pb-4">
                    <div className="w-full">
                      <Banner classname="bg-[#ece48b] text-[#141518] text-[0.563rem]">
                        upcoming
                      </Banner>
                      <Hading classname="w-3/4 overflow-hidden text-xl font-bold md:w-full text-neutral-100 xl:text-3xl whitespace-nowrap text-ellipsis">
                        {carouselItem.title}
                      </Hading>
                      <Hading classname="sm:text-xs text-sm text-[#ece48b] whitespace-nowrap overflow-hidden text-ellipsis">
                        {carouselItem.title_japanese}
                      </Hading>
                    </div>

                    <div className="flex items-center gap-2 mt-1 mb-1">
                      {carouselItem.genres.map((genre, index) => (
                        <Banner
                          key={index}
                          classname="bg-[#444547] text-[0.563rem] text-neutral-100"
                        >
                          {genre.name}
                        </Banner>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <img
                    className="w-full md:h-[31.25rem] sm:object-contain md:object-cover xl:object-contain object-right aspect-video"
                    loading="lazy"
                    src={
                      carouselItem.trailer.images.image_url || "/default.png"
                    }
                    alt={carouselItem.title}
                  />
                </div>
              </main>
            </a>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
