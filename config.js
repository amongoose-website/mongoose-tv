let config = {
    siteMetadata: {
        title: 'A. Mongoose TV',
        description: 'Watch the latest documentaries and videos on the Choice.',
        domain: 'tv.amongoose.com'
    },
    videosDirectory: '/media/webadmin/media/videos/',
    thumbnailsDirectory: '/media/webadmin/media/thumbnails/',
    publicThumbnails: 'https://static.amongoose.com/thumbnails/',
    navbarItems: [
        {text: 'Upload', href: '/videos/upload', icon: 'file_upload', type: 'link'},
        {text: 'Manage Videos', href: '/videos/manage?page=1', icon: 'video_library', type: 'link'},
        {text: 'Logout', href: '/api/auth/logout', icon: 'logout', type: 'a'},
    ]
}

if (process.env.NODE_ENV === 'development') {
    config.siteMetadata.domain = 'localhost:3000'
}

export default config
