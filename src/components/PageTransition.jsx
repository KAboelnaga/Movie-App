import { motion as Motion } from "motion/react";

export default function PageTransition({ children }) {
    return (
        <Motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
            {children}
        </Motion.div>
    );
}
