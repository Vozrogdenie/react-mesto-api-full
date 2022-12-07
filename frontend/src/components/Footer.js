import React from 'react';

function Footer(props) {
    const today = new Date();
    return (
        <footer className="footer">
            <p className="footer__town">&copy;{today.getFullYear()} Mesto Russia</p>
        </footer>
    );
}
export default Footer