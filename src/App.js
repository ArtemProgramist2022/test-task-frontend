import React from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import HeadPage from './components/HeadPage';
import Login from './components/Login';
import store from './redux/redux';
import './styles/App.css';
import { getUsers, deleteUser, getEventWebSocket } from './reducers/userReducer'
import { getLogin } from './reducers/appReducer'
import { getLoading } from './reducers/authReducer'
import Preloader from './common/Preloader';
import ShopPage from './components/ShopPage';

function App(props) {
  return (
    <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
      {!props.isLoading ? <ul className='listGroupOfLinks'><li><NavLink to='/' className={({ isActive }) => isActive ? `link link__active` : 'link'}>Главная страница</NavLink></li>
        {!props.isLogin && <li><NavLink to='/login' className={({ isActive }) => isActive ? `link link__active` : 'link'} >Авторизация</NavLink></li>}
        <li><NavLink to='/shop' className={({ isActive }) => isActive ? `link link__active` : 'link'} >Магазин</NavLink></li>
        {props.isLogin && <li className='link'>Вы авторизированы</li>}
      </ul>
        : <Preloader />
      }
      <hr />
      <Routes>
        <Route exact path='/' element={<HeadPage isFetching={props.isFetching} total={props.total}
          limit={props.limit}
          page={props.page}
          isLogin={props.isLogin}
          getUsers={props.getUsers}
          items={props.items}
          deleteUser={props.deleteUser}
          getEventWebSocket={props.getEventWebSocket}
          events={props.events}
          />} />
        <Route path='/login' element={<Login getLogin={props.getLogin}
          getLoading={props.getLoading}
          isLoading={props.isLoading}
          isLogin={props.isLogin} />}
          />
          <Route path='/shop' element={<ShopPage />} />
      </Routes>
    </div>
  );
}

let mapStateToProps = (state) => ({
  items: state.users.items,
  isLoading: state.auth.isLoading,
  isLogin: state.app.isLogin,
  total: state.users.total,
  limit: state.users.limit,
  page: state.users.page,
  isFetching: state.users.isFetching,
  events: state.users.eventWebSocket
})

let AppContainer = connect(mapStateToProps, {
  getUsers, getLogin, getLoading, deleteUser, getEventWebSocket
})(App)

let MainApp = (props) => {
  return <BrowserRouter>
    <Provider store={store} >
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default MainApp;
