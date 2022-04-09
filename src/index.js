import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { createStore } from 'redux'
import App from './App'
import './asset/css/styles.css'
import Account from './components/Account/index'
import BlogList from './components/Blog/page/BlogList'
import BlogSingle from './components/Blog/page/BlogSingle'
import TheCart from './components/Cart/index'
import NotFound from './components/NotFound/NotFound'
import ProductDetail from './components/Product/page/ProductDetail'
import ProductList from './components/Product/page/ProductList'
import TheHome from './components/TheHome'
import TheLogin from './components/User/Login/TheLogin'
import './index.css'
import rootReducer from './redux/rootReducer'
import reportWebVitals from './reportWebVitals'

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App>
          <Routes>
            <Route path="/" element={<TheHome />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<TheLogin />} />
            <Route path="/account/*" element={<Account />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog-single/:id" element={<BlogSingle />} />
            <Route path="/shop" element={<ProductList />} />
            <Route path="/product-details/:id/*" element={<ProductDetail />} />
            <Route path="/my-cart" element={<TheCart />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </App>
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
