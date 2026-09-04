"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("visible");
  const isInitial = useRef(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }

    setTransitionStage("exit");

    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setTransitionStage("enter");
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (transitionStage === "enter") {
      const timer = setTimeout(() => setTransitionStage("visible"), 250);
      return () => clearTimeout(timer);
    }
  }, [transitionStage]);

  return (
    <div
      className="page-transition"
      data-state={transitionStage}
    >
      {displayChildren}
    </div>
  );
}
