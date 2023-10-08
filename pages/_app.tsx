import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import LoginModal from '@/modals/LoginModal'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <LoginModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* <Modal title='Test' isOpen actionLabel='Submit' /> */}
    </>
  )

}
