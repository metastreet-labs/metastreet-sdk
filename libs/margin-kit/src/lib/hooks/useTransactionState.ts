import { useState } from "react";

export const getTransactionStatus = (steps: TransactionStep[]) => {
  const initiated = steps[0].status != "idle";
  const errored = Boolean(steps.find((step) => step.status == "error"));
  const completed = steps[steps.length - 1].status == "complete";
  let status: TransactionStatus = "idle";
  if (initiated) status = "loading";
  if (errored) status = "error";
  if (completed) status = "complete";
  return status;
};

export interface TransactionState {
  steps: TransactionStep[];
  status: TransactionStatus;
}

export type TransactionStatus = "idle" | "loading" | "complete" | "error";

export interface TransactionStep {
  title: string;
  description: string;
  status: TransactionStatus;
}

type UpdateStep = (index: number, updates: Partial<Pick<TransactionStep, "status" | "description">>) => void;

type ResetSteps = (steps: TransactionStep[]) => void;

type UseTransactionStateReturnType = [TransactionStep[], UpdateStep, ResetSteps];

const useTransactionSteps = (initialSteps: TransactionStep[]): UseTransactionStateReturnType => {
  const [steps, setSteps] = useState(initialSteps);

  const updateStep = (index: number, updates: Partial<Pick<TransactionStep, "status" | "description">>) => {
    setSteps((steps) => {
      const newSteps = [...steps];
      newSteps[index] = { ...newSteps[index], ...updates };
      return newSteps;
    });
  };

  return [steps, updateStep, setSteps];
};

export default useTransactionSteps;
