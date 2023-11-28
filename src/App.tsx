import { Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import DestinationEelement from './pages/DestinationElement.js'
import CrewElement from './pages/CrewElement.js'
import TechElement from './pages/TechElement.js'
import { useEffect, useState } from 'react'
import { useMyContext } from './Context.tsx'
// import Destination from './pages/Destination.tsx'

function App() {
  const { isMobile } = useMyContext()
  const location = useLocation();
  const navigate = useNavigate()
  const [mobNav, setMobNav] = useState<boolean>(false)


  useEffect(() => {
    if (location.pathname == '/destination') {
      navigate('/destination/moon')
    }
    if (location.pathname == '/crew') {
      navigate('/crew/douglas-hurley')
    }
    if (location.pathname == '/technology') {
      navigate('/technology/launch-vehicle')
    }
  }, [])

  return (
    <>
      <header>
        <Link to={'/'}>
          <img
            src="/assets/shared/logo.svg"
            alt="logo"
            className='logo'
            onClick={() => {setMobNav(false)}}
          />
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
              <Link to={'/destination/moon'}><span>01</span>Destination</Link>
            </li>
            <li
              className='header_li'
              style={location.pathname.includes('crew') ? { borderColor: '#fff' } : { borderColor: 'transparent' }}
              onClick={() => { setMobNav(false) }}
            >
              <Link to={'/crew/douglas-hurley'}><span>02</span>Crew</Link>
            </li>
            <li
              className='header_li'
              style={location.pathname.includes('technology') ? { borderColor: '#fff' } : { borderColor: 'transparent' }}
              onClick={() => { setMobNav(false) }}
            >
              <Link to={'/technology/launch-vehicle'}><span>03</span>Technology</Link>
            </li>
          </ul>
        </nav>

        {
          isMobile
            ?
            <img
              className='burger'
              src={`/assets/shared/${mobNav ? "icon-close.svg" : "icon-hamburger.svg"}`} alt="close"
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
