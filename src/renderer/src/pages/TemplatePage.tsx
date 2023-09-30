import { Link } from "react-router-dom"
import { AiOutlinePlus, AiFillDelete } from "react-icons/ai"
import { IoEyeSharp } from "react-icons/io5"
import { useEffect } from "react"
import { scrollUp } from "@renderer/util/utiles"
import { useTempalteAddStore } from "@renderer/context/storeTemplate"
import { useAppContext } from "@renderer/context/AppContext"
const ItemTemplate = ({ info }) => {
    const removeInfo = useTempalteAddStore((state) => state.removeInfo)
    return <div className="card w-[200px] h-[150px] m-0 border border-primary bg-base-100 shadow-xl">
        <div className="card-body mt-0 p-4">
            <h2 className="card-title text-md truncate">{info.name || ""}</h2>
            <p className="text-xs h-auto w-full truncate">{info.description || ""}</p>
            <div className="card-actions gap-1 flex-nowrap justify-center">
                <button className="btn btn-primary btn-circle">
                    <IoEyeSharp size={20} />
                </button>
                <button className="btn btn-secondary btn-circle" onClick={() => removeInfo(info.uid)}>
                    <AiFillDelete size={20} />
                </button>
            </div>
        </div>
    </div>
}
export const Template = () => {
    const { listTemplate } = useAppContext("get")
    useEffect(() => {
        return () => {
            scrollUp()
        }
    }, [])
    return <div className="relative w-full h-full p-4 gap-4 grid grid-rows-[auto,1fr]">
        <div className="flex justify-center items-center">
            <h1 className="text-xl text-white">Plantillas de Mensages.</h1>
        </div>
        <div className="relative">
            <div className="flex flex-wrap gap-3 justify-start ">
                <div className="card w-[200px] h-[150px] bg-primary text-primary-content">
                    <div className="card-body flex justify-center items-center">
                        <Link to={`/template/add`} className="btn btn-outline">
                            <AiOutlinePlus className="text-white" size={40} />
                        </Link>
                    </div>
                </div>
                {
                    listTemplate.map((val, idx) => {
                        return <ItemTemplate info={val} key={idx} />
                    })
                }
            </div>
        </div>

    </div>
}