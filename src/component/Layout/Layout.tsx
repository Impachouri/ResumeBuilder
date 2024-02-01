
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

 const Layout = () => {
  return (
    <div className="w-screen bg-[#E2E8F0] text-white flex flex-col ">
      <header>
        <div className="w-screen flex item-center justify-center"><NavBar /></div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;