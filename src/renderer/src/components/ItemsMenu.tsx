import { Link } from "react-router-dom"
import { AiFillHome, AiFillDashboard } from "react-icons/ai"
import { ImInsertTemplate } from "react-icons/im"
export const ItemsMenu = () => {
    return <>
        <li>
            <Link to="/" className='tooltip' data-tip="Inicio" >
                <AiFillHome />
            </Link>
        </li>
        <li>
            <Link to="/template" className="tooltip" data-tip="Modelos">
                <ImInsertTemplate />
            </Link>
        </li>
        <li>
            <Link to="/about" className="tooltip" data-tip="Tablero">
                <AiFillDashboard />
            </Link>
        </li>
    </>
}