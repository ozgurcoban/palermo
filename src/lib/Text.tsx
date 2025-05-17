// Denna komponent är en flexibel text-komponent som kan återanvändas för olika HTML-element (t.ex. p, span, h1-h6).
// Du kan ange storlek, HTML-element, extra klasser och stilar via props.
// Komponenten lägger automatiskt till rätt textstorlek och styling beroende på vald storlek.

import { cn } from "@/lib/utils";

type TextProps = {
  size?: "sm" | "base" | "lg" | "xl";
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const Text: React.FC<TextProps> = ({
  size = "lg",
  as = "p",
  children,
  className,
  style,
}) => {
  const Component = as;

  const sizes = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg leading-loose tracking-wide",
    xl: "px-2 text-3xl font-medium leading-snug",
  };

  return (
    <Component className={cn(sizes[size], className)} style={style}>
      {children}
    </Component>
  );
};

export default Text;
