
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { useRef } from "react";
import {
  CSSTransition,
  SwitchTransition,
} from "react-transition-group";

import Header from "./assets/component/Header";
import Footer from "./assets/component/Footer";

import CompanyInfo from "./assets/component/CompanyInfo";
import SetupStart from "./assets/setUp/SetupStart";

import Home from "./assets/component/Home";
import Exepensess from "./assets/expensess/Exepensess";
import Report from "./assets/pages/Report";
import Counting from "./assets/pages/Counting";
import Export from "./assets/pages/Export";

export default function App() {
  const location = useLocation();
  const nodeRef = useRef(null);

  const companyInfo = JSON.parse(
    localStorage.getItem("companyInfo") || "null"
  );

  const companyDone = !!companyInfo;

  function getStartPage() {
    if (!companyDone) {
      return "/CompanyInfo";
    }

    return "/Home";
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#000",
      }}
    >
      <Header />

      <main
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef}
            timeout={300}
            classNames="page"
            unmountOnExit
          >
            <div
              ref={nodeRef}
              className="page-wrapper"
            >
              <Routes location={location}>

                {/* START */}

                <Route
                  path="/"
                  element={
                    <Navigate
                      to={getStartPage()}
                      replace
                    />
                  }
                />

                {/* COMPANY INFORMATION */}

                <Route
                  path="/CompanyInfo"
                  element={
                    companyDone ? (
                      <Navigate
                        to="/Home"
                        replace
                      />
                    ) : (
                      <CompanyInfo />
                    )
                  }
                />

                {/* PRODUCT SETUP */}

                <Route
                  path="/SetupStart"
                  element={
                    !companyDone ? (
                      <Navigate
                        to="/CompanyInfo"
                        replace
                      />
                    ) : (
                      <SetupStart />
                    )
                  }
                />

                {/* HOME */}

                <Route
                  path="/Home"
                  element={
                    companyDone ? (
                      <Home />
                    ) : (
                      <Navigate
                        to="/CompanyInfo"
                        replace
                      />
                    )
                  }
                />

                {/* EXPENSES */}

                <Route
                  path="/Exepensess"
                  element={
                    companyDone ? (
                      <Exepensess />
                    ) : (
                      <Navigate
                        to="/CompanyInfo"
                        replace
                      />
                    )
                  }
                />

                {/* REPORT */}

                <Route
                  path="/Report"
                  element={
                    companyDone ? (
                      <Report />
                    ) : (
                      <Navigate
                        to="/CompanyInfo"
                        replace
                      />
                    )
                  }
                />

                {/* COUNTING */}

                <Route
                  path="/Counting"
                  element={
                    companyDone ? (
                      <Counting />
                    ) : (
                      <Navigate
                        to="/CompanyInfo"
                        replace
                      />
                    )
                  }
                />

                {/* EXPORT */}

                <Route
                  path="/Export"
                  element={
                    companyDone ? (
                      <Export />
                    ) : (
                      <Navigate
                        to="/CompanyInfo"
                        replace
                      />
                    )
                  }
                />

              </Routes>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </main>

      <Footer />
    </div>
  );
}








// import {
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
// } from "react-router-dom";

// import { useRef } from "react";
// import {
//   CSSTransition,
//   SwitchTransition,
// } from "react-transition-group";

// import Header from "./assets/component/Header";
// import Footer from "./assets/component/Footer";

// import CompanyInfo from "./assets/component/CompanyInfo";
// import SetupStart from "./assets/setUp/SetupStart";

// import Home from "./assets/component/Home";
// import Exepensess from "./assets/expensess/Exepensess";
// import Report from "./assets/pages/Report";
// import Counting from "./assets/pages/Counting";
// import Export from "./assets/pages/Export";

// export default function App() {
//   const location = useLocation();
//   const nodeRef = useRef(null);

//   const companyInfo = JSON.parse(
//     localStorage.getItem("companyInfo") || "null"
//   );

//   const companyDone = !!companyInfo;

//   function getStartPage() {
//     if (!companyDone) {
//       return "/CompanyInfo";
//     }

//     return "/Home";
//   }

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         backgroundColor: "#000",
//       }}
//     >


//       <Header />

//       {/* PAGE - ANIMATES */}

//       <main
//         style={{
//           flex: 1,
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         <SwitchTransition mode="out-in">

//           <CSSTransition
//             key={location.pathname}
//             nodeRef={nodeRef}
//             timeout={300}
//             classNames="page"
//             unmountOnExit
//           >

//             <div
//               ref={nodeRef}
//               className="page-wrapper"
//             >
//               <Routes location={location}>

//                 {/* START */}

//                 <Route
//                   path="/"
//                   element={
//                     <Navigate
//                       to={getStartPage()}
//                       replace
//                     />
//                   }
//                 />

//                 {/* COMPANY INFORMATION */}

//                 <Route
//                   path="/CompanyInfo"
//                   element={
//                     companyDone
//                       ? <Navigate to="/Home" replace />
//                       : <CompanyInfo />
//                   }
//                 />

//                 {/* PRODUCT SETUP */}

//                 <Route
//                   path="/SetupStart"
//                   element={
//                     !companyDone
//                       ? (
//                         <Navigate
//                           to="/CompanyInfo"
//                           replace
//                         />
//                       )
//                       : (
//                         <SetupStart />
//                       )
//                   }
//                 />

//                 {/* HOME */}

//                 <Route
//                   path="/Home"
//                   element={<Home />}
//                 />

//                 {/* EXPENSES */}

//                 <Route
//                   path="/Exepensess"
//                   element={<Exepensess />}
//                 />

//                 {/* REPORT */}

//                 <Route
//                   path="/Report"
//                   element={<Report />}
//                 />

//                 {/* COUNTING */}

//                 <Route
//                   path="/Counting"
//                   element={<Counting />}
//                 />

//                 {/* EXPORT */}

//                 <Route
//                   path="/Export"
//                   element={<Export />}
//                 />

//               </Routes>
//             </div>

//           </CSSTransition>

//         </SwitchTransition>
//       </main>

//       {/* FOOTER - DOES NOT ANIMATE */}

//       <Footer />

//     </div>
//   );
// }
