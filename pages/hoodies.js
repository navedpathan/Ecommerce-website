import React from 'react';
import Link from 'next/link';
import Product from "../models/Product";
import mongoose from 'mongoose';
import Image from "next/image"

const hoodies = ({ products }) => {
  return (
    <div><section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 justify-center">

        {Object.keys(products).length==0 && <p>Sorry, all the hoodies are currently out of stocks. New stock coming soon. Stay tuned!</p>} 
          {Object.keys(products).map((item) => {
            return <Link key={products[item]._id} passHref={true} href={`/product/${products[item].slug}`}>
              <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-5">
                <a className="block rounded overflow-hidden">
                  <Image alt="ecommerce" className="m-auto block" src={products[item].img} height='400' width='360' />
                </a>
                <div className="mt-4 text-center">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Hoodies</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                  <p className="mt-1">₹{products[item].price}</p>
                  <div className="mt-1">
                    {products[item].size.includes('S') && <span className='border border-gray-300 px-1 mx-1'>S</span>}
                    {products[item].size.includes('M') && <span className='border border-gray-300 px-1 mx-1'>M</span>}
                    {products[item].size.includes('L') && <span className='border border-gray-300 px-1 mx-1'>L</span>}
                    {products[item].size.includes('XL') && <span className='border border-gray-300 px-1 mx-1'>XL</span>}
                    {products[item].size.includes('XXL') && <span className='border border-gray-300 px-1 mx-1'>XXL</span>}
                  </div>
                  <div className="mt-1">
                  {products[item].color.includes('red') && <button className='border-2 border-gray-300 ml-1 bg-red-600 rounded-full w-6 h-6 focus:outline-none'></button>}
                  {products[item].color.includes('blue') && <button className='border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none'></button>}
                  {products[item].color.includes('green') && <button className='border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none'></button>}
                  {products[item].color.includes('yellow') && <button className='border-2 border-gray-300 ml-1 bg-yellow-400 rounded-full w-6 h-6 focus:outline-none'></button>}
                  {products[item].color.includes('orange') && <button className='border-2 border-gray-300 ml-1 bg-orange-500 rounded-full w-6 h-6 focus:outline-none'></button>}
                  {products[item].color.includes('purple') && <button className='border-2 border-gray-300 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none'></button>}
                  {products[item].color.includes('pink') && <button className='border-2 border-gray-300 ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none'></button>}
                  {products[item].color.includes('brown') && <button className='border-2 border-gray-300 ml-1 bg-red-800 rounded-full w-6 h-6 focus:outline-none'></button>}
                  {products[item].color.includes('gray') && <button className='border-2 border-gray-300 ml-1 bg-gray-500 rounded-full w-6 h-6 focus:outline-none'></button>}
                  {products[item].color.includes('black') && <button className='border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none'></button>}
                  {products[item].color.includes('white') && <button className='border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none'></button>}
                  </div>
                </div>
              </div>
            </Link>
          })}

        </div>
      </div>
    </section></div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.find({ category: 'hoodies' });
  let hoodies = {};
  for (let item of products) {
    if (item.title in hoodies) {
      if (!hoodies[item.title].color.includes(item.color) && item.availableQty > 0) {
        hoodies[item.title].color.push(item.color)
      }
      if (!hoodies[item.title].size.includes(item.size) && item.availableQty > 0) {
        hoodies[item.title].size.push(item.size)
      }
    }
    else {
      hoodies[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        hoodies[item.title].color = [item.color]
        hoodies[item.title].size = [item.size]
      }
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(hoodies)) },
  }
}


export default hoodies