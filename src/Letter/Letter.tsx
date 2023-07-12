import { motion } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';

import styles from './Letter.module.scss';

export const Letter = ({children}: { children: ReactNode }) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.getBoundingClientRect().height);
    }
  }, []);

  return (
    <div className={styles.letter} ref={containerRef}>
      <motion.div variants={contentVariants} initial="initial" animate="animate" className={styles.Content}>
        {children}
      </motion.div>
      <motion.div
        custom={1}
        variants={variantsFold}
        initial="initial"
        animate="animate"
        className={[styles.Fold, styles.First, styles.RoundedTop].join(' ')}
        style={{height: containerHeight / 2}} />
      <motion.div
        custom={2}
        variants={variantsFold}
        initial="initial"
        animate="animate"
        className={[styles.Fold, styles.Last, styles.RoundedBottom].join(' ')}
        style={{height: containerHeight / 2}} />

      {/* attempt at tri-fold */}
      {/*<motion.div*/}
      {/*  custom={1}*/}
      {/*  variants={variantsFold}*/}
      {/*  initial="initial" animate="animate" className={[styles.Fold, styles.First, styles.RoundedTop].join(' ')}*/}
      {/*  style={{height: containerHeight / 3}} />*/}
      {/*<motion.div*/}
      {/*  custom={2}*/}
      {/*  variants={variantsFold}*/}
      {/*  initial="initial"*/}
      {/*  animate="animate"*/}
      {/*  className={[styles.Fold, styles.Middle].join(' ')}*/}
      {/*  style={{height: containerHeight / 3}} />*/}
      {/*<motion.div*/}
      {/*  custom={containerHeight}*/}
      {/*  variants={variantsFoldLast}*/}
      {/*  initial="initial"*/}
      {/*  animate="animate"*/}
      {/*  className={[styles.Fold, styles.Last, styles.RoundedBottom].join(' ')}*/}
      {/*  style={{height: containerHeight / 3}} />*/}
    </div>
  );
};

const variantsFold = {
  initial: (i: number) => ({
    transform: i % 2 ? 'rotateX(-90deg)' : 'rotateX(90deg)',
    backgroundColor: '#000',
  }),
  animate: {
    transform: 'rotateX(0deg)',
    backgroundColor: '#fff',
    transition: {
      duration: 1,
      ease: 'easeInOut',
    }
  }
};

// const variantsFoldLast = {
//   initial: (height: number) => ({
//     transform: 'rotateX(-90deg)',
//     backgroundColor: '#000',
//     y: height / 3,
//   }),
//   animate: {
//     transform: 'rotateX(0deg)',
//     backgroundColor: '#fff',
//     y: 0,
//     transition: {
//       duration: 1,
//       ease: 'easeOut',
//     }
//   }
// };

const contentVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.9,
      duration: 0.3,
      ease: 'easeOut',
    }
  }
};
