import React, { ComponentPropsWithoutRef } from "react";
import { ShimmerButton } from "./shimmer-button"; // Assuming shimmer-button is in the same ui folder
import { cn } from "@/lib/utils";

interface PrimaryCtaButtonProps extends ComponentPropsWithoutRef<"button"> {
  // Add any specific props for PrimaryCtaButton if needed,
  // otherwise, just extends from button props
}

export const PrimaryCtaButton = React.forwardRef<
  HTMLButtonElement,
  PrimaryCtaButtonProps
>(({ className, children, ...props }, ref) => {
  return (
    <ShimmerButton
      ref={ref}
      background="var(--primary)"
      shimmerColor="rgba(255, 255, 0.4)" // Default shimmer color, can be adjusted
      className={cn(
        "h-12 text-base font-medium", // Default size and font, can be overridden
        className
      )}
      {...props}
    >
      {children}
    </ShimmerButton>
  );
});

PrimaryCtaButton.displayName = "PrimaryCtaButton";
