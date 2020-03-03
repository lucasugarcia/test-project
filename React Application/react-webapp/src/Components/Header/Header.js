import React from 'react';
import LinkWrapper from '../../Utils/LinkWrapper';

const Header = () => {
    return (
        <nav>
            <div className="nav-wrapper indigo lighten-2">
                <LinkWrapper to="/" className="brand-logo" activeStyle={{}}>React</LinkWrapper>
                <ul className="right">
                    <li><LinkWrapper to="/new">New</LinkWrapper></li>
                    <li><LinkWrapper to="/chart">Chart</LinkWrapper></li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;