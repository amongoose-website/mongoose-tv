
const production = process.env.NODE_ENV === 'production'

function VideoPlayer({ id }: { id: string }) {
    return (
        <video
        className='outline-none'
         src={production ? `/api/videos/stream?v=${id}` : `https://tv.amongoose.com/api/videos/stream?v=${id}`}
         width='800'
         height='auto'
         controls
         autoPlay
         id='video-player'/>
    )
}

export default VideoPlayer