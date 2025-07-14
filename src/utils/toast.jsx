// src/utils/toast.js

import { useToast } from "../hooks/useToast";

export const useToastUtils = () => {
  const { open } = useToast();

  const showSuccessToast = (message) => {
    open(
      <div className="bg-green-100 text-green-800 p-2 rounded">{message}</div>
    );
  };

  const showErrorToast = (message) => {
    open(<div className="bg-red-100 text-red-800 p-2 rounded">{message}</div>);
  };

  return { showSuccessToast, showErrorToast };
};
