import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import {BiPhone} from "react-icons/bi";
import {CiMail} from "react-icons/ci";

const Contact = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);

  const [clientName, setclientName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState("");

  // ========== Error Messages Start here ============
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errMessages, setErrMessages] = useState("");
  // ========== Error Messages End here ==============
  const [successMsg, setSuccessMsg] = useState("");

  const handleName = (e) => {
    setclientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handleMessages = (e) => {
    setMessages(e.target.value);
    setErrMessages("");
  };

  // ================= Email Validation start here =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ================= Email Validation End here ===============

  const handlePost = (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("Enter your Name");
    }
    if (!email) {
      setErrEmail("Enter your Email");
    } else {
      if (!EmailValidation(email)) {
        setErrEmail("Enter a Valid Email");
      }
    }
    if (!messages) {
      setErrMessages("Enter your Messages");
    }
    if (clientName && email && EmailValidation(email) && messages) {
      setSuccessMsg(
        `Thank you dear ${clientName}, Your messages has been received successfully. Futher details will sent to you by your email at ${email}.`
      );
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Contact" prevLocation={prevLocation} />
      {successMsg ? (
        <p className="pb-20 w-96 font-medium text-green-500">{successMsg}</p>
      ) : (
        <>
          <div className="flex justify-between items-center flex-wrap mb-4">
            <div className="w-[48%] p-2 flex flex-wrap justify-between items-center border rounded">
              <div className="flex items-center flex-wrap w-[48%] gap-4">
                <div className="rounded-full w-12 aspect-1 bg-gray-300 flex justify-center items-center">
                  <BiPhone className="text-lg" size={20}/>
                </div>
                <div className="flex flex-col gap-2">
                  <a href="tel:+998779992225">+998(77)999-22-25</a>
                  <a href="tel:+998901899426">+998(90)189-94-26</a>
                  <a href="tel:+998555102221">+998(55)510-22-21</a>
                  <a href="tel:+998903250150">+998(90)325-01-50</a>
                </div>
              </div>
              <div className="flex items-center flex-wrap w-[48%] gap-4">
                <div className="rounded-full w-12 aspect-1 bg-gray-300 flex justify-center items-center">
                  <CiMail className="text-lg" size={20}/>
                </div>
                <div className="flex flex-col gap-2">
                  <a href="mailto:uzfiltr@mail.ru">uzfiltr@mail.ru</a>
                  <a href="mailto:epl-uz@mail.ru">epl-uz@mail.ru</a>
                  <a href="mailto:khferuzbek@gmail.com">khferuzbek@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center flex-wrap w-full">
              
              </div>
            </div>
            
            <div className="w-[48%] p-2 flex flex-wrap justify-between items-center border rounded">
              <div className="flex items-center flex-wrap w-[48%] gap-4">
                <div className="rounded-full w-12 aspect-1 bg-gray-300 flex justify-center items-center">
                  <BiPhone className="text-lg" size={20}/>
                </div>
                <div className="flex flex-col gap-2">
                  <a href="tel:+998779992225">+998(77)999-22-25</a>
                  <a href="tel:+998901899426">+998(90)189-94-26</a>
                  <a href="tel:+998555102221">+998(55)510-22-21</a>
                  <a href="tel:+998903250150">+998(90)325-01-50</a>
                </div>
              </div>
              <div className="flex items-center flex-wrap w-[48%] gap-4">
                <div className="rounded-full w-12 aspect-1 bg-gray-300 flex justify-center items-center">
                  <CiMail className="text-lg" size={20}/>
                </div>
                <div className="flex flex-col gap-2">
                  <a href="mailto:uzfiltr@mail.ru">uzfiltr@mail.ru</a>
                  <a href="mailto:epl-uz@mail.ru">epl-uz@mail.ru</a>
                  <a href="mailto:khferuzbek@gmail.com">khferuzbek@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
          <form className="pb-20">
            <h1 className="font-titleFont font-semibold text-3xl">
              Fill up a Form
            </h1>
            <div className="w-[500px] h-auto py-6 flex flex-col gap-6">
              <div>
                <p className="text-base font-titleFont font-semibold px-2">
                  Name
                </p>
                <input
                  onChange={handleName}
                  value={clientName}
                  className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                  type="text"
                  placeholder="Enter your name here"
                />
                {errClientName && (
                  <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                    <span className="text-sm italic font-bold">!</span>
                    {errClientName}
                  </p>
                )}
              </div>
              <div>
                <p className="text-base font-titleFont font-semibold px-2">
                  Email
                </p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                  type="email"
                  placeholder="Enter your name here"
                />
                {errEmail && (
                  <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                    <span className="text-sm italic font-bold">!</span>
                    {errEmail}
                  </p>
                )}
              </div>
              <div>
                <p className="text-base font-titleFont font-semibold px-2">
                  Messages
                </p>
                <textarea
                  onChange={handleMessages}
                  value={messages}
                  cols="30"
                  rows="3"
                  className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor resize-none"
                  type="text"
                  placeholder="Enter your name here"
                ></textarea>
                {errMessages && (
                  <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                    <span className="text-sm italic font-bold">!</span>
                    {errMessages}
                  </p>
                )}
              </div>
              <button
                onClick={handlePost}
                className="w-44 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200"
              >
                Post
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Contact;
