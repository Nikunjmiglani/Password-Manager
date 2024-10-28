import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white  '>
        <div className="mycontainer flex justify-around items-center px-3 py-5 h-14 ">


        <div className="logo font-extrabold text-xl text-white">
            <span className='text-green-700'> &lt;</span>
            Safe
            <span className='text-green-700'>Pass/&gt;</span>
            </div>


        <ul className=''>
            <li className='flex gap-4'>
                
                
            </li>
        </ul>
        <button className='text-white bg-green-700 my-5 rounded-full flex justify-between items-center ring-1 ring-white'>
          <img src="/github.svg" className='invert p-1 w-8' alt="" />
          <a href="https://github.com/Nikunjmiglani" target='_blank'>
          <span className='font-semibold px-1'> Github </span>
          </a>
        </button>
        </div>
    </nav>
  )
}

export default Navbar
