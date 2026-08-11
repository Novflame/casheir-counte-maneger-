
import { Link } from "react-router-dom";
import logoMt from "../img/logo-mt.png";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

import SideMenu from "../actions/SideMenu";

export default function Header() {

  
 const companyInfo = JSON.parse(
  localStorage.getItem("companyInfo") || "null"
);

const manager = companyInfo?.cashMan || "";
  return (
    <header
      className="
        w-full
        min-h-24
        px-2
        py-2
        flex
        items-center
        justify-between
        gap-2
        bg-slate-950
        border-b
        border-cyan-400
        shadow-lg
      "
    >

     

      <div className="shrink-0">
        <SideMenu />
      </div>


     

      <div className="shrink-0">
        <img
          src={logoMt}
          alt="MT Logo"
          className="
            w-16
            h-16
            object-contain
            rounded-2xl
          "
        />
      </div>


    

      <Link
        to="/Home"
        className="
          flex-1
          min-w-0
          flex
          justify-center
          no-underline
        "
      >
        <div
          className="
            min-w-0
            px-3
            py-2
            flex
            items-center
            justify-center
            flex-col
            border
            border-blue-400
            rounded-3xl
            shadow-lg
            shadow-blue-800
            drop-shadow-2xl
            transition-transform
            duration-200
            hover:scale-105
          "
        >

          <h1
            className="
              text-3xl
              sm:text-4xl
              font-extrabold
              tracking-widest
              text-cyan-300
              whitespace-nowrap
            "
            style={{
              textShadow:
                "0 0 5px #22d3ee, 0 0 10px #223dee, 0 0 20px #06bcd4, 0 0 40px #0891b2, 2px 2px 0 #0f172a, 4px 4px 0 #334155, 8px 8px 20px rgba(0,0,0,0.7)",
            }}
          >
            CASHIER
          </h1>

          <span
            className="
              text-xs
              sm:text-sm
              font-bold
              tracking-[0.25em]
              text-cyan-100
            "
          >
            ASSISTANT
          </span>

        </div>
      </Link>


      {/* RIGHT - CASHIER NAME */}

      <div
        className="
          shrink-0
          max-w-24
          sm:max-w-36
          flex
          items-center
          justify-center
        "
      >
        <DriveFileRenameOutlineIcon className="text-green-300" />
        <span
          className="
            text-xs
            sm:text-sm
            font-semibold
            text-white
            text-center
            wrap-break-word
          "
        >
         {manager}
          
        </span>
      </div>

    </header>
  );
}






// import { Link } from "react-router-dom";
// import logoMt from "../img/logo-mt.png";
// 
// import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
// import SideMenu from "../actions/SideMenu";
// export default function Header() {
//   return (
//     <div className="flex justify-between min-h-20 bg-blue-950">
//        <SideMenu />
//       <div className="flex flex-col items-center select-none">
     
//       <img src={logoMt} alt="logo"
//        className="w-16 h-18 rounded-2xl ml-2 -translate-x-10
//       "/>
       

//       </div>

//       <Link to="/Home">
//         <div
//           className="min-w-40 flex justify-center
// drop-shadow-2xl shadow-8xl shadow-blue-800 shadow-lg min-h-18 border items-center flex-col border-blue-400 rounded-3xl"
//         >
//           <h1
//             className="text-4xl font-extrabold drop-shadow-2xl
//   tarcking-widest text-cyan-300 hover:scale-105 "
//             style={{
//               textShadow:
//                 "0 0 5px #22d3ee,0 0 10px #223dee, 0 0 20px #06bcd4,0 0 40px #0891b2,2px 2px 0 #0f172a, 4px 4px 0 #334155, 8px 8px 20px rgba(0,0,0,07)",
//             }}
//           >
//             CASHIER
//           </h1>
//           <p className="text-yellow-300 translate-x-7">
//             Assesstant{" "}
//             <span>
//               {" "}
//               <ReceiptLongIcon className="text-white" />
//             </span>{" "}
//           </p>
//         </div>
//       </Link>

//       <div className="mr-2 mt-2">
//         <span
//           className="text-white ml-7 border-r-yellow-300 
//    border-t-blue-950 rounded "
//         >
//           <DriveFileRenameOutlineIcon className="text-white translate-x-1" />
//         </span>
//         <p
//           className="text-sm text-sky-300 translate-y-4
//    font-bold text-shadow-cyan-200"
//         >
//           hear shoud be the cashman name from compony setup
//         </p>
//       </div>
//     </div>
//   );
// }
