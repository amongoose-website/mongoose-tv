import Layout from "./Layout"

const Loading = () => {
    return (
        <Layout>
          <div 
            className='container mx-auto bg-white rounded dark:bg-zinc-800 dark:text-white pt-5 flex flex-col justify-center items-center'
            style={{height: 'calc(100vh - 93.5px)'}}>
              <h1 className='text-xl font-bold my-2 text-center opacity-7'>Loading...</h1>
          </div>
        </Layout>
      )
}

export default Loading