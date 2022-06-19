
import dbConnect from '../lib/dbConnect'
import Video from '../models/Video'
import Layout from '../components/Layout'
import { ChangeEvent, useState } from 'react'
import Icon from '../components/Icon'
import VideoUpload from '../components/VideoUpload'

function UploadPage() {
    return (
        <Layout pageTitle='Upload Video'>
            <div className='container mx-auto dark:text-white dark:bg-zinc-800 bg-white rounded p-5 my-3'>
                <h1 className='text-2xl font-bold mb-5'>Upload Video</h1>
                <VideoUpload/>
            </div>
        </Layout>
    )
}

export default UploadPage