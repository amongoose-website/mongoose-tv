import axios from 'axios'
import React, { useState } from 'react'

import Icon from './Icon'
import useSiteMetadata from './SiteMetadata'
import VideoPlayer from './VideoPlayer'

const PlaylistEdit = ({playlist}: {playlist: any}) => {
    const [formData, setFormData] = useState(playlist)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        await axios.post(`/api/playlists/edit`, formData)
        setSubmitted(true)
    }

    return (
            <div>
                <div className={`${submitted ? '' : 'hidden'} z-10 fixed inset-0 bg-zinc-500 bg-opacity-75 transition-opacity`}>
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
                                                id="modal-title">Changes Saved</h3>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    <span>The playlist has been updated and is accessible.</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button type="button"
                                        className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm`}
                                        onClick={() => {
                                            setSubmitted(false)
                                        }}>
                                        OK
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <form method='post' onSubmit={handleSubmit}>
                    <div className="flex flex-col justify-center md:w-min min-w-fit gap-2">
                        {playlist && <>
                            <label htmlFor="title" className='text-base font-bold'>Title <span
                                    className='text-red-500'>*</span></label>
                            <input type="text" name="title" id="title"
                                required
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className='dark:bg-zinc-700 px-3 py-2 text-base rounded border-solid border-2 dark:border-zinc-600' />
                            
                            <label htmlFor="description" className='text-base font-bold'>Description</label>
                            <textarea name="description" id="description" placeholder='Enter a description..' defaultValue={playlist.description}
                                className='dark:bg-zinc-700 px-3 py-2 dark:text-zinc-200 text-base rounded border-solid border-2 dark:border-zinc-600 h-44' />
                        </>}
                    <div className="flex flex-row items-center gap-2">
                        <button type='submit' className='text-white bg-blue-500 border border-blue-500 rounded px-5 py-2 w-fit'>Save Playlist</button>
                        <input
                            type='button'
                            value='Reset Changes'
                            className='cursor-pointer dark:border-white dark:text-white border border-zinc-700 text-zinc-700 rounded px-5 py-2 w-fit'
                            onClick={() => setFormData(playlist)}/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PlaylistEdit