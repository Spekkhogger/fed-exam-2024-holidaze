import React from "react";

const Footer = () => {
    return (
        <div>
            <footer className="footer">
                <p className="text-white">
                    © {new Date().getFullYear()} Holidaze. All rights reserved.
                </p>
            </footer>
        </div>
    )
}

export default Footer;