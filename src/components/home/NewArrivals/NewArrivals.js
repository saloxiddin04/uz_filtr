import React, {useEffect} from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  filter1, filter2, filter3, filter4, filter5,
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
} from "../../../assets/images/index";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts} from "../../../redux/products/productSlice";

const NewArrivals = () => {
  const dispatch = useDispatch()
  
  const {loading, products} = useSelector((state) => state.product)
  
  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch]);
  
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  
  if (loading) return <p>Loading...</p>
  
  return (
    <div className="w-full pb-16 py-20">
      <Heading heading="Yangi mahsulotlar" />
      <Slider {...settings}>
        {products?.result?.map((item) => (
          <div className="px-2" key={item?.id}>
            <Product
              _id={item?.id}
              img={item?.product_files[0]?.image?.file}
              productName={item?.name?.length > 20 ? `${item?.name?.slice(0, 20)}...` : item?.name}
              price={item?.product_variants[0]?.price}
              color={item?.category?.name}
              badge={true}
              des={item?.description?.slice(0, 30)}
            />
          </div>
        ))}
        
        {/*<div className="px-2">*/}
        {/*  <Product*/}
        {/*    _id="100002"*/}
        {/*    img={filter2}*/}
        {/*    productName="Cobalt"*/}
        {/*    price="250.00"*/}
        {/*    color="Воздушный фильтр CAF 1006 edit"*/}
        {/*    badge={true}*/}
        {/*    des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className="px-2">*/}
        {/*  <Product*/}
        {/*    _id="100003"*/}
        {/*    img={filter3}*/}
        {/*    productName="Spark 1.25"*/}
        {/*    price="80.00"*/}
        {/*    color="Воздушный фильтр CAF 1005 edit"*/}
        {/*    badge={true}*/}
        {/*    des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className="px-2">*/}
        {/*  <Product*/}
        {/*    _id="100004"*/}
        {/*    img={filter4}*/}
        {/*    productName="Lacetti, Nexia"*/}
        {/*    price="60.00"*/}
        {/*    color="Масляный фильтр COF 1001 edit"*/}
        {/*    badge={false}*/}
        {/*    des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."*/}
        {/*  />*/}
        {/*</div>*/}
        {/*<div className="px-2">*/}
        {/*  <Product*/}
        {/*    _id="100005"*/}
        {/*    img={filter2}*/}
        {/*    productName="Nexia"*/}
        {/*    price="60.00"*/}
        {/*    color="Воздушный фильтр CAF 1005 edit"*/}
        {/*    badge={false}*/}
        {/*    des="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis."*/}
        {/*  />*/}
        {/*</div>*/}
      </Slider>
    </div>
  );
};

export default NewArrivals;
