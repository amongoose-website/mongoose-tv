import path from 'path'
import ReactPlayer from 'react-player'
import React, { useRef, useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'


import Icon from './Icon'
import useSiteMetadata from './SiteMetadata'
import { useRouter } from 'next/router'


const VideoUpload = () => {
    const router = useRouter()
    const [file, setFile] = useState<File | null>(null)
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dvdNumber: '',
        episodeNumber: '',
        isDvd: false
    })
    
    const [id, setId] = useState('')

    const [submitting, setSubmitting] = useState(false)
    const { domain } = useSiteMetadata()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        if (!file) return

        setSubmitting(true)
        
        const config: AxiosRequestConfig = {
            onUploadProgress: progressEvent => {
                const percentComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                setProgress(percentComplete)
            }
        }

        try {
            const response = await axios.post(`/api/upload`, data, config)
            setId(response.data.id)
            
        } catch(error: any) {
            setError(error.message)
        }
            return true
        }

        function handleSetFile(event: React.ChangeEvent<HTMLInputElement>) {
            const files = event.target.files
            if (files?.length) {
                setFile(files[0])
            }
        }

        return (
            <div>
                <div className={`${submitting ? '' : 'hidden'} z-10 fixed inset-0 bg-zinc-500 bg-opacity-75 transition-opacity`}>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div
                            className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                            <div
                                className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div
                                            className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <Icon className='text-blue-500' name='backup' />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900"
                                                id="modal-title">Upload Progress</h3>
                                            <div className="relative pt-1">
                                                <div className="flex mb-2 items-center justify-between">
                                                    <div className="text-right">
                                                        <span className="text-xs font-semibold inline-block text-blue-600">
                                                            {progress}%
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                                                    <div style={{width: `${progress}%`}}
                                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500">
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">Once your video has completed uploading, it will be available on {domain}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button type="button"
                                        className={`${progress < 100 ? 'hidden' : ''} w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm`}
                                        onClick={() => {
                                            router.push(`/watch?v=${id}`)
                                        }}>
                                        Done
                                    </button>
                                    <button type="button"
                                        className={`${progress < 100 ? '' : 'hidden'} mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}
                                        onClick={() => {
                                            setSubmitting(false)
                                            setProgress(0)
                                        }}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <form method='post' onSubmit={handleSubmit}>
                    <div className="flex flex-col justify-center md:w-min min-w-fit gap-2">
                        <label htmlFor="file"
                            className="px-24 flex flex-col justify-center items-center w-full h-64 bg-zinc-50 rounded-lg border-2 border-zinc-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:hover:border-zinc-500 dark:hover:bg-zinc-600 mb-5">
                            <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                <Icon className='text-zinc-500 text-3xl' name='backup' />
                                <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400 text-center"><span
                                        className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">MP4</p>
                            </div>
                            <input id='file' type="file" name='file' accept='.mp4' className="hidden"
                                onChange={handleSetFile} />
                        </label>
                        
                        {file && <>
                            <div className='md:w-min min-w-fit my-4'>
                                <span className='my-5'><b>Video To Upload:</b> {file.name}</span>
                                <ReactPlayer
                                    url={URL.createObjectURL(file)}
                                    className='group-first:rounded-lg'
                                    width='100%'
                                    height='auto'
                                    muted
                                    controls/>
                            </div>
                            
                            <label htmlFor="thumbnailTimestamp" className='text-base font-bold'>Thumbnail Timestamp
                                <span className='text-red-500'>*</span>
                            </label>
                            <input type="text" name="thumbnailTimestamp" id="thumbnailTimestamp"
                                defaultValue='00:00:20' required
                                className='dark:bg-zinc-700 px-3 py-2 text-base rounded border-solid border-2 dark:border-zinc-600' />
                            
                            <label htmlFor="title" className='text-base font-bold'>Title <span
                                    className='text-red-500'>*</span></label>
                            <input type="text" name="title" id="title"
                                defaultValue={path.parse(file.name).name} required
                                className='dark:bg-zinc-700 px-3 py-2 text-base rounded border-solid border-2 dark:border-zinc-600' />
                            
                            <label htmlFor="description" className='text-base font-bold'>Description</label>
                            <textarea name="description" id="description" placeholder='Enter a description..'
                                className='dark:bg-zinc-700 px-3 py-2 dark:text-zinc-200 text-base rounded border-solid border-2 dark:border-zinc-600 h-44' />
                            
                            <label className='flex items-center'>
                                <input 
                                type="checkbox" 
                                checked={formData.isDvd} 
                                className="bg-blue-400 my-5 mr-3 w-5 h-5" 
                                onChange={() => setFormData({ ...formData, isDvd: !formData.isDvd })}/> 
                                 This video is a part of a DVD set
                            </label>
                            
                            {formData.isDvd && <>
                                <div className="mb-3 flex flex-col gap-2">
                                    <label htmlFor="dvdNumber" className='text-base font-bold'>DVD Number<span
                                        className='text-red-500'>*</span></label>
                                    <input type="text" name="dvdNumber" id="dvdNumber"
                                        placeholder='101'
                                        className='dark:bg-zinc-700 px-3 py-2 text-base rounded border-solid border-2 dark:border-zinc-600' />
                                    <label htmlFor="episodeNumber" className='text-base font-bold'>Episode Number<span
                                            className='text-red-500'>*</span></label>
                                    <input type="text" name="episodeNumber" id="episodeNumber"
                                        placeholder='004'
                                        className='dark:bg-zinc-700 px-3 py-2 text-base rounded border-solid border-2 dark:border-zinc-600' />
                                </div>
                            </>}
                        </>}
                    <button type='submit' className='text-white bg-blue-500 rounded px-5 py-2 w-fit'>Upload Video</button>
                </div>
            </form>
        </div>
    )
}

export default VideoUpload