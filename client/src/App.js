import React from 'react';

import {
  useRoutes
} from "react-router-dom";

import NotFound from './components/views/NotFound/NotFound';
import MainPage from './components/views/MainPage/MainPage';
import Ad from './components/views/Ad/Ad';
import NavBar from './components/features/NavBar/NavBar';
import SignIn from './components/features/SignIn/SignIn';
import SignUp from './components/features/SignUp/SignUp';
import AdEdit from './components/views/AdEdit/AdEdit';
import AdAdd from './components/views/AdAdd/AdAdd';

import { AUTH_URL } from './config';


import './styles/bootstrap.scss';
import './styles/settings.scss'

const App = () => {


  const routes = useRoutes([
    {
      path: '/',
      element: <MainPage/>
    },
    {
      path: '/ad/:id',
      element: <Ad/>
    },
    {
      path: '/signin',
      element:  <SignIn/>
    },
    {
      path: '/signup',
      element:  <SignUp/>
    },
    {
      path: '/ad/editad/:id',
      element: <AdEdit/>
    },
    {
      path: '/ad/adadd',
      element: <AdAdd/>
    },
    {
      path: '*',
      element: <NotFound/>
    },

  ]);
  return(
  <div>
    <NavBar/>
    {routes}
  </div>
  )

}

export default App;
