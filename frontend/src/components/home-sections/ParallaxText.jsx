import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

function ParallaxTextBar({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });
  return (
    <div
      style={{
        overflow: "hidden",
        letterSpacing: "-2px",
        lineHeight: 0.8,
        margin: 0,
        whiteSpace: "nowrap",
        display: "flex",
        flexWrap: "nowrap",
      }}
    >
      <motion.div
        style={{
          x,
          fontWeight: 500,
          fontSize: "4rem",
          display: "flex",
          whiteSpace: "nowrap",
          display: "flex",
          flexWrap: "nowrap",
        }}
      >
        <span
          style={{
            display: "block",
            marginRight: " 30px",
            color: "white",
            fontFamily: "Bebas Neue, cursive",
          }}
        >
          {children}
        </span>
        <span
          style={{
            display: "block",
            marginRight: " 30px",
            color: "white",
            fontFamily: "Bebas Neue, cursive",
          }}
        >
          {children}
        </span>
        <span
          style={{
            display: "block",
            marginRight: " 30px",
            color: "white",
            fontFamily: "Bebas Neue, cursive",
          }}
        >
          {children}
        </span>
        <span
          style={{
            display: "block",
            marginRight: " 30px",
            color: "white",
            fontFamily: "Bebas Neue, cursive",
          }}
        >
          {children}
        </span>
      </motion.div>
    </div>
  );
}

const ParallaxText = () => {
  return (
    <section>
      <ParallaxTextBar baseVelocity={-2}>
        All-in-One-Fitness-Solution
      </ParallaxTextBar>
      <ParallaxTextBar baseVelocity={2}>
        Only-Fitness-Platform-You-Need!
      </ParallaxTextBar>
    </section>
  );
};

export default ParallaxText;
