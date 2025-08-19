import Styles from "./Nav.module.css"
import { IoLogoFlickr } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Nav() {

    const navigate = useNavigate()

    return (
        <nav className={Styles.container}>
            {/* Logo temporal */}
            <IoLogoFlickr color="#fff" />
            <button className={Styles.btnLogin} onClick={() => navigate("/login")} ><span>Login</span></button>
        </nav>

    )
}

export default Nav