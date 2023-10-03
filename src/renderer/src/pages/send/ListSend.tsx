import { useAppContext } from "@renderer/context/AppContext"
import { useSendMessage } from "@renderer/context/sendMessage"
import { STATE_SEND } from "@renderer/util/utiles"
import { useState } from "react"
import { FaCheck, FaRegClock, FaRegCommentDots, FaTimes, FaTrash } from "react-icons/fa"

const dataTooltip = {
    [STATE_SEND.idle]: "Esperando una accion.",
    [STATE_SEND.warning]: "Enviando.",
    [STATE_SEND.error]: "Error en el envio.",
    [STATE_SEND.success]: "Envio exitoso.",
}
const ItemState = ({ state }) => {
    if (state === STATE_SEND.idle) {
        return <div className="bg-neutral-focus text-primary rounded-full w-5 ring ring-primary ring-offset-base-100 ring-offset-1">
            <FaRegCommentDots size={12} />
        </div>
    }
    if (state === STATE_SEND.warning) {
        return <div className="bg-neutral-focus text-warning rounded-full w-5 ring ring-warning ring-offset-base-100 ring-offset-1">
            <FaRegClock size={12} />
        </div>
    }
    if (state === STATE_SEND.error) {
        return <div className="bg-neutral-focus text-error rounded-full w-5 ring ring-error ring-offset-base-100 ring-offset-1">
            <FaTimes size={12} />
        </div>
    }
    if (state === STATE_SEND.success) {
        return <div className="bg-neutral-focus text-success rounded-full w-5 ring ring-success ring-offset-base-100 ring-offset-1">
            <FaCheck size={12} />
        </div>
    }
    return <></>
}
export const ListSend = () => {
    const [
        list,
        removePhone,
        listStatePhone,
        stateAllSend,
        sendMessage,
        addPhone
    ] = useSendMessage((state) =>
        [
            state.list,
            state.removePhone,
            state.listStatePhone,
            state.stateAllSend,
            state.sendMessage, 
            state.addPhone
        ]
    )
    const { listTemplate } = useAppContext("get")

    const [phone, setPhone] = useState<string[]>([])
    const HandelEnviar = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            const formContainer = e.currentTarget.closest("#container-send-from") as HTMLDivElement
            if (formContainer !== null) {
                const dataForm = {
                    selectTemplate: formContainer.querySelector<HTMLSelectElement>("[name='selectTemplate']")?.value
                }
                if (dataForm.selectTemplate && typeof dataForm.selectTemplate === "string") {
                    sendMessage(dataForm.selectTemplate)
                } else {
                    alert("Selecione una plantilla.")
                }
            }
        } catch (error) {
            console.log(error);

            alert("Paso un problema")
        }
    }

    const HandlePasteImport = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        const format = "text/plain"
        const excel_data = e.clipboardData.getData(format);

        const listaPhone = excel_data.split("\r\n")
        if (/^[0-9]+$/.test(listaPhone.join("")) === false) {
            e.currentTarget.value = "No cumple el formato de solo números."
            return
        }
        setPhone(listaPhone.map((phone) => (phone + "@c.us")))
        e.currentTarget.value = excel_data;
    }

    const HandleAgregarPhone = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        if (phone && phone.length > 0) {
            addPhone(phone)
        }
    }
    return <div
        id="container-send-from"
        className="grid h-full grid-rows-[auto,1fr,auto] gap-5 overflow-hidden "
    >
        <div className="relative w-full grid grid-cols-2">
            <select
                name="selectTemplate"
                className="select select-xs select-primary w-full max-w-xs place-self-center"
            >
                <option value={""} key={"0"} disabled hidden selected>Seleciona la plantilla que usaras.</option>
                {
                    listTemplate.map((template, idx) => {
                        if (template.uid) return <option key={idx} value={template.uid}>{template.name}</option>
                        return <></>
                    })
                }
            </select>
            <div className="relative place-self-center">
                <label htmlFor="my_modal_Import" className="btn btn-warning btn-xs">Importar Contactos</label>

                {/* Put this part before </body> tag */}
                <input type="checkbox" id="my_modal_Import" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">
                        <p className="py-4">Pegar aqui el contenido del excel</p>
                        <textarea onPaste={(e) => HandlePasteImport(e)} className="textarea textarea-bordered w-full" cols={30} rows={12}></textarea>
                        <div className="w-full flex justify-end gap-6">
                            <div onClick={(e) => HandleAgregarPhone(e)} className="btn btn-xs btn-success">Cargar contactos</div>
                        </div>
                    </div>
                    <label className="modal-backdrop" htmlFor="my_modal_Import">Cerrar</label>

                </div>
            </div>
        </div>
        <div className="w-full h-full overflow-auto">
            <table className="table table-pin-rows w-full table-xs h-auto">
                <thead>
                    <tr>
                        <th>Numero</th>
                        <th>Estado</th>
                        <th>{stateAllSend}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list && list.map((numero, idx) => {
                            return <tr key={idx}>
                                <td>
                                    {numero}
                                </td>
                                <td>
                                    <div className="flex gap-1">
                                        <div className="avatar placeholder tooltip" data-tip={dataTooltip[listStatePhone[numero]]}>
                                            <ItemState state={listStatePhone[numero]} />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <button type="button" onClick={() => { removePhone(numero) }} className="btn btn-sm btn-circle btn-error">
                                        <FaTrash size={12} />
                                    </button>
                                </td>
                            </tr>
                        })
                    }


                </tbody>

            </table>
        </div>

        <div className="flex justify-center items-center">
            <button type="submit" className="btn btn-success" onClick={(e) => HandelEnviar(e)} > Enviar</button>
        </div>
    </div>
}