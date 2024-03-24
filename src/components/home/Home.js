import React from 'react'
import { Link } from 'react-router-dom';
import Layout from '../common/Layout'
import Carousel from '../common/Carousel'

const UiProduct = [
  {
    id: 1,
    title : "Weather",
    description: "Check your weather forecast",
    classes: "bg-gradient-to-br from-green-400 to-blue-500 hover:bg-gradient-to-br hover:from-pink-400 hover:to-purple-500",
    btnClasses : "bg-teal-600",
    imgUrl : `${process.env.PUBLIC_URL}/cloudy.svg`,
    link : "/weather"
  },
  {
    id: 2,
    title : "Widgets",
    description: "Description of Product 2",
    classes: "bg-gradient-to-br from-yellow-400 to-green-500 hover:bg-gradient-to-br hover:from-pink-400 hover:to-purple-500",
    btnClasses : "bg-lime-500",
    imgUrl : "https://img.freepik.com/free-vector/neon-home-screen-template-smartphone_23-2148736061.jpg?t=st=1710361102~exp=1710364702~hmac=c68c8a13eab86a3cf31b2cfa961683d9d6901676948c95c394d92f57e1bebd65&w=1380",
    link : "/"
  },
  {
    id: 3,
    title : "Product Name 3",
    description: "Description of Product 3",
    classes : "bg-gradient-to-br from-blue-400 to-purple-500 hover:bg-gradient-to-br hover:from-pink-400 hover:to-purple-500",
    btnClasses : "bg-purple-400",
    imgUrl: "https://img.freepik.com/free-photo/pink-headphones-wireless-digital-device_53876-96804.jpg?w=1380&t=st=1710416451~exp=1710417051~hmac=aa08c4d4ead6b3bdbeec912e882f8a65f40185153fa6dd83bbc3d382e8b9e2e2",
    link : "/"
  },
  {
    id: 4,
    title : "Product Name 4",
    description: "Description of Product 4",
    classes: "bg-gradient-to-br from-rose-400 to-yellow-500 hover:bg-gradient-to-br hover:from-pink-400 hover:to-purple-500",
    btnClasses : "bg-orange-400",
    imgUrl: "https://img.freepik.com/free-photo/cloud-technology-with-futuristic-hologram-smartwatch_53876-124625.jpg?t=st=1710417013~exp=1710420613~hmac=a534cada8674fdf57b240d95ec83191e46ec3dff66dc88f48b863d3ff36ccc57&w=1380",
    link : "/"
  }
];


const Home = () => {
  return (
    <Layout>
      <div className='flex flex-wrap w-full h-full items-stretch justify-between gap-3'>
        <div className='flex w-full min-h-[300px]'>
          <Carousel />
        </div>
      </div>
      <div className="mt-3">
        <h2 className="text-xl font-semibold mb-4">Web Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {UiProduct.map(item => {
            return (
              <div key={item.id} className={`${item.classes} flex items-center p-4 rounded-lg shadow-md transition duration-300 ease-in-out`}>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-slate-50">{item.title}</h3>
                  <p className="text-slate-100">{item.description}</p>
                  {/* Use Link for navigation */}
                  <Link to={item.link} className={`${item.btnClasses} flex w-24 justify-center mt-4 text-[12px] uppercase text-slate-200 hover:text-slate-50 font-semibold py-2 px-4 border border-slate-200 rounded-full transition duration-300 ease-in-out`}>Open</Link>
                </div>
                <div className="w-32 h-32 bg-slate-200 rounded-md ml-4 overflow-hidden flex items-center justify-center">
                  <img src={item.imgUrl} className='object-cover h-full' alt="" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Home