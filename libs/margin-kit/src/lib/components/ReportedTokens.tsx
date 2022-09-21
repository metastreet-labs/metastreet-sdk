import { ExclamationCircleIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import Tooltip from "./Tooltip";

type ReportedTokensProps = {
  className?: string;
  total: number;
  flagged: number;
};

const ReportedTokens = (props: ReportedTokensProps) => {
  const { className, total, flagged } = props;

  return (
    <Tooltip
      className={classNames("cursor-help", className)}
      trigger={
        <div className="flex items-center text-sm text-msEventAlert">
          <ExclamationCircleIcon className="mr-1 h-4 w-4" />
          <span>
            {flagged}/{total} assets are flagged
          </span>
        </div>
      }
      tooltipText={
        <>Some of the selected assets are flagged by OpenSea, and are not available to purchase with leverage</>
      }
    />
  );
};

export default ReportedTokens;
