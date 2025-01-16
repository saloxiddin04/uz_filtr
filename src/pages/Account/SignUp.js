import React, {useState} from "react";
import {BsCheckCircleFill} from "react-icons/bs";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {logoLight} from "../../assets/images";
import {getCode, setAccess, setRefresh, verifyCode} from "../../redux/auth/authSlice";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import Timer from "../../components/Timer/Timer";

const SignUp = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation();
	
	const [phone_number, setPhone] = useState("+998");
	const [status, setStatus] = useState(null)
	const [code, setCode] = useState(null)
	
	const handlePhone = (e) => {
		const inputValue = e.target.value;
		
		if (inputValue.startsWith("+998")) {
			const sanitizedValue = inputValue.replace(/[^\d+]/g, "");
			setPhone(sanitizedValue?.trim());
		}
	};
	
	const handleSignUp = (e) => {
		e.preventDefault();
		
		if (!phone_number.startsWith("+998")) return;
		
		dispatch(getCode({phone_number})).then(({payload}) => {
			setStatus(payload?.status)
			toast.success(`Code: ${payload?.test_verify_code}`)
		})
	};
	
	const handleVerify = (e) => {
		e.preventDefault();
		if (!code) return;
		
		dispatch(verifyCode({phone_number, code})).then(({payload}) => {
			if (payload?.success) {
				dispatch(setAccess(payload?.token))
				dispatch(setRefresh(payload?.token))
				toast.success('success')
				navigate('/profile', {state: {data: location.pathname.split("/")[1]}})
				window.location.reload()
			}
		})
	}
	
	return (
		<div className="w-full h-screen flex items-center justify-start">
			<div className="w-1/2 hidden lgl:inline-flex h-full text-white">
				<div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
					<Link to="/">
						<img src={logoLight} alt="logoImg" className="w-28"/>
					</Link>
					<div className="flex flex-col gap-1 -mt-1">
						<h1 className="font-titleFont text-xl font-medium">
							Get started for free
						</h1>
						<p className="text-base">Create your account to access more</p>
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
			<form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
				<div
					className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
					<h1
						className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
						Create your account
					</h1>
					<div className="flex flex-col gap-3">
						{/* Phone Number */}
						<div className="flex flex-col gap-.5">
							<p className="font-titleFont text-base font-semibold text-gray-600">
								Phone Number
							</p>
							<input
								onChange={handlePhone}
								value={phone_number}
								className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
								type="text"
								placeholder="+998999999999"
							/>
						</div>
						{status === 0 && <Timer/>}
						{status === 0 && (
							<div className="flex flex-col gap-.5">
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
						)}
						{status === 0 ? (
							<button
								onClick={handleVerify}
								className={`${
									"bg-primeColor hover:bg-black hover:text-white cursor-pointer"
									
								} w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
							>
								Verify
							</button>
						) : (
							<button
								onClick={handleSignUp}
								className={`${
									"bg-primeColor hover:bg-black hover:text-white cursor-pointer"
									
								} w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
							>
								Create Account
							</button>
						)}
						<p className="text-sm text-center font-titleFont font-medium">
							Don't have an Account?{" "}
							<Link to="/signin">
                    <span className="hover:text-blue-600 duration-300">
                      Sign in
                    </span>
							</Link>
						</p>
					</div>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
