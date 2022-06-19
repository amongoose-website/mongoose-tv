import type { NextPage } from 'next'
import Layout from '../components/Layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <div className='container mx-auto dark:text-white'>
        <h1 className='text-x'>Home</h1>
      </div>
    </Layout>
  )
}

export default Home
