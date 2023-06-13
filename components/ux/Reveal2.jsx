import React, { useRef } from 'react';
import { motion } from 'framer-motion';

// interface Props {
//   children: JSX.Element;
// }

const Reveal2 = ({ children }) => {
  const ref = useRef(null);

  return (
    <div ref={ref}>
      <motion.div
        variants={{
          hidden: { opacity: 0, x: 175 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 1.3, delay: 2.7 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal2;
