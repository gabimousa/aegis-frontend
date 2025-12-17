import { AnimatePresence, motion, Transition } from 'framer-motion';
import { PropsWithChildren } from 'react';
import { useLocation } from 'react-router';
import styles from './bodyWrapper.module.scss';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const pageTransition: Transition = {
  duration: 0.25,
  ease: 'easeInOut',
};

const BodyWrapper = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className={`${styles.bodyWrapper}`}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default BodyWrapper;
