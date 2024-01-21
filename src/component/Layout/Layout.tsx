
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

 const Layout = () => {
  return (
    <div className="bg-[#E2E8F0] text-white flex flex-col ">
      <header>
        <div className="flex item-center justify-center"><NavBar /></div>
      </header>
      <main>
        <Outlet />
      </main>
      {/* <footer className="flex text-black w-full h-72">
        <div>
          Footer
        </div>
      </footer> */}
    </div>
  )
}

export default Layout;