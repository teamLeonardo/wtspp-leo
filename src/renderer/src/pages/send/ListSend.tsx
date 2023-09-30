import { useAppContext } from "@renderer/context/AppContext"
import { useSendMessage } from "@renderer/context/sendMessage"
import { STATE_SEND } from "@renderer/util/utiles"
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
        sendMessage
    ] = useSendMessage((state) =>
        [
            state.list,
            state.removePhone,
            state.listStatePhone,
            state.stateAllSend,
            state.sendMessage
        ]
    )
    const { listTemplate } = useAppContext("get")
    const HandelEnviar = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const dataForm = Object.fromEntries(new FormData(e.currentTarget));
            console.log("dataForm.selectTemplate", dataForm.selectTemplate);
            if (dataForm.selectTemplate && typeof dataForm.selectTemplate === "string") {
                sendMessage(dataForm.selectTemplate)
            } else {
                alert("Selecione una plantilla.")
            }
        } catch (error) {
            alert("Paso un problema")
        }
    }

    return <form
        onSubmit={(e) => { HandelEnviar(e) }}
        className="grid h-full grid-rows-[auto,1fr,auto] gap-5 overflow-hidden "
    >
        <select
            name="selectTemplate"
            className="select select-xs select-primary w-full max-w-xs"
        >
            <option value={""} key={"0"} disabled hidden selected>Seleciona la plantilla que usaras.</option>
            {
                listTemplate.map((template, idx) => {
                    if (template.uid) return <option key={idx} value={template.uid}>{template.name}</option>
                    return <></>
                })
            }
        </select>
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
            <button type="submit" className="btn btn-success" > Enviar</button>
        </div>
    </form>
}