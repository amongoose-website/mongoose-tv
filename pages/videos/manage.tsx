import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import appConfig from '../../config'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import Icon from '../../components/Icon'
import Modal from '../../components/Modal'

const PageNavigation = ({href, name}: {href: string, name: string}) => {
    return <a className='flex flex-row items-center' href={href}><Icon name={name}/></a>
}

const Manage = () => {
    const [data, setData] = useState<any>(null)
    const [deleting, setDeleting] = useState<any>(null)
    const router = useRouter()
    
    
    let page = Number(router.query.page)
    if (router.isReady && !router.query.page) page = 1
    let limit = 20
    let skip = (page * limit) - limit
    const totalPages: number | null = Math.ceil(data?.total / limit)

    let apiRoute = router.query.query 
        ? `/api/videos/search?q=${router.query.query}`
        : `/api/videos?limit=20&skip=${skip}`

    useEffect(() => {
      const getVideos = async () => {
        const { data } = await axios.get(apiRoute)
        setData(data)
      }
      if (!data && router.isReady) getVideos()
    })

    if (!router.isReady) {
        return <Loading/>
    }

    if (!data?.videos?.length) return <Loading/>
    
    const deleteVideo = async (video: any) => {
        await axios.post('/api/videos/delete', video)
        setDeleting(null)
    }

    return (
      <Layout>
        { deleting &&
            <Modal buttons={[
                () => (
                    <button type="button"
                        className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm`}
                        onClick={() => deleteVideo(deleting)}
                    >
                        Delete
                    </button>
                ),
                () => (
                    <button type="button"
                        className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}
                        onClick={() => setDeleting(null)}
                    >
                        Cancel
                    </button>
                )
            ]}>
                <div
                    className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Icon className='text-red-500' name='delete' />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title">Are you sure?</h3>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            <span>Are you sure you want to delete video, &ldquo;{deleting.title}&rdquo;</span>
                        </p>
                    </div>
                </div>
            </Modal>
        }
        <div className='container mx-auto bg-white rounded dark:bg-zinc-800 dark:text-white pt-5'>
            {data.videos.length > 0 && <>
              <h1 className='px-6 mb-3 sm:px-20 md:px-10 lg:px-5 text-3xl pb-2 mx-auto'>Manage Videos</h1>
              {
                page && <div className='px-6 mb-3 sm:px-20 md:px-10 lg:px-5 flex flex-row items-center'>
                    { page > 1 && <PageNavigation href={`/videos/manage?page=${1}`} name='first_page'/> }
                    { page > 1 && <PageNavigation href={`/videos/manage?page=${page-1}`} name='navigate_before'/> }
                    <span>{`Page ${page}/${totalPages}`}</span>
                    { page < totalPages && <PageNavigation href={`/videos/manage?page=${page+1}`} name='navigate_next'/> }
                    { page < totalPages && <PageNavigation href={`/videos/manage?page=${totalPages}`} name='last_page'/> }
              </div>
              }

              <table className='table-auto w-full text-left border-zinc-300 dark:border-zinc-700'>
                <thead>
                    <tr>
                        <th className='border-b border-zinc-300 dark:border-zinc-700 px-4 text-center'>Video</th>
                        <th className=' border-b border-zinc-300 dark:border-zinc-700'></th>
                        <th className='border-b border-zinc-300 dark:border-zinc-700 px-4 text-center'>Edit</th>
                        <th className='border-b border-zinc-300 dark:border-zinc-700 px-4 text-center'>Delete Forever</th>
                    </tr>
                </thead>
                <tbody>
                    { data.videos?.map((video: any, i: number) => 
                        <tr key={i}>
                            <td className='my-2  w-32 h-16 aspect-video relative'>
                                <Image 
				                    layout='fill'
				                    src={`${appConfig.publicThumbnails}${video.id}.png`} 
                                    alt="" />
                            </td>
                            <td className='px-3 border border-zinc-300 dark:border-zinc-700'>
                                <a href={`/videos/edit?v=${video.id}`}><span>{video.title}</span></a>
                            </td>
                            <td className='text-center border border-zinc-300 dark:border-zinc-700'>
                                <a href={`/videos/edit?v=${video.id}`}><Icon name='edit'/></a>
                            </td>
                            <td className='text-center border border-zinc-300 dark:border-zinc-700'>
                                <Icon name='delete' video={JSON.stringify(video)} className='cursor-pointer' onClick={(e: any) => {
                                    setDeleting(JSON.parse(e.target.attributes.video.value))
                                }}/>
                            </td>
                        </tr>
                    )}
                </tbody>
              </table>
            </>}
          </div>
      </Layout>
    )
}

export default Manage
