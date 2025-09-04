"use client";

import { Button, ButtonProps, Skeleton } from "@heroui/react";
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonConfig extends Omit<ButtonProps, "children"> {
  text: string;
  href?: string;
}

interface BottomNavigationProps {
  leftButton?: ButtonConfig;
  rightButton?: ButtonConfig;
  maxWidth?: string;
  hasShadow?: boolean;
  className?: string;
  children?: ReactNode;
  isLoading?: boolean;
}

const BottomNavigation = ({
  leftButton,
  rightButton,
  maxWidth = "max-w-5xl",
  className = "",
  children,
  isLoading,
}: BottomNavigationProps) => {
  const renderButton = (buttonConfig: ButtonConfig | undefined) => {
    if (!buttonConfig) return null;

    const { text, href, ...buttonProps } = buttonConfig;

    const buttonElement = (
      <Button
        color={buttonConfig.color || "primary"}
        variant={buttonConfig.variant || "flat"}
        radius="none"
        className={`px-8 py-3 ${buttonConfig.className || ""}`}
        isDisabled={buttonConfig.isDisabled || false}
        isLoading={isLoading}
        {...buttonProps}
      >
        {text}
      </Button>
    );

    if (href) {
      return (
        <Link href={href} key={text}>
          {buttonElement}
        </Link>
      );
    }

    return buttonElement;
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-background border-divider border-t px-4 py-4 z-50 ${className}`}
    >
      <div className={`${maxWidth} mx-auto flex justify-between`}>
        {isLoading ? (
          <>
            <div aria-live="polite" className="sr-only">
              Loading buttons
            </div>
            <Skeleton className="h-10 w-20 rounded" />
            <Skeleton className="h-10 w-32 rounded" />
          </>
        ) : (
          children || (
            <>
              {renderButton(leftButton)}
              {renderButton(rightButton)}
            </>
          )
        )}
      </div>
    </div>
  );
};

export default BottomNavigation;
