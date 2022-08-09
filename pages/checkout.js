import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';

const checkout = ({ cart, subTotal, addToCart, removeFromCart }) => {
  const initiatePayment = async () => {

    let oid = Math.floor(Math.random() * Date.now());
    // Get a transaction token
    const data = { cart, subTotal, oid, email: "email" };
    let a = await fetch('/api/pretransaction', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }) 
      let txnRes = await a.json()
      console.log(txnRes)
      const txnToken = txnRes.txnToken

    var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
        "orderId": oid, /* update order id */
        "token": txnToken, /* update token value */
        "tokenType": "TXN_TOKEN",
        "amount": subTotal /* update amount */
      },
      "handler": {
        "notifyMerchant": function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        }
      }
    };

    window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
      // after successfully updating configuration, invoke JS Checkout
      window.Paytm.CheckoutJS.invoke();
    }).catch(function onError(error) {
      console.log("error => ", error);
    });
  }

  return (
    <div className='container m-auto'>
      <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" /></Head>
      <Script type="application/javascript" crossorigin="anonymous" src={'https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/iulcQM33797209558898.js'} />
      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <h2 className='font-bold text-xl'>1. Delivery Details</h2>
      <div className="flex mx-auto my-1">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea cols="30" rows="2" id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
        </div>
      </div>
      <div className="flex mx-auto my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input type="number" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="flex mx-auto my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">state</label>
            <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input type="number" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>

      <h2 className='font-semibold text-xl'>2. Review Cart Items & Pay</h2>
      <div className="sideCart bg-pink-100 p-6 m-4">

        <ul className='list-decimal font-semibold'>
          {Object.keys(cart).length == 0 && <div className='left-0 font-semibold'>Your cart is empty!</div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="items flex my-3">
                <div className='font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                <div className='flex items-center justify-center w-1/3 text-2xl'>
                  <AiOutlineMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-xl' />
                  <span className='mx-2 text-sm'>{cart[k].qty}</span>
                  <AiOutlinePlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-xl' />
                </div>
              </div>
            </li>
          })
          }
        </ul>
        <span className='font-bold'>Subtotal: ₹{subTotal}</span>
      </div>
      <Link href={'/checkout'}><button onClick={initiatePayment} className="flex font-semibold mx-8 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg">Pay ₹{subTotal}</button>
      </Link>

    </div>
  )
}

export default checkout