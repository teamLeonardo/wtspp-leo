
import { useAppContext } from "@renderer/context/AppContext"
export const LoadApp = ({ children }) => {
    const { readyConection } = useAppContext("get")
    if (readyConection === false) {
        return <div className="relative w-full h-full flex justify-center items-center">
            <span className="loading loading-ring loading-lg"></span>
        </div>
    }
    return children
}