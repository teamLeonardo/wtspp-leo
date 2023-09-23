import { Link } from "react-router-dom"
import { AiOutlinePlus, AiFillDelete } from "react-icons/ai"
import { IoEyeSharp } from "react-icons/io5"
import { useEffect } from "react"
import { scrollUp } from "@renderer/util/utiles"
const ItemTemplate = () => {
    return <div className="card w-[200px] h-[150px] m-0 border border-primary bg-base-100 shadow-xl">
        <div className="card-body mt-0 p-4">
            <h2 className="card-title text-md truncate">Card title!</h2>
            <p className="text-xs h-auto w-full truncate">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe facilis eos nostrum maxime reprehenderit dignissimos iure iste aspernatur accusantium quia. Perferendis reiciendis ad quasi illo, adipisci dolor molestiae incidunt impedit.</p>
            <div className="card-actions gap-1 flex-nowrap justify-center">
                <button className="btn btn-primary btn-circle">
                    <IoEyeSharp size={20} />
                </button>
                <button className="btn btn-secondary btn-circle">
                    <AiFillDelete size={20} />
                </button>
            </div>
        </div>
    </div>
}
export const Template = () => {
    useEffect(() => {
        return () => {
            scrollUp()
        }
    }, [])
    return <div className="relative w-full h-full p-4 gap-4 grid grid-rows-[auto,1fr]">
        <div className="flex justify-center items-center">
            <h1 className="text-xl text-white"> Agrega nuevo template</h1>
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
                <ItemTemplate />
                <ItemTemplate />
                <ItemTemplate />
                <ItemTemplate />
                <ItemTemplate />
                <ItemTemplate />
                <ItemTemplate />
                <ItemTemplate />
                <ItemTemplate />
                <ItemTemplate />
                <ItemTemplate />
                <ItemTemplate />
                <ItemTemplate />
                <ItemTemplate />
                <ItemTemplate />
                <ItemTemplate />
            </div>
        </div>

    </div>
}