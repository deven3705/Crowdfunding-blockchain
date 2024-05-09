import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Route, createBrowserRouter, createRoutesFromElements,RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import Elibrary from "./component/Elibrary.jsx";
import Home from "./component/Home.jsx";
import Join from "./component/Join.jsx";
import Completed from "./component/Completed.jsx"
import About from "./component/About.jsx";
import { Auth0Provider } from '@auth0/auth0-react';






const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<Layout/>}>
       <Route path='' element={<Home></Home>}></Route>
       <Route path='/Completed' element={<Completed></Completed>}></Route>
       <Route path='/join' element={<Join></Join>}></Route>
       <Route path='/elibrary' element={<Elibrary></Elibrary>}></Route>
       <Route path='/about' element={<About></About>}></Route>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <Auth0Provider
  
  domain="dev-a7z27eidghe6j1am.us.auth0.com"
    clientId="rIzJoN1VtZGGQPyHPaTwsa4YtJERz7aF"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
 
    <RouterProvider router={router}></RouterProvider>
  
  </Auth0Provider>
  </React.StrictMode>
);
