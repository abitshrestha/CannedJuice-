import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block sidebar  bg-body-tertiary">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/dashboard/admin'>
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/dashboard/admin/add-category'>
                                Add Category
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/dashboard/admin/add-fruit-juice'>
                                Add Fruit Juice
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/dashboard/admin/fruit-juices'>
                                Fruit Juices
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default AdminMenu