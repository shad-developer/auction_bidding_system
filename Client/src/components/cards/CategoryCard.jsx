import React from 'react'
import Prototypes from 'prop-types'
import { Title } from '../common/Design'
const CategoryCard = ({item}) => {
  return (
    <>    
    <div className="flex items-center flex-col gap-2 rounded-lg py-8 bg-green_100 shadow-s1">
        <div className="h-24">
            <img src={item.image} className='h-full w-full object-contain' alt="" />
        </div>
        <Title className="uppercase">
          {item.title}
        </Title>
    </div>  
    </>
  )
}

CategoryCard.Prototypes ={
  item: Prototypes.object,
}


export default CategoryCard
