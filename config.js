let config = {
    siteMetadata: {
        title: 'A. Mongoose TV',
        description: 'Watch the latest documentaries and videos on the Choice.',
        domain: 'media.amongoose.com'
    },
    videosDirectory: '/media/webadmin/media/videos/',
    thumbnailsDirectory: '/media/webadmin/media/thumbnails/',
    publicThumbnails: 'https://static.amongoose.com/thumbnails/'
}

if (process.env.NODE_ENV === 'development') {
    config.siteMetadata.domain = 'localhost:3000'
}

export default config
