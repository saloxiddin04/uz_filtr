import React, {useState} from "react";
import {BsCheckCircleFill} from "react-icons/bs";
import {Link, useNavigate} from "react-router-dom";
import {logoLight} from "../../assets/images";
import {useDispatch} from "react-redux";
import {getUserDetail, login, setAccess, setRefresh, setUser} from "../../redux/auth/authSlice";

const SignIn = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [phoneNumber, setPhoneNumber] = useState("+998");
	const [password, setPassword] = useState(null);
	
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
	
	const handleSignUp = (e) => {
		e.preventDefault();
		
		if (!phoneNumber || !password) return;
		
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
	};
	
	
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
							{/*<Timer/>*/}
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
							
							{/* Password */}
							<div className="flex flex-col gap-.5">
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
								onClick={handleSignUp}
								className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
							>
								Sign In
							</button>
							<p className="text-sm text-center font-titleFont font-medium">
								Don't have an Account?{" "}
								<Link to="/signup">
                    <span className="hover:text-blue-600 duration-300">
                      Sign up
                    </span>
								</Link>
							</p>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
