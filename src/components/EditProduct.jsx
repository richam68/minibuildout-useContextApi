import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Loader as FeatherLoader, SkipBack } from "react-feather";

const EditProduct = () => {
  const { state } = useLocation();
  const product = state?.product;
  const { updateProduct } = useAppContext();
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(product?.image);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: product?.name,
      category: product?.category,
      price: product?.price,
      stock: product?.stock,
      status: product?.status,
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file instanceof Blob) {
      setImageLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setImageLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    setIsSubmitting(true);
    const updatedProduct = {
      ...product,
      ...data,
      price: parseFloat(data.price),
      stock: parseInt(data.stock, 10),
      image: previewImage,
    };

    updateProduct(updatedProduct);
    setIsSubmitting(false);
    navigate("/");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <button
        onClick={handleBack}
        className="flex justify-center items-center gap-2 mt-2 ml-3 cursor-pointer"
      >
        <SkipBack />
        Back
      </button>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("name", { required: true })}
            placeholder="Name"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            {...register("category", { required: true })}
            placeholder="Category"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            step="0.01"
            {...register("price", { required: true, valueAsNumber: true })}
            placeholder="Price"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            {...register("stock", { required: true, valueAsNumber: true })}
            placeholder="Stock"
            className="w-full border px-3 py-2 rounded"
          />
          <select
            {...register("status")}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Limited">Limited</option>
          </select>
          <div className="flex flex-wrap items-center justify-start gap-4">
            {previewImage && (
              <div className="relative">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
                    <FeatherLoader className="w-6 h-6 text-blue-600 animate-spin" />
                  </div>
                )}
                <img
                  src={previewImage}
                  alt="Product Preview"
                  className="w-20 h-20 object-cover mb-4"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={handleImageChange}
              className="w-25 border px-3 py-2 rounded"
            />
          </div>
          <button
            type="submit"
            disabled={imageLoading || isSubmitting}
            className={`w-full py-2 rounded flex items-center justify-center ${
              imageLoading || isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <FeatherLoader className="w-5 h-5 text-white animate-spin" />
                Updating...
              </div>
            ) : (
              "Update Product"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
