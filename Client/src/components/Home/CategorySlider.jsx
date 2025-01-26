import React from 'react';
import { Container, Heading } from '../common/Design';
import CategoryCard from '../cards/CategoryCard';
import { categorylists } from '../../assets/data';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CategorySlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1200,
    cssEase: "ease",
    pauseOnHover: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
      <section className="category-slider pb-16">
        <Container>
          <Heading title="Categories" subtitle="Most viewd and all-top seller Category" />
          <Slider {...settings}>
            {
              categorylists.map(item => (
                <div key={item.id} className='p-8'>
                  <CategoryCard item={item} />
                </div>
              ))
            }
          </Slider>
        </Container>
      </section>
    </>
  )
}

export default CategorySlider
