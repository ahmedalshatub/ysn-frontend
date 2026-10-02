import Carousel from "../../../shared/components/media/Carousel";
import { mockCarouselSlides } from "../types/profileData";

const CarouselTab = () => (
  <Carousel
    slides={mockCarouselSlides.map((slide) => ({
      id: slide.key,
      content: (
        <div className="relative w-full h-full">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 bg-black/55 text-white px-5 py-4">
            <h4 className="text-base font-semibold">{slide.title}</h4>
            <p className="text-sm opacity-90 mt-0.5">{slide.description}</p>
          </div>
        </div>
      ),
    }))}
    variant="default"
    animation="slide"
    autoPlay
    autoPlayInterval={5000}
    showArrows
    arrowStyle="overlay"
    loop
    pauseOnHover
    height="420px"
  />
);

export default CarouselTab;
