
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className=" flex flex-col p-4 gap-4">
      <Link to="/Report">
        <button className="w-full h-20 rounded-2xl bg-[#213558] hover:bg-[#2c4673]
    text-[#d8b804] text-xl font-bold border border-[#4c608e] shadow-lg transition-all duration-300
    active:scale-95">NEW REPORT</button>
      </Link>

     

<Link to="/History">
 <button className="w-full h-20 rounded-2xl bg-[#213558] hover:bg-[#2c4673]
    text-[#d8b804] text-xl font-bold border border-[#4c608e] shadow-lg transition-all duration-300
    active:scale-95">HISTORY</button>
</Link>
     

    </div>
  );
}
export default Home;
