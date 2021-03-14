import Head from 'next/head'
import TwitterFlow from '../components/TwitterFlow'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Twitter API integration w/ next</title>
      </Head>

      <TwitterFlow />
    </div>
  )
}
