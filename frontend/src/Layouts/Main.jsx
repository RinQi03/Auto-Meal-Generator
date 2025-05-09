import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import { Outlet } from "react-router-dom";

function Main(){

    return (
        <>
            <div className = 'h-screen bg-gray-400 font-mono'>
                <Header></Header>
                {/* <h1 style={{color:'blue'}}>Here is Main.jsx</h1> */}
                <Outlet className="mt-auto"></Outlet>
                <Footer></Footer>
            </div>
        </>
    );
}

export default Main