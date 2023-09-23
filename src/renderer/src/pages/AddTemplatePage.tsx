import { StepsAddTemplate } from "@renderer/components/StepsAddTemplate";
import { useTempalteAddStore } from "@renderer/context/storeTemplate";
import TemplateNames from "./addTemplate/TemplateNames";
import TemplateSubir from "./addTemplate/TemplateSubir";
import TemplateOrden from "./addTemplate/TemplateOrden";
import { useEffect } from "react";
import { scrollUp } from "@renderer/util/utiles";

export default function AddTemplate() {
    const [increase, pageState] = useTempalteAddStore(({ increase, pageState }) => [increase, pageState])
    const handleChangeStpes = (next: boolean) => {
        const numberIngrement: number = next ? 1 : -1;
        if (pageState === 0 && next === false) return
        if (pageState === 2 && next === true) return
        increase(pageState + numberIngrement)
    }
    useEffect(()=> {
        return ()=> {
            increase(0)
            scrollUp()
        }
    }, [])
    return <div className="relative w-full h-full grid grid-rows-[auto,1fr,auto]">
        <StepsAddTemplate />
        <div className="container">
            <TemplateNames orden={0} />
            <TemplateSubir orden={1} />
            <TemplateOrden orden={2} />
        </div>
        <div className="relative flex justify-center">
            <div className="join w-auto grid grid-cols-2">
                <button onClick={()=> handleChangeStpes(false)}  className="join-item btn btn-sm btn-outline">Retroceder</button>
                <button onClick={()=> handleChangeStpes(true)} className="join-item btn btn-sm btn-outline">Siguiente</button>
            </div>
        </div>
    </div>
}