function VideoPlayer({ id }: { id: string }) {
    return (
        <video
        className='outline-none'
         src={`/api/videos?v=${id}`}
         width='800'
         height='auto'
         controls
         autoPlay
         id='video-player'/>
    )
}

export default VideoPlayer