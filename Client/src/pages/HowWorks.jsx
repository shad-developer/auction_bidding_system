import React from 'react'
import { Container, Heading, Title } from '../components/common/Design'
import { processList } from '../assets/data'
// import Process from '../../components/Home/Process'


const HowWorks = () => {
  return (
    <>
       <section className="process mt-5 py-24 bg-primary relative">
        <Container className="py-16 pt-24 text-white">
            <Heading title="How it Works" subtitle="Easy 4 steps to win"/>

            <div className="content grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
                {processList.map((item , index)=>(
                    <div className="p-8 rounded-xl  flex items-center justify-center flex-col text-center bg-[rgba(38,90,77,0.62)]" key={index}>
                        <div className="image w-16 h-16">
                            <img src={item.cover} alt="" />
                        </div>
                        <Title level={5} className="my-3 text-white font-normal">
                            {item.title}
                        </Title>
                        <p className='text-gray-300'>{item.desc}</p>                        
                    </div>
                ))}

            </div>
        </Container>
      </section>
    </>
  )
}

export default HowWorks
