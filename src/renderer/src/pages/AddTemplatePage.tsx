import { StepsAddTemplate } from "@renderer/components/StepsAddTemplate";
import { useTempalteAddStore } from "@renderer/context/storeTemplate";
import TemplateNames from "./addTemplate/TemplateNames";
import TemplateSubir from "./addTemplate/TemplateSubir";
import TemplateOrden from "./addTemplate/TemplateOrden";
import { useEffect } from "react";
import { scrollUp } from "@renderer/util/utiles";
import { useNavigate } from "react-router-dom";

export default function AddTemplate() {
    const [increase, pageState, saveInfo] = useTempalteAddStore(({ increase, pageState, saveInfo }) => [increase, pageState, saveInfo])
    const history = useNavigate();
    const handleChangeStpes = (next: boolean) => {
        const numberIngrement: number = next ? 1 : -1;
        if (pageState === 0 && next === false) return;
        if (pageState === 2 && next === true) {
            if (saveInfo()) {
                history("/template")
            } else {
                alert("No se pudo guardar")
            }
            return
        };
        const newPages = pageState + numberIngrement;
        increase(newPages)
    }
    useEffect(() => {
        return () => {
            increase(0)
            scrollUp()
        }
    }, [])
    return <div className="relative w-full h-full grid grid-rows-[auto,1fr,auto]">
        <StepsAddTemplate />
        <TemplateNames orden={0} />
        <TemplateSubir orden={1} />
        <TemplateOrden orden={2} />
        <div className="relative flex justify-center">
            <div className="join w-auto grid grid-cols-2">
                <button onClick={() => handleChangeStpes(false)} className="join-item btn btn-sm btn-outline">Retroceder</button>
                <button
                    onClick={() => {
                        handleChangeStpes(true)
                    }}
                    className={`join-item btn btn-sm btn-outline ${pageState === 2 && "btn-success"}`}
                >
                    {pageState === 2 ? "Guardar plantilla" : "Siguiente"}
                </button>
            </div>
        </div>
    </div>
}