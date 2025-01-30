import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="About" prevLocation={prevLocation} />
      <div className="pb-10">
        <h1 className="max-w-[700px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">Uz Filter</span>{" "}
          «Узфильтр» стремится предоставлять первоклассную продукцию для фильтрации. Благодаря многолетнему опыту мы установили прочные деловые отношения с нашими клиентами. Ключом к нашему росту и развитию является наша приверженность высокому качеству, инновациям и клиентоориентированному подходу. Наша компания является лидером по производству фильтрующих материалов и входит в пятерку крупнейших поставщиков пневмолент, фильтровальных рукавов и игольных тканей в Центральной Азии. Мы регулярно инвестируем в исследования и разработки, чтобы предложить инновационные решения для очистки воздуха и жидкостей. Наше оборудование соответствует международным стандартам, что гарантирует долгосрочную надежность и эффективность нашей продукции. «Узфильтр» не просто поставляет фильтры – мы создаем решения, которые помогают нашим клиентам совершенствовать производственные процессы и заботиться об окружающей среде.
        </h1>
        <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
