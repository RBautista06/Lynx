import { ChevronLeft, ChevronRight, Trash } from "lucide-react";
import { useState } from "react";

type mediaProps = {
  media: string[];
  allowRemove?: "yes" | "no"; // optional
  onRemove?: (index: number) => void; // optional
};

const ImageSlider = ({ media, allowRemove = "no", onRemove }: mediaProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };
  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onRemove) {
      onRemove(currentIndex);
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
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
        className="overflow-hidden rounded-lg ">
        <div
          className="flex transition-transform duration-500 ease-in-out bg-base-300 w-full h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {media.map((img, i) => (
            <div key={i} className="w-full h-full flex-shrink-0">
              <img src={img} className="w-full h-full object-cover" />
            </div>
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
      {allowRemove === "yes" && (
        <button
          type="button"
          className="absolute btn rounded-full size-8 p-0 bg-base-100 top-3 right-3 z-20"
          onClick={handleRemove}>
          <Trash size={16} />
        </button>
      )}
      <div className="flex gap-2 justify-center items-center absolute bottom-3 left-1/2 -translate-x-1/2">
        {media.map((_, i) => (
          <button
            key={i}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              setCurrentIndex(i);
            }}
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
