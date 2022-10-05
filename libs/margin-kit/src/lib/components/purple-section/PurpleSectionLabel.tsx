import classNames from "classnames";
import { InfoRowLabel, InfoRowProps } from "../InfoRow";

const PurpleSectionLabel = (props: InfoRowProps) => {
  const { children, className } = props;
  return (
    <InfoRowLabel className={classNames("important-text", className)} variant="important">
      {children}
    </InfoRowLabel>
  );
};

export default PurpleSectionLabel;
