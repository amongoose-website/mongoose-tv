import React from 'react'
import Head from 'next/head'
import useSiteMetadata from './SiteMetadata'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout = ({ children, pageTitle, footer }: any) => {
    const { title, description } = useSiteMetadata()
    const SpecificFooter = footer || Footer;

    return (
        <>
            <Head>
                <title>{`${pageTitle ? `${pageTitle} | ` : ''}${title}`}</title>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://vjs.zencdn.net/7.19.2/video-js.css" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"/>
            </Head>
            <Navbar/>
            <div id='app'>
                {children}
            </div>
        </>
    )

}

export default Layout