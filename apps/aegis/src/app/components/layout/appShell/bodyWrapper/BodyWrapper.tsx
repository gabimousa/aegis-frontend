import { AnimatePresence, motion, Transition } from 'framer-motion';
import { PropsWithChildren, useMemo } from 'react';
import { useLocation } from 'react-router';

const pageVariants = {
  initial: {
    opacity: 0,
    x: 100, // start slightly to the right
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  // exit: {
  //   opacity: 0,
  //   x: -100, // exit to the left
  // },
};

const pageTransition: Transition = {
  duration: 0.2,
  ease: 'easeInOut',
};

export function BodyWrapper({ children }: PropsWithChildren) {
  const location = useLocation();
  const pathName = useMemo(() => {
    return location.pathname.split('/')[1];
  }, [location.pathname]);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathName}
        className="h-[calc(100vh-56px)] mx-auto overflow-x-hidden overflow-y-auto"
        initial="initial"
        animate="animate"
        // exit="exit"
        variants={pageVariants}
        transition={pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
