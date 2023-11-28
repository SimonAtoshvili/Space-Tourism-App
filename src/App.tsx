import { Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import DestinationEelement from './pages/DestinationElement.js'
import CrewElement from './pages/CrewElement.js'
import TechElement from './pages/TechElement.js'
import { useEffect, useState } from 'react'
import { useMyContext } from './Context.jsx'

function App() {
  const { isMobile } = useMyContext()
  const location = useLocation();
  const navigate = useNavigate()
  const [mobNav, setMobNav] = useState(false)


  useEffect(() => {
    if (location.pathname == '/destination') {
      navigate('/destination/Moon')
    }
    if (location.pathname == '/crew') {
      navigate('/crew/Douglas-Hurley')
    }
    if (location.pathname == '/technology') {
      navigate('/technology/Launch-vehicle')
    }
  }, [])

  return (
    <>
      <header>
        <Link to={'/'}>
          <img src="../public/assets/shared/logo.svg" alt="logo" className='logo' />
        </Link>
        <nav style={isMobile ? (mobNav ? { display: 'block' } : { display: 'none' }) : {}} className={`${isMobile ? 'mob_nav' : ''}`}>
          <ul>
            <li
              className='header_li'
              style={location.pathname === '/' ? { borderColor: '#fff' } : { borderColor: 'transparent' }}
              onClick={() => { setMobNav(false) }}
            >
              <Link to={'/'}><span>00</span>Home</Link>
            </li>
            <li
              className='header_li'
              style={location.pathname.includes('destination') ? { borderColor: '#fff' } : { borderColor: 'transparent' }}
              onClick={() => { setMobNav(false) }}
            >
              <Link to={'/destination/Moon'}><span>01</span>Destination</Link>
            </li>
            <li
              className='header_li'
              style={location.pathname.includes('crew') ? { borderColor: '#fff' } : { borderColor: 'transparent' }}
              onClick={() => { setMobNav(false) }}
            >
              <Link to={'/crew/Douglas-Hurley'}><span>02</span>Crew</Link>
            </li>
            <li
              className='header_li'
              style={location.pathname.includes('technology') ? { borderColor: '#fff' } : { borderColor: 'transparent' }}
              onClick={() => { setMobNav(false) }}
            >
              <Link to={'/technology/Launch-vehicle'}><span>03</span>Technology</Link>
            </li>
          </ul>
        </nav>

        {
          isMobile
            ?
            <img
              className='burger'
              src={`../public/assets/shared/${mobNav ? "icon-close.svg" : "icon-hamburger.svg"}`} alt="close"
              onClick={() => {
                setMobNav(!mobNav)
              }}
            />
            :
            null
        }
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/destination/:destId' element={<DestinationEelement />} />
        <Route path='/crew/:crewId' element={<CrewElement />} />
        <Route path='/technology/:techId' element={<TechElement />} />
      </Routes>
    </>
  )
}

export default App
