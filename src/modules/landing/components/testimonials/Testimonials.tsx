import { Typography } from "@/shared/ui/typography/Typography";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
// @ts-expect-error - Swiper CSS modules are not typed
import "swiper/css";
// @ts-expect-error - Swiper CSS modules are not typed
import "swiper/css/pagination";

import css from "./Testimonials.module.css";


export type TestimonialData = {
    text: string;
    author: string;
}


const SLIDE_PER_VIEW = 1;
const SLIDE_AUTOPLAY_DELAY = 5000;


const TestimonialsCard = ({ text, author }: TestimonialData) => {
  return (
    <div className={css.TestimonialsCard}>
      <p className={css.TestimonialsCard__comment}>{text}</p>
      <Typography variant="h4">{author}</Typography>
    </div>
  );
};


export type TestimonialProps = {
  data: TestimonialData[]; 
};


export const Testimonials = ({ data = []}: TestimonialProps) => {
    return (
        <section>
            <div className={css.Testimonials}>

                <Typography variant="body" className={css.Testimonials__subtitle}>
                What our customers say
                </Typography>
                <Typography variant="h2">Testimonials</Typography>
                <Swiper
                loop
                modules={[Pagination, Autoplay]}
                className={css.Testimonials__swiper}
                slidesPerView={SLIDE_PER_VIEW}
                autoplay={{
                    delay: SLIDE_AUTOPLAY_DELAY,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    horizontalClass: css.Testimonials__pagination,
                    bulletClass: css.Testimonials__paginationBullet,
                    bulletActiveClass: css.active,
                }}
                >
                {data.map((item, index) => (
                    <SwiperSlide>
                    <TestimonialsCard
                        key={index}
                        text={item.text}
                        author={item.author}
                    />
                    </SwiperSlide>
                ))}
                </Swiper>
      </div>
        </section>
        
    )
}