import {
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IMessage } from "@renderer/context/storeTemplate";

export const MessageItem = (props: IMessage) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            style={style}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className="chat chat-end"
        >
            <div className="chat-bubble">{props.message || ""}</div>
        </div>
    );
}