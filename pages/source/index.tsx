import BottomNavBar from '@/components/BottomNavBar'
import ContentContainer from '@/components/ContentContainer'
import PageContainer from '@/components/PageContainer'
import SideBar from '@/components/SideBar'
import Head from 'next/head'
import React from 'react'

export default function Source() {
    return (
        <PageContainer>
            <Head>
                <title>Source Code</title>
            </Head>
            <SideBar />
            <BottomNavBar />
            <ContentContainer>
                <h2 className="text-gray-700 text-2xl font-semibold pl-2 mb-3">Source Code</h2>
                <a className='ml-2 text-blue-400' href="https://github.com/muttaqinrizal/ecommerce-product" target="_blank" rel="noopener noreferrer">Click Here!</a>
            </ContentContainer>
        </PageContainer>
    )
}
