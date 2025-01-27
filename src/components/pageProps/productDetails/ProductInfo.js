import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import {toast} from "react-toastify";
import {useLocation} from "react-router-dom";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  const {pathname} = useLocation()
  
  const [variant, setVariant] = useState(null)
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    if (!variant && productInfo) {
      setVariant(productInfo?.product_variants[0])
    }
  }, [dispatch, productInfo]);
  
  useEffect(() => {
    setVariant(null)
  }, [pathname]);
  
  const maxQuantity = productInfo?.product_variants?.[0]?.quantity || 0;
  
  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.warning("You cannot add more than available stock."); // Show warning
    }
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo?.name}</h2>
      <p className="text-base text-gray-600">{productInfo?.description}</p>
      
      <div className="font-medium text-lg">
        <p>
          <span className="font-normal">Category:</span> {productInfo?.category?.name}
        </p>
        {productInfo?.category?.children?.length > 0 && (
          <p>
            <span className="font-normal">Subcategories:</span>{" "}
            {productInfo.category.children.map((child) => child.name).join(", ")}
          </p>
        )}
      </div>
      
      <div className="flex gap-2 flex-wrap">
        {productInfo && productInfo?.product_variants?.map((item, index) => (
          <div
            onClick={() => setVariant(item)}
            key={index}
            className={`cursor-pointer rounded border-2 p-2 w-1/3 text-center shadow-md ${item?.id === variant?.id ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-500'}`}
          >
            <p>{item?.unique_code} / {item?.brand?.name}</p>
          </div>
        ))}
      </div>
      
      <div className="p-4 border rounded-md bg-gray-50 mt-4">
          <p>
            <span className="font-medium">Brand:</span> {variant?.brand?.name}
          </p>
          <p>
            <span className="font-medium">Price:</span> ${variant?.price}
          </p>
          <p>
            <span className="font-medium">Discount:</span> ${variant?.discount}
          </p>
          <p>
            <span className="font-medium">Quantity:</span> {variant?.quantity}
          </p>
          <div className="mt-2">
            <p className="font-medium">Attributes:</p>
            {variant?.product_variant_attributes?.map((attr) => (
              <p key={attr.id} className="ml-4">
                - {attr.attribute.name}: {attr.value}
              </p>
            ))}
          </div>
        </div>
      
      <div className="flex items-center gap-4">
        <p className="font-medium text-lg">Quantity:</p>
        <div className="flex items-center border rounded-full p-1">
          <button
            onClick={handleDecrement}
            className="px-3 py-1 text-blue-600 hover:bg-blue-100 rounded-full"
          >
            -
          </button>
          <span className="px-4">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="px-3 py-1 text-blue-600 hover:bg-blue-100 rounded-full"
          >
            +
          </button>
        </div>
      </div>
      
      <button
        onClick={() =>
          dispatch(
            addToCart({
              _id: productInfo?.id,
              name: productInfo?.name,
              quantity,
              image: productInfo?.product_files?.[0]?.image?.file,
              price: productInfo?.product_variants?.[0]?.price,
            })
          )
        }
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductInfo;
