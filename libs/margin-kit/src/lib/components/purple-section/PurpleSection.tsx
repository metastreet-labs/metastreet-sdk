import { ReactNode } from "react";

interface PurpleSectionProps {
  children: ReactNode;
}

const PurpleSection = (props: PurpleSectionProps) => {
  const { children } = props;

  return <div className="bwl-modal-form-purple-section">{children}</div>;
};

export default PurpleSection;
