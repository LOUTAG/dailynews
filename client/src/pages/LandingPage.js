import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Spinner from "../components/Spinner";

const LandingPage = () => {
  /*** USESTATE ***/
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /*** CONST ***/
  const navigate = useNavigate();

  /*** USEFFECT ***/

  useEffect(()=>{
    if(localStorage.getItem('dailynews-user')){
      navigate('/home');
    };
  },[]);

  /*** HELPERS ***/
  const openRegister = () => {
    setShowLoginForm(false);
    setShowRegisterForm(true);
  };

  const openLogin = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  const closeForm = () => {
    resetForm();
    setShowLoginForm(false);
    setShowRegisterForm(false);
  };

  const resetForm=()=>{
    setName('');
    setEmail('');
    setPassword('');
  };

  const registerSubmit = (event) => {
    event.preventDefault();
    const addUser=async()=>{
        try{
            const payload ={
                name,
                email,
                password
            };
            setLoading(true);
            const response = await axios.post('/api/register', payload);
            setLoading(false);
            console.log(response.data);
            toast("Registration successfull, Please login", "success");
            setShowRegisterForm(false);
            setShowLoginForm(true);
            resetForm();
        }catch(error){
            console.log(error);
            setLoading(false);
            toast("Something went wrong", "error");
        }
    };
    addUser();
  };

  const loginSubmit = (event) => {
    event.preventDefault();
    const login = async()=>{
        try{
            const payload ={
                email,
                password
            };
            setLoading(true);
            const response = await axios.post('/api/login', payload);
            setLoading(false);
            localStorage.setItem('dailynews-user', JSON.stringify(response.data));
            navigate('/home');
        }catch(error){
            console.log(error);
            setLoading(false);
            toast("Something went wrong", "error");
        }
    };
    login();
  };

  const renderContent = () => {
    if (showLoginForm == false && showRegisterForm == false) {
      return (
        <lottie-player
          src="https://assets5.lottiefiles.com/packages/lf20_qmfs6c3i.json"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></lottie-player>
      );
    } else if (showLoginForm) {
      return (
        <div className="flex flex-col bg-primary h-screen justify-center item-center px-10 relative">
          <AiOutlineClose
            className="absolute top-7 right-7 cursor-pointer text-gray-300 hover:text-white"
            size={50}
            onClick={closeForm}
          />
          <h1 className="text-5xl text-gray-300 text-left w-full font-bold mb-5">
            LOGIN
          </h1>
          <form className="flex flex-col">
            <input
              type="email"
              className="border-2 h-10 w-full border-gray-300 px-2 bg-transparent mb-5 text-white"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              className="border-2 h-10 w-full border-gray-300 px-2 bg-transparent mb-2 text-white"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              className="self-end hover:bg-white bg-gray-300 text-primary px-10 py-3 font-bold"
              type="submit"
              onClick={loginSubmit}
            >
              LOGIN
            </button>
          </form>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col bg-primary h-screen justify-center item-center px-10 relative">
          <AiOutlineClose
            className="absolute top-7 right-7 cursor-pointer text-gray-300 hover:text-white"
            size={50}
            onClick={closeForm}
          />
          <h1 className="text-5xl text-gray-300 text-left w-full font-bold mb-5">
            REGISTER
          </h1>
          <form className="flex flex-col">
            <input
              type="string"
              className="border-2 h-10 w-full border-gray-300 px-2 bg-transparent mb-5 text-white"
              placeholder="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              type="email"
              className="border-2 h-10 w-full hover:bg-white border-gray-300 px-2 bg-transparent mb-5 text-white"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="Password"
              className="border-2 h-10 w-full border-gray-300 px-2 bg-transparent mb-2 text-white"
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="submit"
              className="self-end hover:bg-white bg-gray-300 text-primary px-10 py-3 font-bold"
              onClick={registerSubmit}
            >
              SIGN UP
            </button>
          </form>
        </div>
      );
    }
  };

  return (
    <div className="h-screen flex items-center flex-col sm:flex-row">
        {loading && <Spinner />}
      <div className={`w-full sm:w-1/2 px-10 space-y-5 ${(showLoginForm || showRegisterForm) && 'hidden' } sm:block`}>
        <h1 className="font-bold mt-4 sm:m-0">
          <span className="text-[#2B8F74] text-7xl">DAILY</span>{" "}
          <span className="text-7xl text-gray-700">NEWS</span>
        </h1>
        <p className="text-lg font-semibold">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.
        </p>
        <div className="space-y-2">
          <button
            className="bg-gray-300 px-10 py-3 font-semibold w-full sm:w-[calc(50%-1rem)] sm:mr-2"
            onClick={openLogin}
          >
            LOGIN
          </button>
          <button
            className="bg-[#2B8F74] px-10 py-3 text-white font-semibold w-full sm:w-[calc(50%-1rem)] sm:ml-2"
            onClick={openRegister}
          >
            REGISTER
          </button>
        </div>
      </div>

      <div className="w-full sm:w-1/2">{renderContent()}</div>
    </div>
  );
};

export default LandingPage;
