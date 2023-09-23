import { useAppContext } from "@renderer/context/AppContext"
import { scrollUp } from "@renderer/util/utiles"
import { useState, useRef, useEffect } from "react"
export default function MassPage() {
    const { contacts } = useAppContext("get")
    const { getContacts } = useAppContext("set")
    const modalRef = useRef(null)
    const [openModal, setOpenModal] = useState<any>(null)
    //name
    //id _serialized
    //number

    const handleGetInfo = (phone: string) => {
        getContacts(phone).then((info: any) => {
            setOpenModal(info);
            (modalRef.current as any).showModal()
        })
    }
    const LoadImage = () => {
        if (openModal?.img) {
            return <div className="avatar online">
                <div className="w-24 rounded-full">
                    <img src={openModal?.img} />
                </div>
            </div>
        } else {
            return <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                    <span className="text-3xl">
                        {openModal?.pushname && openModal?.pushname[0]}
                        {openModal?.name && openModal?.name[0]}
                    </span>
                </div>
            </div>
        }
    };
    useEffect(()=> {
        return ()=> {
            scrollUp()
        }
    }, [])
    return (

        <div className="w-full">
            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <div className="w-full flex flex-col justify-center items-center ">
                        <LoadImage />
                        <h3 className="font-bold text-lg">
                            {openModal?.pushname || openModal?.pushname || ""}
                        </h3>
                        <p className="py-4">
                            {openModal?.number || ""}
                        </p>

                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <table className="table table-xs">
                <thead>
                    <tr>
                        <th>Enumerado</th>
                        <th>Nombres</th>
                        <th>Pushname</th>
                        <th>Numero</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contacts &&
                        [...contacts].length > 0 &&
                        [...contacts].map((contact, idx) => {
                            return <tr key={idx}>
                                <th className="min-w-[60px]">{idx + 1}</th>
                                <td className="min-w-[60px]">{contact.name || "---"}</td>
                                <td className="min-w-[60px]">{contact.pushname || "---"}</td>
                                <td className="min-w-[60px]">{contact.number || "---"}</td>
                                <th>
                                    <button className="btn" onClick={() => handleGetInfo(contact.id._serialized)}>info</button>
                                </th>
                            </tr>
                        })
                    }
                </tbody>

            </table>
        </div>

    )
}