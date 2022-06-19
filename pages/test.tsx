import axios from 'axios'
import { useState } from 'react'

import Layout from '../components/Layout'
import dbConnect from '../lib/dbConnect'


const TestPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        file: ''
    })
    const [file, setFile] = useState(undefined)

    const handleSubmit = async (event: any) => {
        // Disable original event
        event.preventDefault()
        
        const data = new FormData(event.target)

        const response = await axios.post(`/api/test`, data)
    }

    return (
        <Layout>
            <div className='container mx-auto dark:text-white dark:bg-zinc-800 bg-white rounded p-5 my-3'>
                <h1 className='text-2xl font-bold mb-5'>Upload Test</h1>
                <form action='post' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-5 w-min'>
                        <label className='block font-bold text-xl' htmlFor="file">File upload</label>
                        <input 
                            type="file"
                            name="file" 
                            id="file"
                            value={formData.file}
                            onChange={e => {
                                setFormData({...formData, file: e.target.value})
                                if (e?.target?.files?.length)
                                    setFile(e.target.files[0])
                            }}/>
                        <label className='block' htmlFor="title">Title</label>
                        <input 
                            className='bg-zinc-200 rounded border-solid border-zinc-400 border-2 focus:ring-0'
                            type="text" 
                            name="title" 
                            id="title"
                            value={formData.title}
                            onChange={e => {
                                setFormData({...formData, title: e.target.value})
                            }}/>
                        <button className='bg-blue-500 text-white py-2 px-5 w-min rounded' type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default TestPage