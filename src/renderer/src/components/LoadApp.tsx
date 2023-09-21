
import { useAppContext } from "@renderer/context/AppContext"
import { Suspense } from "react"

const LoadContainer = () => {
    return <div className="relative w-full h-full flex justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
    </div>
}

export const LoadApp = ({ children }) => {
    const { readyConection } = useAppContext("get")
    if (readyConection === false) {
        return <LoadContainer />
    }
    return <Suspense fallback={<LoadContainer />}>
        {children}
    </Suspense>
}