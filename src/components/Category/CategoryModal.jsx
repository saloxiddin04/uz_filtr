import React, {useEffect, useState} from "react";
import { MdClose } from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {getCategory} from "../../redux/category/categorySlice";

const CategoryModal = ({ isOpen, onClose }) => {
	const dispatch = useDispatch()
	
	const {categories, category} = useSelector(state => state.category)
	
	const [id, setId] = useState(null)
	
	useEffect(() => {
		if (isOpen) {
			dispatch(getCategory(categories[0]?.id))
			setId(categories[0]?.id)
		}
	}, [isOpen, categories, dispatch]);
	
	const changeCategory = (_id) => {
		dispatch(getCategory(_id))
		setId(_id)
	}
	
	if (!isOpen) return null;
	
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
			<div className="bg-white rounded-lg shadow-lg w-[90%] max-w-5xl h-[80%] flex flex-col">
				{/* Header */}
				<div className="flex justify-between items-center p-4 border-b">
					<h2 className="text-lg font-bold">Каталог</h2>
					<button onClick={onClose} className="text-gray-500 hover:text-gray-800">
						<MdClose size={24} />
					</button>
				</div>
				
				{/* Body */}
				<div className="flex flex-grow overflow-hidden">
					{/* Left Sidebar */}
					<div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
						<ul className="space-y-3">
							{categories?.map((item) => (
								<li key={item?.id} onClick={() => changeCategory(item?.id)}>
									<button className={`w-full text-left ${id === item?.id ? 'bg-blue-500' : 'bg-gray-200'} text-white p-3 rounded`}>
										{item?.name}
									</button>
								</li>
							))}
						</ul>
					</div>
					
					{/* Right Content */}
					<div className="w-3/4 p-4 overflow-y-auto">
						<h3 className="text-lg font-semibold mb-4">Виды фильтров</h3>
						<div className="grid grid-cols-3 gap-4">
							{category?.children?.map((item) => (
								<div key={item?.id} className="p-4 border rounded hover:shadow-md">
									<h4 className="font-bold">{item?.name}</h4>
									{/*<p className="text-gray-500 text-sm">96,611 товаров</p>*/}
									{/*<ul className="mt-2 text-sm text-blue-500">*/}
									{/*	<li>Всасывающие</li>*/}
									{/*	<li>Сливные</li>*/}
									{/*	<li>Напорные</li>*/}
									{/*</ul>*/}
								</div>
							))}
						</div>
					</div>
				</div>
				
				{/* Footer */}
				<div className="p-4 border-t flex justify-end">
					<button className="text-blue-500 flex items-center">
						Смотреть весь каталог →
					</button>
				</div>
			</div>
		</div>
	);
};

export default CategoryModal;
