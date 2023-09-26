import { IMessage, useTempalteAddStore } from "@renderer/context/storeTemplate"
import { numberCompare } from "@renderer/util/utiles"
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove
} from "@dnd-kit/sortable";
import imgbg from "@renderer/assets/wtsppwallpaper.jpg"
import { IoMdSend } from "react-icons/io"
import { AiOutlinePlus } from "react-icons/ai"
import { EmoginFloting } from "@renderer/components/EmoginFloting";
import { MessageItem } from "@renderer/components/MessageItem";



export default function TemplateOrden({ orden }) {

    const pageState = useTempalteAddStore((state) => state.pageState);

    const [messageInput, setMessageInput] = useTempalteAddStore((state) => ([state.messageInput, state.setMessageInput]));

    const [addMesages, messages] = useTempalteAddStore((state) => [state.addMesages, state.info.messages]);


    if (numberCompare(orden, pageState) === false) {
        return <></>
    }

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over !== null) {
            if (!active.id !== over.id) {
                if (messages) {
                    const oldIndex = messages.findIndex((message) => message.id === active.id);
                    const newIndex = messages.findIndex((message) => message.id === over.id);
                    addMesages(arrayMove(messages, oldIndex, newIndex))
                }
               
            }
        }
    };

    const createNewItem = (): IMessage => ({
        id: messages.length + 1,
        message: messageInput,
        keyMedia: "",
        whitMedia: false,
    });

    const handleClickAdd = () => {
        const newItem = createNewItem()
        addMesages(newItem)
        setMessageInput("", false)
    }

    return <div
        className={`relative 
        overflow-hidden 
        w-full
        h-full
        max-h-full
         grid grid-rows-[1fr,auto] 
         bg-center bg-contain`}
        style={{
            backgroundImage: `url(${imgbg})`,
        }}
    >
        <div className="relative overflow-x-hidden overflow-y-auto pt-6 pr-2 ">
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >

                <SortableContext
                    items={messages}
                    strategy={verticalListSortingStrategy}
                >
                    {messages.map((mess) => (
                        <MessageItem key={mess.id} {...mess} />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
        <div className="relative h-[70px] flex justify-center items-center">
            <div className="flex flex-nowrap items-center gap-2">
                <EmoginFloting />
                <div className="btn btn-neutral btn-sm btn-circle" >
                    <AiOutlinePlus size={20} />
                </div>
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-primary w-[400px] max-w-lg input-sm"
                    defaultValue={""}
                    value={messageInput}
                    onChange={(e) => {
                        setMessageInput(e.currentTarget.value || "", false)
                    }}
                />
                <div className="btn btn-primary btn-sm btn-circle" onClick={() => handleClickAdd()}>
                    <IoMdSend size={20} />
                </div>
            </div>

        </div>

    </div>
}