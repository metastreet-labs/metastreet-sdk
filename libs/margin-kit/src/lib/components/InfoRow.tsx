import classNames from "classnames";
import { ReactNode } from "react";

export interface InfoRowProps {
  children: ReactNode;
  className?: string;
  variant?: "normal" | "important" | "primary";
}

export const InfoRow = (props: InfoRowProps) => {
  const { children, className } = props;
  return <div className={classNames("info-row", className)}>{children}</div>;
};

export const InfoRowLabel = (props: InfoRowProps) => {
  const { children, className, variant = "normal" } = props;
  return (
    <div
      className={classNames(
        "info-row-label",
        {
          "info-row-label-normal": variant == "normal",
          "info-row-label-important": variant == "important",
          "info-row-label-primary": variant == "primary",
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
