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
		<span className='w-full h-full bg-black absolute z-10 opacity-50 rounded'></span>
	  </div>
	)
  }

export const DvdThumbnail = (props: any) => {
	const { dvd } = props
	const url = `/watch?v=${dvd.firstEpisode.id}&list=${dvd.id}&index=0`
	return (
		<div className='px-6 sm:px-20 md:px-10 lg:px-5 w-full'>
		  <div className="w-full inline-block">
			<a className='w-full' href={url}>
			  <div className='relative aspect-video w-full h-auto rounded'>
				{ dvd && <DvdOverlay count={dvd.episodeCount}/> }
				<Image 
				  layout='fill'
				  className='rounded'
				  src={`${appConfig.publicThumbnails}${dvd.firstEpisode.id}.png`} 
				  alt="" />
			  </div>
			</a>
			<div className="py-2">
			  <a href={url}>
				{ dvd.isDvd &&
				  <div className='bg-zinc-200 dark:bg-zinc-700 w-min px-2.5 py-0.5 rounded text-xs my-1'>
					<span className=' whitespace-nowrap'>DVD • {dvd.dvdNumber}</span>
					<span className=' whitespace-nowrap ml-3'>Episode • {dvd.episodeNumber}</span>
				  </div>
				}
				<h5 className="text-base font-medium tracking-tight text-zinc-900 dark:text-white">
				  <div className='bg-zinc-200 dark:bg-zinc-700 w-min px-2.5 py-0.5 rounded text-xs my-1'>
					<span className=' whitespace-nowrap'>DVD #{dvd.dvdNumber}</span>
				  </div>
				  {dvd.title}
				</h5>
			  </a>
			</div>
		  </div>
		</div>
	)   
}

export const PlaylistThumbnail = (props: any) => {
	const { playlist } = props
	const url = `/watch?v=${playlist.firstEpisode.id}&list=${playlist.id}&index=0`
	return (
		<div className='px-6 sm:px-20 md:px-10 lg:px-5 w-full'>
		  <div className="w-full inline-block">
			<a className='w-full' href={url}>
			  <div className='relative aspect-video w-full h-auto rounded'>
				{ playlist && <DvdOverlay count={playlist.episodeCount}/> }
				<Image 
				  layout='fill'
				  className='rounded'
				  src={`${appConfig.publicThumbnails}${playlist.firstEpisode.id}.png`} 
				  alt="" />
			  </div>
			</a>
			<div className="py-2">
			  <a href={url}>
				<h5 className="text-base font-medium tracking-tight text-zinc-900 dark:text-white">
				  {playlist.title}
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
				  className='rounded'
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

export const ListThumbnail = (props: any) => {
	const { video, listId, index, isCurrent } = props
	const url = `/watch?v=${video.id}&list=${listId}&index=${index}`
	return (
		<a href={url} className='h-min box-content'>
		<div className={`flex flex-row gap-2 ${isCurrent ? 'bg-zinc-200 dark:bg-zinc-700' : 'dark:bg-zinc-800'} hover:bg-zinc-200 dark:hover:bg-zinc-700`}>
			<div className="flex flex-col justify-center">
				<Icon className={`text-zinc-600 dark:text-zinc-200 text-sm ${isCurrent ? 'visible': 'invisible'}`} name='play_arrow'/>
			</div>
			<div>
				<Image 
					layout='fixed'
					width={100}
					height={60}
					src={`${appConfig.publicThumbnails}${video.id}.png`} 
					alt="" />
			</div>
			<div className='overflow-hidden h-min'>
				<h5 className="text-base font-medium tracking-tight text-zinc-900 dark:text-white max-h-12 overflow-hidden text-ellipsis">
					{video.title}
				</h5>
			</div>
		</div>
		</a>
	)   
}