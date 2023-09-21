
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppContextProvider } from "./context/AppContext";
import { LoaderComponent } from './components/Loader';
import { LoadApp } from './components/LoadApp';
import { lazy } from 'react';
import { Template } from './pages/TemplatePage';
import AddTemplate from './pages/AddTemplatePage';
const MassPage = lazy(() => import('./pages/MassPage'));

function App(): JSX.Element {

  return (
    <AppContextProvider>
      <Router>
        <div className='w-screen h-screen grid grid-rows-[1fr,12%] '>
          <div className="w-full h-full mx-auto overflow-auto">
            <Routes>
              <Route
                path="/"
                index
                element={
                  <LoadApp><MassPage /></LoadApp>
                }
              />
              <Route
                path="/template"
                index
                element={
                  <LoadApp><Template /></LoadApp>
                }
              />
              <Route
                path="/template/add"
                index
                element={
                  <LoadApp><AddTemplate /></LoadApp>
                }
              />
              <Route
                path="*"
                element={
                  <LoadApp><div> pagina no encontrada</div></LoadApp>
                }
              />
            </Routes>
            <LoaderComponent />
          </div>
          <div className='w-full h-full relative'>
            <ul className="menu menu-horizontal bg-base-200 rounded-box mt-6 absolute bottom-3 left-2/4 transform -translate-x-1/2">
              <LoadApp>
                <li>
                  <Link to="/" className='tooltip' data-tip="Home" >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                  </Link>
                </li>
                <li>
                  <Link to="/template" className="tooltip" data-tip="Details">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="tooltip" data-tip="Stats">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  </Link>
                </li>
              </LoadApp>
            </ul>
          </div>

        </div>
      </Router>
    </AppContextProvider>

  )
}

export default App
