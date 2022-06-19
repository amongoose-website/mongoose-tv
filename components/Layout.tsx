import React from 'react'
import Head from 'next/head'

import Footer from './Footer'
import Navbar from './Navbar'
import useSiteMetadata from './SiteMetadata'

const Layout = ({ children, pageTitle, footer }: any) => {
    const { title, description } = useSiteMetadata()
    const SpecificFooter = footer || Footer;

    return (
        <>
            <Head>
                <title>{`${pageTitle ? `${pageTitle} | ` : ''}${title}`}</title>
            </Head>
            <Navbar/>
            <div id='app'>
                {children}
            </div>
        </>
    )

}

export default Layout