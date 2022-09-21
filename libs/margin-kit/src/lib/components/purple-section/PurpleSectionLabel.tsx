import classNames from "classnames";
import { InfoRowLabel, InfoRowProps } from "../InfoRow";

const PurpleSectionLabel = (props: InfoRowProps) => {
  const { children, className } = props;
  return (
    <InfoRowLabel className={classNames("font-medium ", className)} variant="important">
      {children}
    </InfoRowLabel>
  );
};

export default PurpleSectionLabel;
