import EmojiPicker, {
    EmojiStyle,
} from "emoji-picker-react";
import { useState } from "react";

import { BsEmojiSmile } from "react-icons/bs"
import { useTempalteAddStore } from "@renderer/context/storeTemplate";

export const EmoginFloting = () => {

    const [open, setOpen] = useState(false);

    const [setMessageInput] = useTempalteAddStore((state) => ([state.setMessageInput]));

    const handleClickBtn = () => {
        setOpen((state) => !state)
    }

    return <div className="relative">
        <div className="relative btn btn-neutral btn-sm btn-circle" onClick={() => handleClickBtn()}>
            <BsEmojiSmile size={20} />
        </div>
        <div
            className="absolute top-[-310px] left-0 "
            style={{
                display: open ? "block" : "none"
            }}
        >
            <EmojiPicker
                onEmojiClick={(emojiData) => {
                    setMessageInput(emojiData.isCustom ? emojiData.unified : emojiData.emoji , true)
                }}
                previewConfig={{
                    showPreview: false
                }}
                searchDisabled={true}
                autoFocusSearch={false}
                emojiStyle={EmojiStyle.NATIVE}
                width={280}
                height={300}
            />
        </div>
    </div>
}