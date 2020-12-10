import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';



export class Nav extends Component {
    render() {
        return (
            <div className="nav">
                <nav className="black"> 
                    <a href="#" class="brand-logo">Painter</a>
                </nav>
            </div>
        )
    }
}

export default Nav
