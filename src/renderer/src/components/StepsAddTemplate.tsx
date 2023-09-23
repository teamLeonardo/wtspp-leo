import { useTempalteAddStore } from "@renderer/context/storeTemplate"

export const StepsAddTemplate = ({ }) => {
    const pageState = useTempalteAddStore((state) => state.pageState)

    const classPageState = (currentStep: number): string => (currentStep <= pageState ? " step-primary" : "")
    return <ul className="steps w-full mt-4">
        <li className={`step ${classPageState(0)}`}>Nombrar</li>
        <li className={`step ${classPageState(1)}`}>Subir archivos</li>
        <li className={`step ${classPageState(2)}`}>Ordenar</li>
    </ul>
}