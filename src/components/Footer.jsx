import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
        <div className='w-full mt-10 bg-black h-[25vh] flex flex-col md:flex-row justify-center items-center gap-2' >
            <div  className='flex gap-4 items-center' >
            <h3>Made by <span className='kaushan'  >Waleed Ahmad</span></h3>
            <img src="https://scontent.flhe32-1.fna.fbcdn.net/v/t39.30808-6/394668820_278497571825042_8984893206950098085_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=100&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=NEphHHmhmL0Q7kNvgGlHyRH&_nc_oc=AdhlVWNFUHKGrAEnt9FFgMGzZO9FM1MCCLe8iSpYw4j_Up38sGDhbGmlssucZxR_tY0&_nc_pt=1&_nc_zt=23&_nc_ht=scontent.flhe32-1.fna&_nc_gid=AxB66K9v0gt10jbP8uL6zdh&oh=00_AYARyRo51xghBkgJYp0AruV_ijgC71LABJxDn6LJL5Gp5w&oe=677CC3A9" alt="" 
            className='w-10 h-10 rounded-full'
            />
            </div>

            <Link to='/feedback' className='text-white' >your feedback goes here 😊</Link>
        </div>
    </div>
  )
}

export default Footer