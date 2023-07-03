import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { Box } from "@mui/material";

function MobileViewHeroSection() {
  const slides = [
    {
      link: "https://res.cloudinary.com/diwvqpuuf/image/upload/v1688412659/2-min_uxv0d7.svg",
    },
    {
      link: "https://res.cloudinary.com/diwvqpuuf/image/upload/v1688412661/1-min_jfpk2p.svg",
    },
    {
      link: "https://res.cloudinary.com/diwvqpuuf/image/upload/v1688412668/3-min_cvkyvk.svg",
    },
  ];

  const [position, positionSet] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("Left"),
    onSwipedRight: () => handleSwipe("Right"),
  });

  useEffect(() => {
    const autoSwipe = setTimeout(() => {
      handleSwipe("Right");
    }, 3000);

    return () => clearTimeout(autoSwipe);
  }, [position]);

  const handleSwipe = (dir) => {
    if (dir === "Right") {
      positionSet((position + 1) % slides.length);
    }
    if (dir === "Left") {
      positionSet(position > 0 ? position - 1 : slides.length - 1);
    }
  };
  return (
    <Box
      {...handlers}
      style={{
        width: "100vw",
        height: "65vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ position: "relative" }}>
        {slides.map((url, index) => (
          <motion.div
            style={{
              position: "absolute",
              width: "60vw",
              height: "65vh",
              overflow: "hidden",
            }}
            key={index}
            initial={{ scale: 0, rotation: -180 }}
            animate={{
              rotate: 0,
              left: `${(index - position) * 70 - 30}vw`,
              scale: index === position ? 1.2 : 1,
            }}
            transition={{
              type: "tween",
              ease: "easeInOut",
              duration: 0.8,
            }}
          >
            <img
              src={url.link}
              style={{
                width: "100%",
                height: "100%",
              }}
            ></img>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
export default MobileViewHeroSection;
