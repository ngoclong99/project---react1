import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { checkToken } from '../../constant/user'
import FormUpdate from './components/FormUpdate'
import UserProduct from './components/UserProduct'
import CreateProduct from './components/CreateProduct'
import EditProduct from './components/EditProduct'

Account.propTypes = {}

function Account(props) {
  const navigate = useNavigate()
  const login = checkToken()

  useEffect(() => {
    if (!login) {
      return navigate('/login')
    }
  }, [login])
  return (
    <>
      <Routes>
        <Route path="update" element={<FormUpdate />} />
        <Route path="product" element={<UserProduct />} />
        <Route path="create-product" element={<CreateProduct />} />
        <Route path="edit-product/:productId" element={<EditProduct />} />
      </Routes>

      {props.children}
    </>
  )
}

export default Account
