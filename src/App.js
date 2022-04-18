import React, { Fragment, useEffect, useMemo } from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import { useLocation } from 'react-router-dom'
import TheFooter from './components/Layout/Footer/TheFooter'
import TheHeader from './components/Layout/Header/TheHeader'
import Navigation from './components/Layout/Navigation'
import MenuLeft from './components/Layout/Sidebar/index'
import useCategoryBrand from './hook/useCategoryBrand'

function App(props) {
  const location = useLocation()
  const hasNotFound = location['pathname'].includes('/404')
  const statusMenu = useMemo(() => {
    const path = ['/login', '/404', '/my-cart']
    const status = path.includes(location.pathname)
    return status === true ? false : true
  }, [location.pathname])

  const { brand, category } = useCategoryBrand()
  localStorage.setItem('brand', JSON.stringify(brand))
  localStorage.setItem('category', JSON.stringify(category))

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [location.pathname])

  return (
    <Fragment>
      {/* <AlertMessage>asd</AlertMessage> */}
      {!hasNotFound && <TheHeader />}
      <Navigation />
      <div className="container">
        <div className="row">
          {statusMenu && (
            <div className="col-sm-3">
              <MenuLeft />
            </div>
          )}
          <div className={statusMenu ? 'col-sm-9 ' : ''}>{props.children}</div>
        </div>
      </div>
      {!hasNotFound && <TheFooter />}
    </Fragment>
  )
}
export default App
