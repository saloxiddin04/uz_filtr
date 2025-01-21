import React, {useState} from "react";
import {BsCheckCircleFill} from "react-icons/bs";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {logoLight} from "../../assets/images";
import {useDispatch} from "react-redux";
import {getCode, getUserDetail, login, setAccess, setRefresh, setUser, verifyCode} from "../../redux/auth/authSlice";
import {toast} from "react-toastify";
import Timer from "../../components/Timer/Timer";

const SignIn = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation();
	
	const [phoneNumber, setPhoneNumber] = useState("+998");
	const [password, setPassword] = useState(null);
	const [status, setStatus] = useState(null)
	const [code, setCode] = useState(null)
	
	const handlePhoneNumber = (e) => {
		const inputValue = e.target.value;
		
		if (inputValue.startsWith("+998")) {
			const sanitizedValue = inputValue.replace(/[^\d+]/g, "");
			setPhoneNumber(sanitizedValue);
		}
	};
	
	const handlePassword = (e) => {
		setPassword(e.target.value);
	};
	
	const handleStatus = (e) => {
		e.preventDefault();
		
		if (phoneNumber === '+998') return;
		
		dispatch(getCode({phone_number: phoneNumber})).then(({payload}) => {
			if (payload?.status === 1) {
				setStatus(1)
			} else {
				setStatus(payload?.status)
				toast.success(`Code: ${payload?.test_verify_code}`)
			}
		})
	};
	
	const handleVerify = (e) => {
		e.preventDefault();
		if (!code || phoneNumber === '+998') return;
		
		dispatch(verifyCode({phone_number: phoneNumber, code})).then(({payload}) => {
			if (payload?.success) {
				dispatch(setAccess(payload?.token))
				dispatch(setRefresh(payload?.token))
				toast.success('success')
				navigate('/profile', {state: {data: location.pathname.split("/")[1]}})
				// window.location.reload()
			}
		})
	}
	
	const handleLogin = (e) => {
		e.preventDefault()
		if (phoneNumber === '+998' || !password) return;
		
		dispatch(login({ phone_number: phoneNumber, password }))
			.then(({ payload }) => {
				if (payload?.access && payload?.refresh_token) {
					dispatch(setAccess(payload));
					dispatch(setRefresh(payload));
					
					// Fetch user details
					dispatch(getUserDetail()).then((res) => {
						if (res?.payload) {
							dispatch(setUser(res.payload));
							navigate('/');
							toast.success('Success')
						} else {
							console.error('Failed to fetch user details');
						}
					});
				} else {
					console.error('Login failed: No access token or refresh token received');
				}
			})
			.catch((error) => {
				console.error('Login error:', error);
			});
	}
	
	
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="w-1/2 hidden lgl:inline-flex h-full text-white">
				<div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
					<Link to="/">
						<img src={logoLight} alt="logoImg" className="w-28"/>
					</Link>
					<div className="flex flex-col gap-1 -mt-1">
						<h1 className="font-titleFont text-xl font-medium">
							Stay sign in for more
						</h1>
						<p className="text-base">When you sign in, you are with us!</p>
					</div>
					<div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill/>
            </span>
						<p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted by online Shoppers
              </span>
							<br/>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
							nisi dolor recusandae consectetur!
						</p>
					</div>
					<div className="flex items-center justify-between mt-10">
						<p
							className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
							Terms
						</p>
						<p
							className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
							Privacy
						</p>
						<p
							className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
							Security
						</p>
					</div>
				</div>
			</div>
			<div className="w-full lgl:w-1/2 h-full">
				<form className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
					<div
						className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
						<h1
							className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
							Sign in
						</h1>
						<div className="flex flex-col gap-3">
							<div className="flex flex-col gap-.5">
								<p className="font-titleFont text-base font-semibold text-gray-600">
									Telefon raqam
								</p>
								<input
									onChange={handlePhoneNumber}
									value={phoneNumber}
									className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
									type="email"
									placeholder="+998999999999"
								/>
							</div>
							
							{status === null && (
								<button
									onClick={handleStatus}
									className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
								>
									Sign In
								</button>
							)}
							
							{status === 1 && (
								<>
									<div className="flex flex-col">
										<p className="font-titleFont text-base font-semibold text-gray-600">
											Password
										</p>
										<input
											onChange={handlePassword}
											value={password || ''}
											className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
											type="password"
											placeholder="Create password"
										/>
									</div>
									<button
										onClick={handleLogin}
										className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
									>
										Sign In
									</button>
								</>
							)}
							
							{status === 0 && (
								<>
									<Timer />
									<div className="flex flex-col">
										<p className="font-titleFont text-base font-semibold text-gray-600">
											Verify Code
										</p>
										<input
											onChange={(e) => setCode(e.target.value)}
											value={code || ''}
											className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
											type="text"
											placeholder="1234"
										/>
									</div>
									<button
										onClick={handleVerify}
										className={`${
											"bg-primeColor hover:bg-black hover:text-white cursor-pointer"
											
										} w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
									>
										Verify
									</button>
								</>
							)}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
