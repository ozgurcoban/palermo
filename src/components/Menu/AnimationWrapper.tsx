import React from "react";
import FadeUp from "../ui/FadeUp";

interface AnimationWrapperProps {
  children: React.ReactNode;
  hasSeenAnimation: boolean;
  disableAnimations: boolean;
  id?: string;
  variants?: any;
  onlyInitial?: boolean;
  className?: string;
  delay?: number;
  [key: string]: any;
}

export const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  hasSeenAnimation,
  disableAnimations,
  id,
  variants,
  onlyInitial = false,
  ...props
}) => {
  // Always ensure the id is passed through
  const elementProps = {
    ...props,
    ...(id ? { id } : {}),
  };

  // If onlyInitial is true, only animate on first load, never on updates
  if (onlyInitial && hasSeenAnimation) {
    return <div {...elementProps}>{children}</div>;
  }

  if (disableAnimations) {
    // No animations at all
    return <div {...elementProps}>{children}</div>;
  }

  if (hasSeenAnimation) {
    // Use simple fade animation instead of custom variants
    return <FadeUp {...elementProps}>{children}</FadeUp>;
  }

  // First time: use FadeUp animation (variants are not supported by FadeUp)
  return (
    <FadeUp {...elementProps}>
      {children}
    </FadeUp>
  );
};