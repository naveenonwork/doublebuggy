import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

// interface Props {
//   children: JSX.Element;
// }

const Reveal = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  return (
    <div ref={ref}>
      <motion.div
        variants={{
          hidden: { opacity: 0, x: 175 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        exit='hidden'
        transition={{ duration: 0.75, delay: 1.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;
