/* App.jsx */
import { useState } from 'react'
import ChatMain from './components/ChatMain/ChatMain'
import Layout from './layout/Layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Layout>
        <ChatMain />
      </Layout>
    </>
  )
}

export default App
