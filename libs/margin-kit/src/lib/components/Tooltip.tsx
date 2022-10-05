import * as ReactTooltip from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

interface TooltipProps {
  trigger: ReactNode;
  tooltipText: ReactNode;
  className?: string;
}

const Tooltip = (props: TooltipProps) => {
  const { trigger, tooltipText, className } = props;

  return (
    <ReactTooltip.Provider>
      <ReactTooltip.Root delayDuration={1}>
        <ReactTooltip.Trigger className={className}>
          <span className="bwl-tooltip-span" tabIndex={0}>
            {trigger}
          </span>
        </ReactTooltip.Trigger>
        <ReactTooltip.Content sideOffset={5} className="bwl-tooltip-content">
          <ReactTooltip.Arrow className="bwl-tooltip-arrow" />
          {tooltipText}
        </ReactTooltip.Content>
      </ReactTooltip.Root>
    </ReactTooltip.Provider>
  );
};

export default Tooltip;
