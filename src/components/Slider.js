import { memo } from 'react';

import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Slider({ data }) {
  return (
    <div>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={5}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
      >
        {data.map(({ album, id }) => (
          <SwiperSlide key={id} style={{ width: '20%', margin: '20px' }}>
            <Link to={`/search_result/${id}`}>
              <img width="100%" src={album.images[1].url} alt={`album+${id}`} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default memo(Slider);
