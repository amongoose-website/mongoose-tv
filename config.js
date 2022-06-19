let config = {
    siteMetadata: {
        title: 'A. Mongoose TV',
        description: 'Watch the latest documentaries and videos on the Choice.',
        domain: 'media.amongoose.com'
    },
    videosDirectory: '/Users/jooshhg/Documents/Development/Commercial/Mongoose/mongoose.tv/videos/',
    thumbnailsDirectory: '/Users/jooshhg/Documents/Development/Commercial/Mongoose/mongoose.tv/public/thumbnails/'
}

if (process.env.NODE_ENV === 'development') {
    config.siteMetadata.domain = 'localhost:3000'
}

export default config
