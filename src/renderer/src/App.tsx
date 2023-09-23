
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from "./context/AppContext";
import { LoaderComponent } from './components/Loader';
import { LoadApp } from './components/LoadApp';
import { lazy } from 'react';
import { Template } from './pages/TemplatePage';
import AddTemplate from './pages/AddTemplatePage';
import { ItemsMenu } from './components/ItemsMenu';
const MassPage = lazy(() => import('./pages/MassPage'));

function App(): JSX.Element {

  return (
    <AppContextProvider>
      <Router>
        <div className='w-screen h-screen grid grid-rows-[1fr,12%] '>
          <div id='container-pages' className="w-full h-full mx-auto overflow-auto">
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
                <ItemsMenu />
              </LoadApp>
            </ul>
          </div>

        </div>
      </Router>
    </AppContextProvider>

  )
}

export default App
