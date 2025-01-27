import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "../../redux/products/productSlice";

const ProductDetails = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  
  const {loading, product} = useSelector(state => state.product)
  
  const [prevLocation, setPrevLocation] = useState("");

  const [img_url, setImgUrl] = useState(null)
  
  useEffect(() => {
    // setProductInfo(location.state.item);
    setPrevLocation(location.pathname);
  }, [location, product]);
  
  useEffect(() => {
    dispatch(getProduct(location?.state?.item?._id))
  }, [dispatch])
  
  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        <div
          className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4"
        >
          <div className="overflow-y-auto">
            {product?.product_files?.map((item, index) => (
              <img
                key={index}
                className="w-44 aspect-1 object-cover mb-2"
                src={item?.image?.file}
                alt="Product"
                loading="lazy"
                onClick={() => setImgUrl(item?.image?.file)}
              />
            ))}
            {/*<ProductsOnSale/>*/}
          </div>
          <div className="xl:col-span-2">
            {product?.product_files?.[0]?.image?.file && (
              <img
                className="w-full object-contain"
                src={img_url ? img_url : product.product_files[0].image.file}
                alt="Product"
                loading="lazy"
              />
            )}
          </div>
          <div className="w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={product}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
