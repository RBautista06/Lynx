import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./phoneMockUp.css";

const PhoneMockup = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ["/phone.png", "/phone2.png"]; // Replace with your actual image paths

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container items-center justify-center h-full">
      <div className="phone-container flex items-center p-10 relative h-[90%]">
        {/* Background phone (fade in from bottom) */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-24 right-20 perspective-phone">
          <div className="w-64 h-[500px] bg-gray-900 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.7)] overflow-hidden p-2.5">
            <div className="h-full bg-white rounded-2xl relative overflow-hidden">
              <div className="absolute h-4 rounded-b-3xl w-30 bg-gray-900 left-1/2 transform -translate-x-1/2 flex px-4 pb-1 items-center justify-between">
                <span className="rounded-full w-10 h-2 bg-gray-700"></span>
                <span className="rounded-full size-2 bg-gray-700"></span>
                <span className="rounded-full size-2 bg-gray-700"></span>
                <span className="rounded-full size-2 bg-gray-700"></span>
              </div>
              <img
                src="/phonebg2.jpeg"
                className="object-cover h-full w-full brightness-75"
              />
            </div>
          </div>
        </motion.div>

        {/* Main phone (fade in from top, with smooth image transition) */}
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-64 h-[500px] bg-gray-900 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden p-2.5 z-10 phone ml-5">
          <div className="h-full bg-white rounded-2xl relative overflow-hidden">
            {/* Top bar */}
            <div className="absolute h-4 rounded-b-3xl w-30 bg-gray-900 left-1/2 transform -translate-x-1/2 flex px-4 pb-1 items-center justify-between z-10">
              <span className="rounded-full w-10 h-2 bg-gray-700"></span>
              <span className="rounded-full size-2 bg-gray-700"></span>
              <span className="rounded-full size-2 bg-gray-700"></span>
              <span className="rounded-full size-2 bg-gray-700"></span>
            </div>

            {/* Animated image transition */}
            <motion.img
              key={currentImage} // important for re-triggering animation
              src={images[currentImage]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PhoneMockup;
