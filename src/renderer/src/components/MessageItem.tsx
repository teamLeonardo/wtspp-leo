import {
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IMessage, useTempalteAddStore } from "@renderer/context/storeTemplate";
import { FaFileAlt, FaFilePdf, FaTrash } from "react-icons/fa"
export const MessageItem = (props: IMessage) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: props.id });
    const [removeMesage, allMedia] = useTempalteAddStore((state) => [state.removeMesage, state.info.media])

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    const handleClose = (idList) => {
        removeMesage(idList)
    }
    return (
        <div
            style={style}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className="chat chat-end group"
        >
            <div className="chat-bubble grid grid-cols-[1fr,auto] ">
                <div className="pr-2 flex flex-col flex-nowrap w-full gap-1">
                    <div className="w-full">
                        {
                            props.whitMedia && props.keyMedia.map((key, idx) => {
                                const name: string = key
                                const value: any = allMedia[key]
                                if ((value?.type as string).includes("image")) {
                                    return <img
                                        key={`${name}${idx}`}
                                        className="mask mask-squircle w-[50px] h-[50px]"
                                        src={value.base}
                                    />
                                }
                                if ((value?.type as string).includes("pdf")) {
                                    return <div
                                        key={`${name}${idx}`}
                                        className="bg-red-500 w-[50px] h-[50px] border rounded-md flex flex-col justify-center items-center"
                                    >
                                        <FaFilePdf />
                                        <div className="truncate w-[90%]">
                                            {name}
                                        </div>
                                    </div>
                                }
                                return <div
                                    key={`${name}${idx}`}
                                    className="bg-gray-700 w-[50px] h-[50px] border rounded-md flex flex-col justify-center items-center"
                                >
                                    <FaFileAlt />
                                    <div className="truncate w-[90%]">
                                        {name}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className="w-full">
                        {props.message || ""}
                    </div>
                </div>
                <div className="flex justify-center items-end">
                    <button
                        onClick={() => handleClose(props.id)}
                        className="btn btn-xs p-[2px] invisible group-hover:visible pointer-events-auto"
                    >
                        <FaTrash size={10} />
                    </button>
                </div>
            </div>

        </div>
    );
}