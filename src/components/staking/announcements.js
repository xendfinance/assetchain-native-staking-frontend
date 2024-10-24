import { useState, useEffect } from "react";
import { CarouselContainer, CarouselItem } from "./stakingstyles";

const AnnouncementSection = () => {
  const data = [
    "./assets/announcement1.svg",
    "./assets/announcement2.svg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselInfinteScroll = () => {
    if (currentIndex === data.length - 1) {
      return setCurrentIndex(0);
    }

    return setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      carouselInfinteScroll();
    }, 3000);
    return () => clearInterval(interval);
  });

  return (
    <CarouselContainer>
      {data.map((each, i) => {
        return (
          <CarouselItem
            href="https://nft.wicrypt.com/"
            target="_blank"
            rel="noreferrer"
            key={i}
            currentIndex={currentIndex}
          >
            <img
              src={each}
              className="img-responsive"
              alt="banner2"
              width="100%"
            />
          </CarouselItem>
        );
      })}
    </CarouselContainer>
  );
};

export default AnnouncementSection;
