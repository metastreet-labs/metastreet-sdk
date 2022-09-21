import { useState } from "react";

export type TransactionState = {
  steps: TransactionStep[];
  status: TransactionStatus;
};

export type TransactionStatus = "idle" | "loading" | "complete" | "error";

export type TransactionStep = {
  title: string;
  description: string;
  status: TransactionStatus;
};

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
