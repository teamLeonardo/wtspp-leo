import { useAppContext } from "@renderer/context/AppContext"
import { scrollUp } from "@renderer/util/utiles"
import { useState, useRef, useEffect } from "react"
import { FaArrowRight, FaInfoCircle } from "react-icons/fa"
import { ListSend } from "./send/ListSend"
import { useSendMessage } from "@renderer/context/sendMessage"

export default function MassPage() {

    const { contacts, phone } = useAppContext("get") as { contacts: any[], phone: string[] }
    const { getContacts, setListCheck, removeCheck } = useAppContext("set")
    const [addPhone] = useSendMessage((state) => [state.addPhone])
    const modalRef = useRef(null)
    const [openModal, setOpenModal] = useState<any>(null)

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
    const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>, id) => {
        if (event.currentTarget.checked) {
            setListCheck(id)
        } else {
            removeCheck(id)
        }
    }

    const addListSend = () => {
        if (phone && phone.length > 0) {
            addPhone(phone)
        }
    }
    useEffect(() => {
        return () => {
            scrollUp()
        }
    }, [])
    return (

        <div className="w-full h-full">
            <div className="grid grid-cols-[1fr,auto,1fr] w-full h-full overflow-hidden">
                <div className="grid overflow-auto flex-grow card bg-base-300 rounded-box place-items-center">
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
                    <h1 className="mb-4">Lista de contactos </h1>
                    <table className="table  table-pin-rows table-xs">
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox checkbox-sm checked:checkbox-primary" />
                                    </label>
                                </th>
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
                                        <td>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={phone.indexOf(contact.id._serialized) > -1}
                                                    className="checkbox checkbox-sm checked:checkbox-primary"
                                                    onChange={(event) => {
                                                        handleChangeCheck(event, contact?.id?._serialized)
                                                    }}
                                                />
                                            </label>
                                        </td>
                                        <td className="min-w-[60px]">{contact.name || "---"}</td>
                                        <td className="min-w-[60px]">{contact.pushname || "---"}</td>
                                        <td className="min-w-[60px]">{contact.number || "---"}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-circle"
                                                onClick={() => handleGetInfo(contact.id._serialized)}
                                            >
                                                <FaInfoCircle size={15} />
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>

                    </table>
                </div>
                <div className="divider divider-horizontal">
                    <button className="btn btn-sm btn-circle btn-primary " onClick={() => addListSend()}>
                        <FaArrowRight size={15} />
                    </button>
                </div>
                <div className="p-[10px_0_10px_10px] card relative overflow-hidden bg-base-300 rounded-box">
                    <ListSend />
                </div>
            </div>


        </div>

    )
}