import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { TransactionState, TransactionStep } from "../hooks/useTransactionState";
import MetaStreetButton from "./MetaStreetButton";
import Spinner from "./Spinner";

interface TransactionStepsProps {
  state: TransactionState;
  onClose: () => void;
}
const TransactionSteps = (props: TransactionStepsProps) => {
  const { steps } = props.state;

  const lastCompletedStep = steps.find((step) => step.status != "complete");
  const lastStep = steps[steps.length - 1];
  const currentStep = lastCompletedStep ?? lastStep;
  const { title, description, status } = currentStep;
  const errored = status == "error";

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex justify-center px-6">
        {steps.map((step, idx) => (
          <>
            {idx != 0 ? <StepDivider className={classNames({ "opacity-50": step.status == "idle" })} /> : null}
            <StepCircle step={step} index={idx} key={idx} />
          </>
        ))}
      </div>
      <div
        className={classNames("flex items-center justify-center space-x-1", {
          "text-red-500": errored,
          "text-msPrimaryDark": !errored,
        })}
      >
        {<ExclamationCircleIcon className="h-5 w-5" />}
        <span className="text-sm">{description}</span>
      </div>
      <MetaStreetButton loading={!errored} onClick={props.onClose}>
        {errored ? "Close" : title}
      </MetaStreetButton>
    </div>
  );
};

const StepDivider = ({ className = "" }) => {
  return <div className={classNames("mx-2 mt-[1.2rem] h-[2px] max-w-[5rem] flex-grow bg-msPrimaryLight", className)} />;
};

interface StepCircleProps {
  step: TransactionStep;
  index: number;
}

const StepCircle = (props: StepCircleProps) => {
  const { step, index } = props;
  const { title, status } = step;
  const errored = status == "error";

  return (
    <div
      className={classNames("relative flex flex-col items-center pb-6", {
        "text-msPrimaryLight": !errored,
        "text-red-500": errored,
        "opacity-50": status == "idle",
      })}
    >
      <div
        className={classNames("flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold", {
          "border-red-500": errored,
          "bg-red-500": errored,
          "border-msPrimaryLight": !errored,
          "bg-msPrimaryLight": status == "complete",
        })}
      >
        {status == "idle" ? <span>{index}</span> : null}
        {status == "loading" ? <Spinner /> : null}
        {status == "complete" ? <CheckIcon className="h-5 w-5 text-white" /> : null}
        {status == "error" ? <XMarkIcon className="h-5 w-5 text-white" /> : null}
      </div>
      <span className="absolute top-12 whitespace-nowrap text-xs font-semibold">{title}</span>
    </div>
  );
};

export default TransactionSteps;
