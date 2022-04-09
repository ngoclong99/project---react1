import React from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'

TheAccount.propTypes = {}

const menu = [
  {
    name: 'Account',
    path: 'account/update',
    status: false,
    child: []
  },
  {
    name: 'Product',
    path: 'account/product',
    status: false,
    child: [{ name: 'Create Product', path: 'account/create-product' }]
  }
]

function TheAccount(props) {
  const showMenu = (item, index) => {}
  return (
    <>
      <h2>Account</h2>
      <div className="panel-group category-products" id="accordian">
        {menu.map((item, index) => (
          <div className="panel panel-default" key={index}>
            <div className="panel-heading" onClick={() => showMenu(item, index)}>
              <h4 className="panel-title">
                <NavLink to={item.path}>
                  <span className="badge pull-right">
                    <i className="fa fa-plus"></i>
                  </span>
                  {item.name}
                </NavLink>
              </h4>
            </div>
            {/* {item.child.length > 0 && (
              <div id="sportswear" className={`panel-collapse collapse ${item.status ? 'show ' : ''}`}>
                <div className="panel-body">
                  <ul>
                    {item.child.map((item, index) => (
                      <li key={index}>
                        <Link to={item.path} href="#">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )} */}
          </div>
        ))}
      </div>
    </>
  )
}

export default TheAccount
