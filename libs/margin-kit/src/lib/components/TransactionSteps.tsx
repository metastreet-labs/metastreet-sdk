import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { TransactionState, TransactionStep } from "meta-street/hooks/useTransactionState";
import MetaStreetButton from "./MetaStreetButton";
import Spinner from "./Spinner";

type TransactionStepsProps = {
  state: TransactionState;
  onClose: () => void;
};
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
            {idx != 0 && <StepDivider className={classNames({ "opacity-50": step.status == "idle" })} />}
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

type StepCircleProps = {
  step: TransactionStep;
  index: number;
};

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
        {status == "idle" && <span>{index}</span>}
        {status == "loading" && <Spinner />}
        {status == "complete" && <CheckIcon className="h-5 w-5 text-white" />}
        {status == "error" && <XIcon className="h-5 w-5 text-white" />}
      </div>
      <span className="absolute top-12 whitespace-nowrap text-xs font-semibold">{title}</span>
    </div>
  );
};

export default TransactionSteps;
