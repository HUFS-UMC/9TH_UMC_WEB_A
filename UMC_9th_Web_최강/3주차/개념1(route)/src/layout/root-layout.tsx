import Navbar from '../components/navbar'
import {Outlet} from 'react-router-dom'

const RootLayout = () => {
    return (
        <>
        <Navbar/>
        <Outlet/>
        </>
    )
}

export default RootLayout