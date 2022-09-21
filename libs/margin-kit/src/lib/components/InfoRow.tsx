import classNames from "classnames";
import { ReactNode } from "react";

export interface InfoRowProps {
  children: ReactNode;
  className?: string;
  variant?: "normal" | "important";
}

export const InfoRowLabel = (props: InfoRowProps) => {
  const { children, className, variant = "normal" } = props;
  return (
    <div
      className={classNames(
        "flex w-0 flex-grow items-center truncate text-left text-sm",
        {
          "text-gray-500": variant == "normal",
          "text-msTextImportant": variant == "important",
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export const InfoRowValue = (props: InfoRowProps) => {
  const { children, className } = props;
  return <div className={classNames("flex items-center text-sm text-msTextImportant", className)}>{children}</div>;
};
