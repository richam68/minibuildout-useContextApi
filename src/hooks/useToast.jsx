import { createContext, useContext } from "react";

const ToastContext = createContext();

// Wrapper for using a toast context
export const useToast = () => useContext(ToastContext);

export default ToastContext;
