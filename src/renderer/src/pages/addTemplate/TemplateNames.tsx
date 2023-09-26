import { IAddNameAttr, useTempalteAddStore } from "@renderer/context/storeTemplate"
import { numberCompare } from "@renderer/util/utiles"
import { useRef } from "react"
export default function TemplateNames({ orden }) {
    const [
        pageState,
        addName,
        increase,
        info
    ] = useTempalteAddStore((state) => (
        [
            state.pageState,
            state.addName,
            state.increase,
            state.info
        ]
    ))

    const refToast = useRef<HTMLDivElement>(null)
    if (numberCompare(orden, pageState) === false) {
        return <></>
    }

    const handleonSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const d = (Object.fromEntries<object | any>(new FormData(event.currentTarget)) as IAddNameAttr);
        if (Object.values(d).indexOf("") > -1) {
            refToast.current?.classList.remove("hidden")
            refToast.current?.classList.add("fixed")
            setTimeout(() => {
                refToast.current?.classList.remove("fixed")
                refToast.current?.classList.add("hidden")
            }, 5000)
            return
        }
        if (addName(d)) {
            increase(1)
        }
    }
    return <form onSubmit={handleonSubmit} className="relative w-full h-full py-4 px-8 gap-4 flex flex-col justify-center items-center">
        <div className="toast toast-bottom toast-end hidden" ref={refToast}>
            <div className="alert alert-warning">
                <span>Debe llenar todos los campos.</span>
            </div>
        </div>

        <div className="form-control  w-full max-w-sm">
            <label className="label">
                <span className="label-text">Nombre de la plantilla:</span>
            </label>
            <input name="name" defaultValue={info?.name || ""} type="text" placeholder="Escribe aqui." className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-sm">
            <label className="label">
                <span className="label-text">Descripcion :</span>
            </label>
            <textarea name="description" defaultValue={info?.description || ""} className="textarea textarea-bordered h-24" placeholder="Tu descripcion."></textarea>
        </div>
        <button type="submit" className="btn btn-wide btn-primary">
            Guardar
        </button>
    </form>
}