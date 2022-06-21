import Image from 'next/image'
import Icon from '../components/Icon'

import appConfig from '../config'

export const DvdOverlay = ({count}: {count: string | number}) => {
	return (
	  <div className='flex flex-col items-center justify-center w-1/3 h-full z-20 absolute right-0 text-white'>
		<div className='flex flex-col z-20 text-center'>
		  <Icon name='album'/>
		  <span>{`${count > 1 ? `${count} Episodes` : `${count} Episode`}`}</span>
		</div>
		<span className='w-full h-full bg-black absolute z-10 opacity-50'></span>
	  </div>
	)
  }

export const DvdThumbnail = (props: any) => {
	const { dvd } = props
	
	return (
		<div className='px-6 sm:px-20 md:px-10 lg:px-5 w-full'>
		  <div className="w-full inline-block">
			<a className='w-full' href={`/watch?v=${dvd.id}`}>
			  <div className='relative aspect-video w-full h-auto'>
				{ dvd && <DvdOverlay count={dvd.episodeCount}/> }
				<Image 
				  layout='fill'
				  src={`${appConfig.publicThumbnails}${dvd.firstEpisode.id}.png`} 
				  alt="" />
			  </div>
			</a>
			<div className="py-2">
			  <a href={`/watch?v=${dvd.id}`}>
				{ dvd.isDvd &&
				  <div className='bg-zinc-200 dark:bg-zinc-700 w-min px-2.5 py-0.5 rounded text-xs my-1'>
					<span className=' whitespace-nowrap'>DVD • {dvd.dvdNumber}</span>
					<span className=' whitespace-nowrap ml-3'>Episode • {dvd.episodeNumber}</span>
				  </div>
				}
				<h5 className="text-base font-medium tracking-tight text-zinc-900 dark:text-white">
				  {dvd.title}
				</h5>
			  </a>
			</div>
		  </div>
		</div>
	)   
}

const VideoThumbnail = (props: any) => {
	const { video } = props
	return (
		<div className='px-6 sm:px-20 md:px-10 lg:px-5 w-full'>
		  <div className="w-full inline-block">
			<a className='w-full' href={`/watch?v=${video.id}`}>
			  <div className='relative aspect-video w-full h-auto'>
				<Image 
				  layout='fill'
				  src={`${appConfig.publicThumbnails}${video.id}.png`} 
				  alt="" />
			  </div>
			</a>
			<div className="py-2">
			  <a href={`/watch?v=${video.id}`}>
				{ video.isDvd &&
				  <div className='bg-zinc-200 dark:bg-zinc-700 w-min px-2.5 py-0.5 rounded text-xs my-1'>
					<span className=' whitespace-nowrap'>DVD • {video.dvdNumber}</span>
					<span className=' whitespace-nowrap ml-3'>Episode • {video.episodeNumber}</span>
				  </div>
				}
				<h5 className="text-base font-medium tracking-tight text-zinc-900 dark:text-white">
				  {video.title}
				</h5>
			  </a>
			</div>
		  </div>
		</div>
	)   
}

export default VideoThumbnail

export const CarouselVideoThumbnail = (props: any) => {
	const { video } = props
	return (
		<div className='px-6 md:px-20 lg:px-10 xl:px-5 w-full'>
		  <div className="w-full inline-block">
			<a className='w-full' href={`/watch?v=${video.id}`}>
			  <div className='relative aspect-video w-full h-auto'>
				<Image 
				  layout='fill'
				  src={`${appConfig.publicThumbnails}${video.id}.png`} 
				  alt="" />
			  </div>
			</a>
			<div className="py-2">
			  <a href={`/watch?v=${video.id}`}>
				{ video.isDvd &&
				  <div className='bg-zinc-200 dark:bg-zinc-700 w-min px-2.5 py-0.5 rounded text-xs my-1'>
					<span className=' whitespace-nowrap'>DVD • {video.dvdNumber}</span>
					<span className=' whitespace-nowrap ml-3'>Episode • {video.episodeNumber}</span>
				  </div>
				}
				<h5 className="text-base font-medium tracking-tight text-zinc-900 dark:text-white">
				  {video.title}
				</h5>
			  </a>
			</div>
		  </div>
		</div>
	)   
}

export const CarouselDvdThumbnail = (props: any) => {
	const { dvd } = props
	return (
		<div className='px-6 md:px-20 lg:px-10 xl:px-5 w-full'>
		  <div className="w-full inline-block">
			<a className='w-full' href={`/watch?v=${dvd.id}`}>
			  <div className='relative aspect-video w-full h-auto'>
				<Image 
				  layout='fill'
				  src={`${appConfig.publicThumbnails}${dvd.firstEpisode.id}.png`} 
				  alt="" />
			  </div>
			</a>
			<div className="py-2">
			  <a href={`/watch?v=${dvd.id}`}>
				<h5 className="text-base font-medium tracking-tight text-zinc-900 dark:text-white">
				  {dvd.title}
				</h5>
			  </a>
			</div>
		  </div>
		</div>
	)   
}