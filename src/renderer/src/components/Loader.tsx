
import { useAppContext } from "@renderer/context/AppContext"
import { useRef } from "react"
export const LoaderComponent = () => {
    const modalQrRef: any = useRef(null)
    const { qr, readyConection } = useAppContext("get")
    return <>
        {readyConection === false && !!qr &&
            <dialog ref={modalQrRef} className="modal modal-open">
                <div className="modal-box flex justify-center items-center">
                    {
                        !!qr && <img src={qr} width={"60%"} alt="a" />
                    }
                </div>
            </dialog>
        }
        {readyConection === false && !!qr === false && <dialog ref={modalQrRef} className="modal modal-open">
            <div className="modal-box flex flex-col justify-center items-center">
                <span className="loading loading-ring loading-lg"></span>
                <div className="text-white text-lg">
                    CONECTANDO
                </div>
            </div>
        </dialog>}
    </>
}