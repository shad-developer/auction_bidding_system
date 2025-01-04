import React from 'react'
import { Container, Heading, Title } from '../common/Design'
import { topList } from '../../assets/data'

const TopCollections = () => {
  return (
    <>
    <section className="process py-12 z-10 relative">
        <Container>
            <Heading title="Top Collections" subtitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa, aut?"/>
            <div className="content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-8">
                {topList.map((item,index) => (
                    <div className="bg-green_100 relative rounded-xl p-3" key={index}>
                        <div className="h-56">
                            <img src={item.img1} className='h-full w-full object-cover rounded-xl' alt="" />
                        </div>
                        <div className="absolute top-[45%] left-[38%] w-24 h-24  border-4 border-green rounded-full">
                            <img src={item.img2} className='h-full w-full object-cover rounded-full' alt="" />
                        </div>
                        <div className="grid grid-cols-3 gap-3 mt-3">
                            <div className="h-28">
                                <img src={item.img3} className='h-full w-full object-cover rounded-xl' alt="" />
                            </div>
                            <div className="h-28">
                                <img src={item.img4} className='h-full w-full object-cover rounded-xl' alt="" />
                            </div>
                            <div className="h-28">
                                <img src={item.img2} className='h-full w-full object-cover rounded-xl' alt="" />
                            </div>
                        </div>
                        <Title level={6} className="my-3 text-black text-center font-normal">
                                                    {item.catgeory}
                                                </Title>
                    </div>
                    
                ))}
            </div>
        </Container>
    </section>
      
    </>
  )
}

export default TopCollections
