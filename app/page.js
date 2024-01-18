import Image from 'next/image'
import styles from './page.module.css'
import Login from './login/page'
import Register from './register/page'
import Homepage from './homepage/page'
import './home.css'
export default function Home() {
  return (
     <div className='container'>
      {/* <Login/> */}
      <Homepage/>
      {/* <Register/> */}
   
     </div>
  )
}
