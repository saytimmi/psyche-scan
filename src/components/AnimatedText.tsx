"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Split text animation — word by word with clip-path reveal
export function SplitText({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.05,
}: {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}) {
  const words = children.split(" ");

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: staggerDelay, delayChildren: delay } },
      }}
      className={className}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

// Clip-path line reveal for section headings
export function ClipReveal({
  children,
  className = "",
  as: Tag = "h2",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}) {
  const ref = useRef(null);
  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      ref={ref}
      initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

// Animated counter for stats
export function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {prefix}
      <CountUp target={value} />
      {suffix}
    </motion.span>
  );
}

function CountUp({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView || hasAnimated.current || !ref.current) return;
    hasAnimated.current = true;
    const el = ref.current;
    const duration = 1500;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <motion.span
      ref={ref}
      onViewportEnter={() => setInView(true)}
    >
      0
    </motion.span>
  );
}
