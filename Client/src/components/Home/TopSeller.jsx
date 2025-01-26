import React from 'react'
import { Caption, Container, Heading, ProfileCard, Title } from '../common/Design'
import { topSellerList } from '../../assets/data'

const TopSeller = () => {
  return (
    <>
      <section className='process py-12'>
        <Container>
            <Heading title="Top Seller" subtitle="Lorem ipsum dolor sit amet."/>
            <div className="content grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-8">
                {
                    topSellerList.map((item,index)=>(
                        <div  key={index} className="flex items-center justify-between border p-3 rounded-lg">
                            <div className="flex items-center gap-3">
                                <ProfileCard className="h-16 w-16">
                                    <img src={item.profile} className='w-full h-full rounded-full object cover' alt="" />
                                </ProfileCard>
                                <div className="div">
                                    <Title level={5} className="font-normal text-xl">
                                        {item.title}
                                    </Title>
                                    <Caption>
                                        ${item.amount*item.id}
                                    </Caption>
                                </div>
                            </div>
                          
                        </div>
                ))}
            </div>
           
        </Container>
      </section>
    </>
  )
}

export default TopSeller
