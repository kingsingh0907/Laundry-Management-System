import React from 'react'
import facebookLogo from "../../images/facebook.svg"
import instagramLogo from "../../images/instagram.svg"
import whatsAppLogo from "../../images/whatsapp.svg"
import emailLogo from "../../images/email.svg"
import linkedInLogo from "../../images/linkedin.svg"
import githubLogo from "../../images/github.svg"

const SocialLinks = () => {
    return (
        <>
            <div className="col-md-3 ">
                <div className="profile-work">
                    <p>Social Links</p>
                    <div className="social-links">
                        <a href="instagram" target="thapa"><img src={instagramLogo} alt="instagram.svg" /></a><br />
                        <a href="instagram" target="thapa"><img src={whatsAppLogo} alt="whatsApp.svg" /></a><br />
                        <a href="instagram" target="thapa"><img src={facebookLogo} alt="facebook.svg" /></a><br />
                        <a href="instagram" target="thapa"><img src={linkedInLogo} alt="linkedIn.svg" /></a><br />
                        <a href="instagram" target="thapa"><img src={emailLogo} alt="email.svg" /></a><br />
                        <a href="instagram" target="thapa"><img src={githubLogo} alt="instagram.svg" /></a><br />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SocialLinks
