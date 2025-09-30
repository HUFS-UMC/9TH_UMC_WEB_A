import { Outlet } from 'react-router-dom'; // App.tsx의 children을 보여줄 outlet을 선언 해줘야 한다.
import {Navbar}  from '../components/Navbar';

const HomePage = ()=> {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  );
};

export default HomePage;
