import { useTempalteAddStore } from "@renderer/context/storeTemplate"
import { numberCompare } from "@renderer/util/utiles"
import { FaFilePdf, FaFileAlt } from "react-icons/fa"
export default function TemplateSubir({ orden }) {
    const pageState = useTempalteAddStore((state) => state.pageState)
    const info = useTempalteAddStore((state) => state.info)
    const addMedia = useTempalteAddStore((state) => state.addMedia)
    if (numberCompare(orden, pageState) === false) {
        return <></>
    }

    const handleonSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const objSubmit = Object.fromEntries<object | any>(new FormData(event.currentTarget));
        // if () {
        // }
        if (objSubmit.file) {
            const isImage = (objSubmit.file?.type as string).includes("image")
            const toBase64 = file => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
            });

            addMedia({
                [`${objSubmit.file.name}_${Date.now()}`]: {
                    type: objSubmit.file.type,
                    path: objSubmit.file.path,
                    base: isImage ? await toBase64(objSubmit.file) : ""
                }
            })
        }
    }
    return <div
        className="relative w-full h-full py-4 px-8 gap-4 
        max-h-full grid grid-rows-[auto,1fr] overflow-hidden"
    >
        <form onSubmit={(e) => handleonSubmit(e)} className="relative gap-4 flex flex-col justify-center">
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text ">Por favor, carga los archivos que desees.</span>
                </label>
                <input type="file" name="file" className="file-input file-input-xs file-input-bordered file-input-primary w-full max-w-xs" />

            </div>
            <button type="submit" className="btn btn-xs btn-wide btn-primary">
                subir
            </button>
        </form>
        <div className="relative h-full min-h-[30px] w-full overflow-y-visible overflow-x-hidden">
            <div className="h-auto  w-full flex flex-wrap px-4 gap-6 justify-start items-center ">
                {
                    info.media && Object.keys(info.media).length > 0 && Object.keys(info.media).map((name) => {
                        const value: any = info.media[name]
                        if ((value?.type as string).includes("image")) {
                            return <img
                                key={name}
                                className="mask mask-squircle w-[100px] h-[100px]"
                                src={value.base}
                            />
                        }
                        if ((value?.type as string).includes("pdf")) {
                            return <div key={name} className="bg-red-500 w-[100px] h-[100px] border rounded-md flex flex-col justify-center items-center">
                                <FaFilePdf />
                                <div className="truncate w-[90%]">
                                    {name}
                                </div>
                            </div>
                        }
                        return <div key={name} className="bg-gray-700 w-[100px] h-[100px] border rounded-md flex flex-col justify-center items-center">
                            <FaFileAlt />
                            <div className="truncate w-[90%]">
                                {name}
                            </div>
                        </div>

                    })
                }

            </div>
        </div>

    </div>
}