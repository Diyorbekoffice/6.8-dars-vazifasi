import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!username) {
      alert('Iltimos, username kiriting.');
      usernameRef.current.focus();
      return;
    }

    if (username.length < 3) {
      alert('Username kamida 3 ta belgidan iborat bolishi kerak.');
      usernameRef.current.focus();
      return;
    }

    if (!email) {
      alert('Iltimos, email kiriting.');
      emailRef.current.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Iltimos, togri email kiriting.');
      emailRef.current.focus();
      return;
    }

    if (!password) {
      alert('Iltimos, parol kiriting.');
      passwordRef.current.focus();
      return;
    }

    fetch('https://auth-rg69.onrender.com/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(`Xatolik: ${data.message}`);
        } else {
          alert('Muvaffaqiyatli ro\'yxatdan o\'tildi.');

          usernameRef.current.value = '';
          emailRef.current.value = '';
          passwordRef.current.value = '';

          navigate('/login');
        }
      })
      .catch(error => console.error('Xatolik yuz berdi:', error));
  };
  const handleRegisterRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="flex flex-col w-[500px] bg-green-500 p-5 gap-7 rounded-lg">

        <h3 className="text-center font-bold text-yellow-100">Sign up</h3>

        <input ref={usernameRef} className="p-3 rounded-md w-full" type="text" placeholder="Enter username..." />
        <input ref={emailRef}  className="p-3 rounded-md w-full"type="email" placeholder="Enter email..."/>
        <input ref={passwordRef} className="p-3 rounded-md w-full" type="password"  placeholder="Confirm your password..."  />

        <h2 onClick={handleRegisterRedirect} className='text-blue-700 cursor-pointer underline' > Do you have an account? </h2>

        <button onClick={handleSubmit} className="p-3 rounded-md w-full bg-yellow-500 text-slate-100 hover:bg-yellow-600" > Register </button>
        
      </div>
    </div>
  );
}

export default Register;
