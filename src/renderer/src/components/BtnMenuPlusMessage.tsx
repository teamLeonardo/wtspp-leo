import { AiOutlinePlus } from "react-icons/ai"
import { FaFileAlt, FaFilePdf } from "react-icons/fa";
import { useState } from "react"
import { useTempalteAddStore } from "@renderer/context/storeTemplate";
export const BtnMenuPlusMessage = () => {
    const [media, currenSelectMedia] = useTempalteAddStore((state) => [state.info.media, state.currenSelectMedia])
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState(false)
    const addMediaMesage = (any) => {
        currenSelectMedia(any)
    }
    return <div className="relative ">
        <div
            className="btn btn-neutral relative btn-sm btn-circle"
            onClick={() => {
                setOpen((state) => !state)
                setFile(false)
            }}
        >
            <AiOutlinePlus size={20} />
        </div>
        <div
            className="card w-[500px] max-h-[100px] bg-base-100 shadow-xl absolute top-[-120px] left-0 overflow-visible"
            style={{
                display: file ? "block" : "none"
            }}
        >
            <div className="card-body flex flex-row flex-nowrap w-full">
                {
                    Object.keys(media).length > 0 && Object.keys(media).map((name) => {
                        const value: any = media[name]
                        if ((value?.type as string).includes("image")) {
                            return <img
                                key={name}
                                className="mask mask-squircle w-[50px] h-[50px]"
                                src={value.base}
                                onClick={() => {
                                    addMediaMesage({ [name]: media[name] })
                                }}
                            />
                        }
                        if ((value?.type as string).includes("pdf")) {
                            return <div
                                key={name}
                                className="bg-red-500 w-[50px] h-[50px] border rounded-md flex flex-col justify-center items-center"
                                onClick={() => {
                                    addMediaMesage({ [name]: media[name] })
                                }}
                            >
                                <FaFilePdf />
                                <div className="truncate w-[90%]">
                                    {name}
                                </div>
                            </div>
                        }
                        return <div
                            key={name}
                            className="bg-gray-700 w-[50px] h-[50px] border rounded-md flex flex-col justify-center items-center"
                        >
                            <FaFileAlt />
                            <div className="truncate w-[90%]">
                                {name}
                            </div>
                        </div>

                    })
                }
            </div>
        </div>
        <ul
            className="menu bg-base-200 rounded-box absolute top-[-60px] left-0"
            style={{
                display: open ? "block" : "none"
            }}
        >
            <li>
                <div
                    onClick={() => {
                        setOpen((state) => !state)
                        setFile((state) => !state)
                    }}
                >
                    <FaFileAlt size={20} />
                </div>
            </li>
        </ul>
    </div>

}