import { useEffect } from "react";
import { Minus, Plus, Trash2, X } from "react-feather";
import { useAppContext } from "../context/AppContext";
import { useToastUtils } from "../utils/toast";
import CartPortal from "./CartPortal";

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useAppContext();
  const { showSuccessToast, showErrorToast } = useToastUtils();

  const total = cartItems.reduce(
    (acc, item) => acc + item?.price * item?.quantity,
    0
  );

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <CartPortal>
      <>
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose}></div>
        <aside className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto transition-transform duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Your Cart</h2>
            <button
              onClick={onClose}
              className="text-sm text-black-500 cursor-pointer"
            >
              <X />
            </button>
          </div>

          {cartItems?.length === 0 ? (
            <p className="text-center">Cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems?.map((item) => (
                <div
                  key={item?.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <h4 className="font-medium">{item?.name}</h4>
                    <p className="text-sm text-gray-500">
                      ₹{item?.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        decreaseQuantity(item?.id);
                        showErrorToast("Decreasing Quantity");
                      }}
                      disabled={item?.quantity <= 1}
                      className="px-1 py-0 bg-gray-200 rounded "
                    >
                      <Minus />
                    </button>
                    <span>{item?.quantity}</span>
                    <button
                      onClick={() => {
                        increaseQuantity(item.id);
                        showSuccessToast("Increased Quantity");
                      }}
                    >
                      <Plus />
                    </button>
                    <button
                      onClick={() => {
                        removeFromCart(item.id);
                        showErrorToast("Removed Product");
                      }}
                      className="text-xs text-red-500 hover:underline cursor-pointer"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t">
                <p className="font-semibold text-right">
                  Total: ₹{total.toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </aside>
      </>
    </CartPortal>
  );
};

export default CartSidebar;
