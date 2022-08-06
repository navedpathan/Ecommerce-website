import { useRouter } from 'next/router'
import { useState } from 'react';
import Image from 'next/image'
import mongoose from 'mongoose';
import Product from '../../models/Product';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Post = ({ addToCart, buyNow, product, variants }) => {
  console.log(product, variants)
  const router = useRouter()
  const { slug } = router.query

  const [pin, setPin] = useState();
  const [service, setService] = useState();

  const checkServiceAvailability = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    let pinJson = await pins.json();

    if (pinJson.includes(parseInt(pin))) {
      setService(true);
      toast.success('Your pincode is serviceable!', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    else {
      setService(false);
      toast.error('Sorry, Your pincode not serviceable!', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }

  const pinCode = (e) => {
    setPin(e.target.value)
  }

  const [color, setColor] = useState(product.color);
  const [size, setSize] = useState(product.size);

  const refreshVariant = (newsize, newcolor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newcolor][newsize]['slug']}`
    window.location = url;
  }

  return <>
    <section className="text-gray-600 body-font overflow-hidden">
      <ToastContainer position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      <div className="container px-5 py-16 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <Image alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-24 object-cover object-top rounded" src={product.img} height='400' width='360'/>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">Slaters</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} ({product.size}/{product.color})</h1>

            <p className="leading-relaxed">{product.desc}</p>

            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">

              <div className="flex">
                <span className="mr-3">Color</span>
                {Object.keys(variants).includes('white') && Object.keys(variants['white']).includes(size) && <button onClick={() => { refreshVariant(size, 'white') }} className={`border-2 bg-white rounded-full w-6 h-6 focus:outline-none ${color == 'white' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('red') && Object.keys(variants['red']).includes(size) && <button onClick={() => { refreshVariant(size, 'red') }} className={`border-2 ml-1 bg-red-600 rounded-full w-6 h-6 focus:outline-none ${color == 'red' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('blue') && Object.keys(variants['blue']).includes(size) && <button onClick={() => { refreshVariant(size, 'blue') }} className={`border-2 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none ${color == 'blue' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('green') && Object.keys(variants['green']).includes(size) && <button onClick={() => { refreshVariant(size, 'green') }} className={`border-2 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none ${color == 'green' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('yellow') && Object.keys(variants['yellow']).includes(size) && <button onClick={() => { refreshVariant(size, 'yellow') }} className={`border-2 ml-1 bg-yellow-400 rounded-full w-6 h-6 focus:outline-none ${color == 'yellow' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('orange') && Object.keys(variants['orange']).includes(size) && <button onClick={() => { refreshVariant(size, 'orange') }} className={`border-2 ml-1 bg-orange-500 rounded-full w-6 h-6 focus:outline-none ${color == 'orange' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('purple') && Object.keys(variants['purple']).includes(size) && <button onClick={() => { refreshVariant(size, 'purple') }} className={`border-2 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none ${color == 'purple' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('pink') && Object.keys(variants['pink']).includes(size) && <button onClick={() => { refreshVariant(size, 'pink') }} className={`border-2 ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none ${color == 'pink' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('brown') && Object.keys(variants['brown']).includes(size) && <button onClick={() => { refreshVariant(size, 'brown') }} className={`border-2 ml-1 bg-red-800 rounded-full w-6 h-6 focus:outline-none ${color == 'brown' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('gray') && Object.keys(variants['gray']).includes(size) && <button onClick={() => { refreshVariant(size, 'gray') }} className={`border-2 ml-1 bg-gray-500 rounded-full w-6 h-6 focus:outline-none ${color == 'gray' ? 'border-black' : 'border-gray-300'}`}></button>}
                {Object.keys(variants).includes('black') && Object.keys(variants['black']).includes(size) && <button onClick={() => { refreshVariant(size, 'black') }} className={`border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${color == 'black' ? 'border-black' : 'border-gray-300'}`}></button>}
              </div>

              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select value={size} onChange={(e) => { refreshVariant(e.target.value, color) }} className="rounded border appearance-none bg-white border-gray-300 py-1 focus:outline-none focus:ring-pink-200 focus:border-pink-500 text-base pl-1 pr-8">
                    {Object.keys(variants[color]).includes('S') && <option>SM</option>}
                    {Object.keys(variants[color]).includes('M') && <option>M</option>}
                    {Object.keys(variants[color]).includes('L') && <option>L</option>}
                    {Object.keys(variants[color]).includes('XL') && <option>XL</option>}
                    {Object.keys(variants[color]).includes('XXL') && <option>XXL</option>}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>
              <button onClick={() => { buyNow(slug, 1, product.price, product.title, size, color) }} className="flex ml-8 text-white bg-pink-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-pink-600 rounded">Buy Now</button>
              <button onClick={() => { addToCart(slug, 1, product.price, product.title, size, color) }} className="flex ml-4 text-white bg-pink-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-pink-600 rounded">Add to Cart</button>
              {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button> */}
            </div>
            <div className="flex"></div>
            <div className="pin mt-4 flex space-x-3 text-sm">
              <input onChange={pinCode} type="text" className='px-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Enter your Pincode' />
              <button onClick={checkServiceAvailability} className="text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Check</button>
            </div>
            {(!service && service != null) && <div className="text-red-700 text-sm mt-1">
              Sorry! We do not deliver to this pincode yet
            </div>}
            {(service && service != null) && <div className="text-green-700 text-sm mt-1">
              Yay! This pincode is servicable
            </div>}
          </div>
        </div>
      </div>
    </section>
  </>
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let product = await Product.findOne({ slug: context.query.slug });
  let variants = await Product.find({ title: product.title, category: product.category });
  let colorSizeSlug = {}

  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
    else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: { product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) },
  }
}

export default Post