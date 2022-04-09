import React, { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import MenuLeftProduct from './MenuLeftProduct'
import MenuAccount from './MenuAccount'

MenuLeft.propTypes = {}

function MenuLeft(props) {
  const location = useLocation()
  const params = useParams()

  const menu = useMemo(() => {
    let path = location.pathname
    if (path.includes('blog')) return <MenuLeftProduct />
    if (path.includes('account')) return <MenuAccount />
    return <MenuLeftProduct />
  }, [location.pathname])

  return <div className="left-sidebar">{menu}</div>
}

export default MenuLeft
