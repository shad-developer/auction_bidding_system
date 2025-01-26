import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { PrimaryButton } from '../common/Design'

const SearchBox = () => {
  return (
    <>
    <form>
        <label htmlFor="search" className='mb-2 text-sm font-medium text-gray-800 sr-only'>
            Search
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 start-2 flex items-center p-3 pointer-events-none">
                <IoSearchOutline color='black' size={25}/>
            </div>
            <input type="text" className='block shadow-md w-full p-6 ps-16 text-sm text-gray-800 bg-gray-50 outline-none rounded-full' placeholder='Search here' />
         <PrimaryButton className="absolute end-2.5 bottom-2">Search</PrimaryButton>
        </div>
    </form> 
    </>
  )
}

export default SearchBox
