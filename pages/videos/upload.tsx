import { withPageAuthRequired } from '@auth0/nextjs-auth0'

import Layout from '../../components/Layout'
import VideoUpload from '../../components/VideoUpload'

export default withPageAuthRequired(function UploadPage({user}) {
    return (
        <Layout pageTitle='Upload Video'>
            <div className='container mx-auto dark:text-white dark:bg-zinc-800 bg-white rounded p-5 my-3'>
                <h1 className='text-2xl font-bold mb-5'>Upload Video</h1>
                <VideoUpload/>
            </div>
        </Layout>
    )
})