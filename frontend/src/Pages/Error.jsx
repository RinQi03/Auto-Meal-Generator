import { Link } from "react-router-dom";

function ErrorPage(){

    return (
        <div className="bg-zinc-50 h-screen p-32">
            <span className="absolute text-2xl ml-[640px] mt-6">⬇️⬇️⬇️</span>
            <span className="text-9xl">Error            </span>
            <span className="text-4xl">Go back to <Link to='/api/connect/home'><button className="bg-yellow-400/30 p-3 rounded-lg">home</button></Link> page</span>
        </div>
        
    );
}

export default ErrorPage