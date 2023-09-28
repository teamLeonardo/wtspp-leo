import { useAppContext } from "@renderer/context/AppContext"

export const BtnLogOut = () => {
    const { signOut } = useAppContext("set")
    return <div
        className="btn btn-error"
        onClick={() => {
            signOut()
        }}
    >
        Cerrar Session
    </div>
}