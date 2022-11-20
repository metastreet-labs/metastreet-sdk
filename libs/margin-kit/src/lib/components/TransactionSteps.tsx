import classNames from "classnames";
import { Fragment } from "react";
import { TransactionState, TransactionStep } from "../hooks/useTransactionState";
import CheckIcon from "./icons/CheckIcon";
import ExclamationCircleIcon from "./icons/ExclamationCircleIcon";
import XMarkIcon from "./icons/XMarkIcons";
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
    <div className="transaction-steps">
      <div className="transaction-steps-wrapper">
        {steps.map((step, idx) => (
          <Fragment key={idx}>
            {idx != 0 ? (
              <StepDivider className={classNames({ "transaction-steps-divider-inactive": step.status == "idle" })} />
            ) : null}
            <StepCircle step={step} index={idx} />
          </Fragment>
        ))}
      </div>
      <div
        className={classNames("transaction-steps-description", {
          "transaction-steps-description-error": errored,
          "transaction-steps-description-normal": !errored,
        })}
      >
        <ExclamationCircleIcon className="transaction-steps-icon" />
        <span className="transaction-steps-text">{description}</span>
      </div>
      <MetaStreetButton loading={!errored} onClick={props.onClose}>
        {errored ? "Close" : title}
      </MetaStreetButton>
    </div>
  );
};

const StepDivider = ({ className = "" }) => {
  return <div className={classNames("transaction-steps-divider", className)} />;
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
      className={classNames("transaction-steps-circle", {
        "transaction-steps-circle-normal": !errored,
        "transaction-steps-circle-error": errored,
        "transaction-steps-circle-inactive": status == "idle",
      })}
    >
      <div
        className={classNames("transaction-steps-circle-border", {
          "transaction-steps-circle-border-error": errored,
          "transaction-steps-circle-border-normal": !errored,
          "transaction-steps-circle-border-complete": status == "complete",
        })}
      >
        {status == "idle" ? <span>{index}</span> : null}
        {status == "loading" ? <Spinner /> : null}
        {status == "complete" ? <CheckIcon className="transaction-steps-circle-icon" /> : null}
        {status == "error" ? <XMarkIcon className="transaction-steps-circle-icon" /> : null}
      </div>
      <span className="transaction-steps-circle-title">{title}</span>
    </div>
  );
};

export default TransactionSteps;
