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
    <div className="w-full mx-auto mb-4">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation}/>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
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
        
        <div className="w-full bg-gray-100 my-4 flex justify-center items-center">
          <form className="py-20">
            <h1 className="font-titleFont font-semibold text-3xl">
              Не нашли фильтр?
            </h1>
            <div className="w-[500px] h-auto py-6 flex flex-col gap-6">
              <div>
                <p className="text-base font-titleFont font-semibold px-2">
                  Ваше имя
                </p>
                <input
                  // onChange={handleName}
                  // value={clientName}
                  className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                  type="text"
                  placeholder="Enter your name here"
                />
                {/*{errClientName && (*/}
                {/*  <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">*/}
                {/*    <span className="text-sm italic font-bold">!</span>*/}
                {/*    {errClientName}*/}
                {/*  </p>*/}
                {/*)}*/}
              </div>
              <div>
                <p className="text-base font-titleFont font-semibold px-2">
                  Ваш Email
                </p>
                <input
                  // onChange={handleEmail}
                  // value={email}
                  className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                  type="email"
                  placeholder="Enter your name here"
                />
                {/*{errEmail && (*/}
                {/*  <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">*/}
                {/*    <span className="text-sm italic font-bold">!</span>*/}
                {/*    {errEmail}*/}
                {/*  </p>*/}
                {/*)}*/}
              </div>
              <div>
                <p className="text-base font-titleFont font-semibold px-2">
                  Сообшения
                </p>
                <textarea
                  // onChange={handleMessages}
                  // value={messages}
                  cols="30"
                  rows="3"
                  className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor resize-none"
                  type="text"
                  placeholder="Enter your name here"
                ></textarea>
                {/*{errMessages && (*/}
                {/*  <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">*/}
                {/*    <span className="text-sm italic font-bold">!</span>*/}
                {/*    {errMessages}*/}
                {/*  </p>*/}
                {/*)}*/}
              </div>
              <button
                // onClick={handlePost}
                className="w-44 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
              >
                Отправить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
