import { useTempalteAddStore } from "@renderer/context/storeTemplate"
import { numberCompare } from "@renderer/util/utiles"

export default function TemplateSubir({ orden }) {
    const pageState = useTempalteAddStore((state) => state.pageState)
    if (numberCompare(orden, pageState) === false) {
        return <></>
    }
    return <div className="relative w-full h-full ">
        TemplateOrden {""+numberCompare(orden, pageState)}
    </div>
}