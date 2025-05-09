import React, {useState, createContext } from 'react';
import router from './Routes/Routes.jsx';
import { RouterProvider } from 'react-router-dom';


export const LoginContext = createContext();
export const PrefInfo = createContext();
export const SearchResult = createContext();
export const Pages = createContext();


function App(){
  const [username, setUsername] = useState("Guest");
  const [pref, setPref] = useState({});
  const [result, setResult] = useState({});
  const [page, setPage] = useState(0);

  console.log(username)


  return (
    <>
      <LoginContext.Provider value = {[username,setUsername]}>
        <Pages.Provider value = {[page,setPage]}>
          <PrefInfo.Provider value = {[pref,setPref]}>
            <SearchResult.Provider value = {[result,setResult]}>
              <RouterProvider router = {router}></RouterProvider>
            </SearchResult.Provider>
          </PrefInfo.Provider>
        </Pages.Provider>
      </LoginContext.Provider>
    </>

  )
}

export default App



