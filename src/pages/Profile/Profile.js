import React, {useEffect, useState} from 'react';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import {useLocation, useNavigate} from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {setUser, updateUser} from "../../redux/auth/authSlice";

const Profile = () => {
	const dispatch = useDispatch()
	const location = useLocation();
	const navigate = useNavigate()
	const [first_name, setFirstName] = useState(null)
	const [last_name, setLastName] = useState(null)
	const [email, setEmail] = useState(null)
	const [password, setPassword] = useState(null)
	const [confirm_password, setConfirmPassword] = useState(null)
	const [visible, setVisible] = useState(false)
	
	const [prevLocation, setPrevLocation] = useState("");
	
	useEffect(() => {
		setPrevLocation(location.state.data);
	}, [location]);
	
	const patchUser = () => {
		if (!first_name || !last_name || !email || !password || !confirm_password || password !== confirm_password) {
			return toast.error('All inputs required')
		}
		
		dispatch(updateUser({
			first_name, last_name, email, password, confirm_password
		})).then(({payload}) => {
			if (payload?.success) {
				dispatch(setUser(payload))
				toast.success('Success')
			}
		})
	}
	
	return (
		<div className="max-w-container mx-auto px-4">
			<Breadcrumbs title="Profile" prevLocation={prevLocation} />
			<div className='flex gap-10'>
				<div className="card">
					<div className='bg-gray-100 p-5 rounded'>
						<FaUserAlt size="200"/>
					</div>
				</div>
				<div className="card flex items-center justify-between flex-wrap gap-2 w-11/12">
					<div
						className="input flex flex-col w-[48%]"
					>
						<label htmlFor="name">First Name</label>
						<input
							type="text"
							id={'name'}
							className={`py-2.5 px-2 rounded mt-2 outline-none border`}
							value={first_name || ''}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</div>
					<div
						className="input flex flex-col w-[48%]"
					>
						<label htmlFor="name">Last Name</label>
						<input
							type="text"
							id={'last_name'}
							className={`py-2.5 px-2 rounded mt-2 outline-none border`}
							value={last_name || ''}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>
					<div
						className="input flex flex-col w-full"
					>
						<label htmlFor="username">Email</label>
						<input
							type="email"
							id={'username'}
							className={`py-2.5 px-2 rounded mt-2 outline-none border`}
							value={email || ''}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="input flex flex-col w-full">
						<label htmlFor="password">Password</label>
						<div
							className={`mt-3 flex items-center justify-between py-2 px-2 rounded border bg-white password`}
						>
							<input
								type={visible ? "text" : "password"}
								id={'password'}
								className="outline-none border-none bg-transparent w-full"
								value={password || ''}
								onChange={(e) => setPassword(e.target.value)}
							/>
							{visible ?
								<AiFillEye className="mt-1 cursor-pointer" onClick={() => setVisible(!visible)} size={25}/>
								:
								<AiFillEyeInvisible className="mt-1 cursor-pointer" onClick={() => setVisible(!visible)} size={25}/>
							}
						</div>
					</div>
					<div className="input flex flex-col w-full">
						<label htmlFor="confirm_password">Confirm Password</label>
						<div
							className={`mt-3 flex items-center justify-between py-2 px-2 rounded border bg-white password`}
						>
							<input
								type={visible ? "text" : "password"}
								id={'confirm_password'}
								className="outline-none border-none bg-transparent w-full"
								value={confirm_password || ''}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							{visible ?
								<AiFillEye className="mt-1 cursor-pointer" onClick={() => setVisible(!visible)} size={25}/>
								:
								<AiFillEyeInvisible className="mt-1 cursor-pointer" onClick={() => setVisible(!visible)} size={25}/>
							}
						</div>
					</div>
				</div>
			</div>
			<div className="flex items-center justify-end mt-5 gap-3 pb-4">
				<button className="py-2 px-4 bg-red-400 text-white rounded text-lg" onClick={() => navigate('/')}>Back</button>
				<button
					className="py-2 px-4 bg-green-400 text-white rounded text-lg"
					onClick={patchUser}
				>
					Save
				</button>
			</div>
		</div>
	);
};

export default Profile;