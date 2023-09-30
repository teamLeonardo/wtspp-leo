import { IMessage, useTempalteAddStore } from "@renderer/context/storeTemplate"
import { numberCompare, scrollDown } from "@renderer/util/utiles"
import { DndContext, MouseSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove
} from "@dnd-kit/sortable";
import imgbg from "@renderer/assets/wtsppwallpaper.jpg"
import { IoMdSend } from "react-icons/io"


import { EmoginFloting } from "@renderer/components/EmoginFloting";
import { MessageItem } from "@renderer/components/MessageItem";

import { useRef } from "react"
import { BtnMenuPlusMessage } from "@renderer/components/BtnMenuPlusMessage";
import { FaFileAlt, FaFilePdf } from "react-icons/fa";

export default function TemplateOrden({ orden }) {

    const [
        pageState,
        messageMedia,
        currenSelectMedia
    ] = useTempalteAddStore((state) => [
        state.pageState,
        state.messageMedia,
        state.currenSelectMedia
    ]);
    const isMedia: boolean = (messageMedia.length > 0);
    const sensors = useSensors(
        useSensor(MouseSensor, {
            // Require the mouse to move by 10 pixels before activating
            activationConstraint: {
                distance: 10,
            },
        })
    );

    const [messageInput, setMessageInput] = useTempalteAddStore((state) => ([state.messageInput, state.setMessageInput]));

    const [addMesages, messages] = useTempalteAddStore((state) => [state.addMesages, state.info.messages]);

    const RefContainer = useRef(null)

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
        keyMedia: isMedia ? messageMedia.map((media) => {
            return Object.keys(media)[0]
        }) : [],
        pathMedia: isMedia ? messageMedia.map((media) => {
            const urlPath = Object.values(media)[0] as any
            return urlPath.path
        }) : [],
        whitMedia: isMedia,
    });

    const handleClickAdd = () => {
        const newItem = createNewItem()
        // agrega el mensaje
        addMesages(newItem)
        // limpia input
        setMessageInput("", false)
        currenSelectMedia({})
        // scrolea asia abajo
        setTimeout(() => {
            scrollDown(RefContainer.current)
        }, 0);
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
        <div className="relative overflow-x-hidden overflow-y-auto pt-6 pr-2 ml-[500px]" ref={RefContainer}>
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                sensors={sensors}
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
                <BtnMenuPlusMessage />
                <div className="relative w-[400px] max-w-lg">
                    <textarea
                        placeholder="Escribe aqui."
                        className="input w-full input-bordered input-primary  input-sm"
                        defaultValue={""}
                        value={messageInput}
                        onChange={(e) => {
                            setMessageInput(e.currentTarget.value || "", false)
                        }}
                    />
                    <div
                        className="card w-[500px] max-h-[100px] bg-base-100 shadow-xl absolute top-[-120px] left-0 overflow-visible"
                        style={{
                            display: isMedia ? "block" : "none"
                        }}
                    >
                        <div className="card-body flex flex-row flex-nowrap w-full">
                            {
                                isMedia && messageMedia.map((media) => {
                                    const name: any = Object.keys(media)[0]
                                    const value: any = Object.values(media)[0]
                                    if ((value?.type as string).includes("image")) {
                                        return <img
                                            key={name}
                                            className="mask mask-squircle w-[50px] h-[50px]"
                                            src={value.base}
                                        />
                                    }
                                    if ((value?.type as string).includes("pdf")) {
                                        return <div
                                            key={name}
                                            className="bg-red-500 w-[50px] h-[50px] border rounded-md flex flex-col justify-center items-center"
                                        >
                                            <FaFilePdf />
                                            <div className="truncate w-[90%]">
                                                {name}
                                            </div>
                                        </div>
                                    }
                                    return <div
                                        key={name}
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
                    </div>
                </div>
                <div className="btn btn-primary btn-sm btn-circle" onClick={() => handleClickAdd()}>
                    <IoMdSend size={20} />
                </div>
            </div>

        </div>

    </div>
}