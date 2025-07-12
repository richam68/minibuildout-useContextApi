import { createContext, useContext } from "react";

const ToastContext = createContext();

// A wrapper for using a toast context
export const useToast = () => useContext(ToastContext);

export default ToastContext;
