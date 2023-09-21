import { Link } from "react-router-dom"

export const Template = () => {

    return <div className="relative w-full h-full flex justify-center flex-col gap-4 items-center">
        <div>
            Agregar nuevo template
        </div>
        <Link to={`/template/add`} className="btn btn-success">Agregar</Link>
    </div>
}