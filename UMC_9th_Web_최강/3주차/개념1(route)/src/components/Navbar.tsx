import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <Link to='/'>홈으로 이동</Link>
            <Link to='/movies'>무비로 이동</Link>
        </nav>
    )
}

export default Navbar