import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type mediaProps = {
  media: string[];
};
const ImageSlider = ({ media }: mediaProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };
  return (
    <div className="w-full flex items-center gap-4 relative">
      {currentIndex > 0 && (
        <button
          className="absolute btn rounded-full size-8 p-0 bg-base-100 left-3 z-20"
          onClick={handlePrev}>
          <ChevronLeft size={16} />
        </button>
      )}

      <div
        style={{ aspectRatio: "1/1" }}
        className="overflow-hidden rounded-lg border border-b-gray-400">
        <div
          className="flex transition-transform duration-500 ease-in-out "
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {media.map((img, i) => (
            <img
              key={i}
              src={img}
              className="object-cover w-full h-full flex-shrink-0"
            />
          ))}
        </div>
      </div>
      {currentIndex < media.length - 1 && (
        <button
          className="absolute btn rounded-full size-8 p-0 bg-base-100 right-3 z-20"
          onClick={handleNext}>
          <ChevronRight size={16} />
        </button>
      )}
      <div className="flex gap-2 justify-center items-center absolute bottom-3 left-1/2 -translate-x-1/2">
        {media.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`size-2 rounded-full transition-all ${
              currentIndex === i ? "bg-base-100 scale-110" : "bg-base-100/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
