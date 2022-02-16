import type { NextPage } from 'next'
import Head from 'next/head'
import SideMenu from '../components/SideMenu'
import ChatContainer from '../components/ChatContainer'

//Styles
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>One Page Chat App Test || Tarit Nakavajara</title>
        <meta name="description" content="One Page Chat App Test || Tarit Nakavajara" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <SideMenu />
        <ChatContainer />
      </main>
    </div>
  )
}

export default Home
