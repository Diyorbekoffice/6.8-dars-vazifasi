import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const productNameRef = useRef(null);
  const productPriceRef = useRef(null);
  const navigate = useNavigate();
  const productsRef = useRef([]); 

  useEffect(() => {
    fetch('https://auth-rg69.onrender.com/api/products/all')
      .then((response) => response.json())
      .then((data) => {
        productsRef.current = data; 
        renderProducts(); 
      })
      .catch((error) => console.error(error));
  }, []);

  const renderProducts = () => {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; 
    productsRef.current.forEach((product, index) => {
      const li = document.createElement('li');
      li.className = 'flex justify-between p-2 border-b border-gray-300';
      li.innerHTML = `<span>${product.name}</span><span>${product.price} so'm</span>`;
      productList.appendChild(li);
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    const productName = productNameRef.current.value;
    const productPrice = productPriceRef.current.value;

    if (!productName) {
      alert('Iltimos, mahsulot nomini kiriting.');
      productNameRef.current.focus();
      return;
    }

    if (!productPrice) {
      alert('Iltimos, mahsulot narxini kiriting.');
      productPriceRef.current.focus();
      return;
    }

    const priceNumber = parseFloat(productPrice);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      alert('Iltimos, togri mahsulot narxini kiriting.');
      productPriceRef.current.focus();
      return;
    }

    fetch('https://auth-rg69.onrender.com/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: productName, price: priceNumber }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(`Xatolik: ${data.message}`);
        } else {
          alert('Mahsulot muvaffaqiyatli qoshildi.');
          productNameRef.current.value = '';
          productPriceRef.current.value = '';
          productsRef.current.push({ name: productName, price: priceNumber });
          renderProducts(); 
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="flex flex-col w-[500px] bg-green-500 p-5 gap-7 rounded-lg">
        
        <h3 className="text-center font-bold text-yellow-100">Products</h3>

        <input ref={productNameRef} className="p-3 rounded-md w-full" type="text" placeholder="Enter product name..." />
        <input ref={productPriceRef} className="p-3 rounded-md w-full" type="number" placeholder="Enter product price..."  />

        <div className='flex justify-between'>
          <button onClick={handleAddProduct} className="p-3 w-80 rounded-md bg-yellow-500 text-slate-100 hover:bg-yellow-600"> Add Product </button>
          <button className="p-3 rounded-md bg-red-500 text-white hover:bg-red-600" onClick={() => navigate('/login')}> Log Out </button>
        </div>

      </div>

      <div className="mt-5">
        <h4 className="font-bold text-yellow-900">Mahsulotlar Ro'yxati:</h4>
        <ul id="productList" className="bg-white rounded-lg p-5"> </ul>
      </div>
    </div>
  );
}

export default Home;
