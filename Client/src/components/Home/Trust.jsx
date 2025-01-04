import React from 'react'
import { Container, Heading } from '../common/Design'
import { trustList } from '../../assets/data'

const Trust = () => {
  return (
    <>
      <section className="process py-12 relative z-10">
        <Container>
            <Heading title="Trusted by 500+ Companies" subtitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem, maiores."/>
            <div className="content grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-5 mt-8">
                {trustList.map((item,index)=>(
                    <div className="flex item-center justify-between border rounded-lg" key={index}>
                        <div className="flex items-center justify-center">
                            <img src={item.profile} className='w-full h-full rounded-full flex object-contain items-center justify-center' alt="" />
                        </div>
                    </div>
                ))}
            </div>
        </Container>
      </section>
    </>
  )
}

export default Trust
