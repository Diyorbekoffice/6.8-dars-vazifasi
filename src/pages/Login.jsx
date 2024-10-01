import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!username) {
      alert('Iltimos, username kiriting.');
      usernameRef.current.focus();
      return;
    }

    if (!password) {
      alert('Iltimos, parol kiriting.');
      passwordRef.current.focus();
      return;
    }

    fetch('https://auth-rg69.onrender.com/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert('Login yoki parol xato. Iltimos, qaytadan urinib ko\'ring.');
        } else {
          alert('Muvaffaqiyatli kirildi.');
          navigate('/home');
        }
      })
      .catch(error => console.error('Xatolik yuz berdi:', error));
  };

  const handleRegisterRedirect = () => {
    navigate('/');
  };

  return (
    <div className='flex justify-center mt-20'>
      <div className="flex flex-col w-[500px] bg-green-500 p-5 gap-7 rounded-lg">

        <h3 className='text-center font-bold text-yellow-100'>Sign in</h3>

        <input ref={usernameRef} className='p-3 rounded-md w-full' type="text" placeholder='Enter username...' />
        <input ref={passwordRef} className='p-3 rounded-md w-full' type="password" placeholder='Confirm your password...' />

        <h2 onClick={handleRegisterRedirect} className='text-blue-700 cursor-pointer underline' > Are you not registered? </h2>

        <button onClick={handleLogin}  className="p-3 rounded-md w-full bg-yellow-500 text-slate-100 hover:bg-yellow-600" > Login </button>
        
      </div>
    </div>
  );
}

export default Login;
