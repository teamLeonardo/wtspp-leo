import { useSendMessage } from "@renderer/context/sendMessage"
import { STATE_SEND } from "@renderer/util/utiles"
import { FaCheck, FaRegClock, FaRegCommentDots, FaTimes, FaTrash } from "react-icons/fa"

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
    const [list, removePhone, listStatePhone] = useSendMessage((state) => [state.list, state.removePhone, state.listStatePhone])
    return <div className="grid h-full grid-rows-[auto,1fr,auto] gap-5 overflow-hidden ">
        <select className="select select-xs select-primary w-full max-w-xs">
            <option disabled hidden selected>What is the best TV show?</option>
            <option>Game of Thrones</option>
            <option>Lost</option>
            <option>Breaking Bad</option>
            <option>Walking Dead</option>
        </select>
        <div className="w-full h-full overflow-auto">
            <table className="table table-pin-rows w-full table-xs h-auto">
                <thead>
                    <tr>
                        <th>Numero</th>
                        <th>Estado</th>
                        <th></th>
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
                                        <div className="avatar placeholder">
                                            <ItemState state={listStatePhone[numero]} />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <button onClick={() => { removePhone(numero) }} className="btn btn-sm btn-circle btn-error">
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
            <button className="btn btn-success"> Enviar</button>
        </div>
    </div>
}