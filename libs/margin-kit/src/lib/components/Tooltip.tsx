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
          <span className="flex flex-grow" tabIndex={0}>
            {trigger}
          </span>
        </ReactTooltip.Trigger>
        <ReactTooltip.Content
          sideOffset={5}
          className="w-44 whitespace-pre-wrap rounded-lg bg-white p-3 text-center text-xs text-gray-500 drop-shadow-msTokenImage"
        >
          <ReactTooltip.Arrow className="fill-white" />
          {tooltipText}
        </ReactTooltip.Content>
      </ReactTooltip.Root>
    </ReactTooltip.Provider>
  );
};

export default Tooltip;
