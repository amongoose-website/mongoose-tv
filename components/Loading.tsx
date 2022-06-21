import Layout from "./Layout"

const Loading = () => {
    return (
        <Layout>
          <div className='container mx-auto bg-white rounded dark:bg-zinc-800 dark:text-white pt-5'>
            <p className='text-center'>Loading...</p>
          </div>
        </Layout>
      )
}

export default Loading