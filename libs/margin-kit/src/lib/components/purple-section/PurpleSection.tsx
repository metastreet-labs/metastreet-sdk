import { ReactNode } from "react";

interface PurpleSectionProps {
  children: ReactNode;
}

const PurpleSection = (props: PurpleSectionProps) => {
  const { children } = props;

  return <div className="mt-4 flex flex-col space-y-1 rounded-lg bg-msPrimaryBackground/30 px-4 py-2">{children}</div>;
};

export default PurpleSection;
