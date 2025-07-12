import { createPortal } from "react-dom";

function CartPortal({ children }) {
  //it works as a modal
  const portalRoot = document.getElementById("cart-portal-root");
  return createPortal(children, portalRoot);
}

export default CartPortal;
