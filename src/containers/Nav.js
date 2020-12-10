import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';



export class Nav extends Component {
    render() {
        return (
            <div className="nav">
                <nav className="black white-text">
                    <ul>
                        <li className="brand-logo"><NavLink to="/">Painter</NavLink></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Nav
