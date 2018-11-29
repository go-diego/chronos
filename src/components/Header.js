import React from "react";
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/home">
                    <img
                        src="https://bulma.io/images/bulma-logo-white.png"
                        alt="Bulma: a modern CSS framework based on Flexbox"
                        width="112"
                        height="28"
                    />
                </Link>
            </div>
            <div className="navbar-menu">
                <div className="navbar-end">
                    <a
                        className="navbar-item"
                        target="_blank"
                        href="https://github.com/go-diego/chronos">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                            alt="Github Repository"
                            width="60"
                        />
                    </a>
                </div>
            </div>
        </nav>
    );
}
