import React, { useState } from "react";
// import { FaPlus } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";

const Category = () => {
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  const items = [
    {
      _id: 990,
      title: "Рукавные фильтры с импульсной продувкой СРФ"
    },
    {
      _id: 991,
      title: "Рукавные фильтры циклоны РЦИЭ",
    },
    {
      _id: 992,
      title: "Рукавные фильтры ФРИП",
    },
    {
      _id: 993,
      title: "Рукавные фильтры ФРКИ",
    },
    {
      _id: 994,
      title: "Рукавные фильтры ФРИ",
    },
    {
      _id: 995,
      title: "Рукавные фильтры ФРКН",
    },
    {
      _id: 996,
      title: "Рукавные фильтры с механическим встряхиванием РФУ",
    },
    {
      _id: 997,
      title: "Батарейный циклон БЦ",
    },
    {
      _id: 997,
      title: "Фильтровентиляционные установки",
    },
    {
      _id: 999,
      title: "Фильтры для силосов",
    },
    {
      _id: 1000,
      title: "Локальные фильтры",
    },
    {
      _id: 1001,
      title: "Двухступенчатые фильтры тонкой очистки воздуха СРФ-КР",
    },
    {
      _id: 1002,
      title: "Патронные фильтры СРФ-К",
    },
    {
      _id: 1003,
      title: "Автономные газоочистные установки",
    },
    {
      _id: 1004,
      title: "Рукавные фильтры",
    },
    {
      _id: 1005,
      title: "Масляный фильтр",
    },
  ];
  return (
    <div className="w-full">
      <NavTitle title="Категория Продукта" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {items.map(({ _id, title, icons }) => (
            <li
              key={_id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between"
            >
              {title}
              {icons && (
                <span
                  onClick={() => setShowSubCatOne(!showSubCatOne)}
                  className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                >
                  <ImPlus />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
