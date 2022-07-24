import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineShoppingCart, AiOutlineClose, AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { MdAccountCircle } from 'react-icons/md';

const Navbar = ({logout, user, cart, addToCart, removeFromCart, clearCart, subTotal}) => {
  const [dropdown, setDropdown] = useState(false);
  
  const ref = useRef();
  const toggleCart = () => {
    if(ref.current.classList.contains('translate-x-full')){
     ref.current.classList.remove('translate-x-full')
     ref.current.classList.add('translate-x-0')
    }
    else if(!ref.current.classList.contains('translate-x-full')){
     ref.current.classList.remove('translate-x-0')
     ref.current.classList.add('translate-x-full')
    }
  }
  
  return (
    <div className='flex flex-col md:flex-row md:justify-start justify-center items-center py-2 mb-1 shadow-md sticky top-0 bg-white z-0'>
      <div className="logo md:mx-5 mr-auto cursor-pointer">
        <Link href="/"><a><Image src="/logo.png" height={35} width={150} /></a></Link>
      </div>
      <div className="nav">
        <ul className='flex items-center space-x-6 font-bold md:text-md'>
          <Link href='/tshirts'><a><li className='hover:text-pink-600'>Tshirts</li></a></Link>
          <Link href='/hoodies'><a><li className='hover:text-pink-600'>Hoodies</li></a></Link>
          <Link href='/stickers'><a><li className='hover:text-pink-600'>Stickers</li></a></Link>
          <Link href='/mugs'><a><li className='hover:text-pink-600'>Mugs</li></a></Link>
        </ul>
      </div>

      <div className="cart absolute right-0 top-5 mx-5 flex items-center cursor-pointer">
        <span onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}}>
      {dropdown && <div onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className="absolute right-10 bg-white border shadow-lg top-6 rounded-md px-5 py-4 w-32">
        <ul>
         <Link href={'/myaccount'}><a><li className='py-1 hover:text-pink-700 text-sm cursor-pointer'>My Account</li></a></Link>
         <Link href={'/orders'}><a><li className='py-1 hover:text-pink-700 text-sm cursor-pointer'>Orders</li></a></Link>
         <li onClick={logout} className='py-1 hover:text-pink-700 text-sm cursor-pointer'>Logout</li>
        </ul>
      </div>}
      {user.value && <MdAccountCircle className='text-2xl md:text-2xl mr-3' />}
      </span>     
          
         {!user.value && <Link href={'/login'}>
            <a><button className='bg-pink-500 hover:bg-pink-600 px-2 py-1 rounded-md text-sm text-white mx-4'>Login</button></a>
          </Link> }
          <AiOutlineShoppingCart onClick={toggleCart} className='text-xl md:text-2xl'/>
      </div>      

                            {/* SideCart */}

      <div ref={ref} className={`w-70 h-screen overflow-y-scroll absolute top-0 right-0 bg-pink-100 p-10 transform transition-transform ${Object.keys(cart).length==0 ? 'translate-x-full' : 'translate-x-0'}`}>
        <h2 className='font-bold text-xl text-center mb-6'>Shopping cart</h2>
        <span onClick={toggleCart} className="absolute top-4 right-2 cursor-pointer ">
          <AiOutlineClose /></span>

      <ol className='list-decimal font-semibold'>
        {Object.keys(cart).length==0 && <div className='text-center font-semibold'>Your cart is empty!</div>}
        {Object.keys(cart).map((k) => {
          return <li key={k}> 
          <div className="items flex my-3">
          <div className='w-2/3 font-semibold mr-6'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
          <div className='flex items-center justify-center w-1/3 text-2xl'>
            <AiOutlineMinusCircle onClick={()=>{removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)}} className='cursor-pointer text-xl'/>
          <span className='mx-2 text-sm'>{cart[k].qty}</span>          
            <AiOutlinePlusCircle onClick={()=>{addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)}} className='cursor-pointer text-xl'/>
          </div>
          </div>
        </li>})
        }
      </ol>

      <span className='font-bold'>Subtotal: ₹{subTotal}</span>
      <div className="flex">
      <Link href={'/checkout'}><button className="flex my-4 text-white bg-pink-500 border-0 py-1 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg">Checkout</button>
      </Link>
      <button onClick={clearCart} className="flex mx-2 my-4 text-white bg-pink-500 border-0 py-1 px-2 focus:outline-none hover:bg-pink-600 rounded text-lg">Clear Cart</button>
      </div>
      </div>
    </div>
  )
}

export default Navbar