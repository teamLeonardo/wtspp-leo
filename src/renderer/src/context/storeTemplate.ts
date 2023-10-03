
import { mergeArray, uid } from '@renderer/util/utiles'
import { create } from 'zustand'


export interface IMessage {
    id: number,
    message: string,
    whitMedia: boolean,
    keyMedia: string[],
    pathMedia: string[]
}
interface IMedia {
    [key: string]: object
}

export interface IInfo {
    name: string,
    description: string,
    media: IMedia,
    messages: IMessage[],
    uid: string
}
interface TempalteAddState {
    pageState: number,
    messageInput: string,
    messageMedia: any[]
    info: IInfo,
    setMessageInput: (by: string, isEmogi: boolean) => void,
    increase: (by: number) => void,
    addName: (by: IAddNameAttr) => boolean,
    addMedia: (by: IMedia) => void,
    addMesages: (by: IMessage | IMessage[]) => void,
    saveInfo: () => boolean,
    removeInfo: (by: string) => void
    removeMesage: (by: number) => void
    currenSelectMedia: (by: IMedia) => void
    selectEditInfo: (by: IInfo) => void
}
export interface IAddNameAttr {
    name: string,
    description: string
}

const defaulInfo: IInfo = {
    name: "",
    description: "",
    media: {},
    messages: [],
    uid: ""
}

export const useTempalteAddStore = create<TempalteAddState>()((set, get) => ({
    pageState: 0,
    info: defaulInfo,
    messageInput: "",
    messageMedia: [],
    setMessageInput: (by: string, isEmogi: boolean) => {
        set((state) => ({ messageInput: isEmogi ? state.messageInput + by : by }))
    },
    increase: (by: number) => set(() => ({ pageState: by })),
    addName: (attr: IAddNameAttr): boolean => {
        try {
            set((state) => ({
                info: {
                    ...state.info,
                    name: attr.name,
                    description: attr.description
                }
            }))
            return true
        } catch (error) {
            return false
        }
    },
    selectEditInfo(info: IInfo) {
        if (Object.keys(info).length === 0) {
            set({ info: defaulInfo })
            return
        }
        set({ info })
    },
    currenSelectMedia: (attr: IMedia) => {
        if (Object.keys(attr).length === 0) {
            set({ messageMedia: [] });
            return;
        }
        set((state) => {
            return {
                messageMedia: [
                    ...state.messageMedia,
                    attr
                ]
            }
        });
    },
    addMedia: (attr: IMedia) => {
        set((state) => ({
            info: {
                ...state.info,
                media: {
                    ...state.info.media,
                    ...attr
                }
            }
        }))
    },
    addMesages: (attr: IMessage | IMessage[]) => {
        set((state) => {
            if (Array.isArray(attr)) {
                return {
                    info: {
                        ...state.info,
                        messages: attr
                    }
                }
            } else {
                return {
                    info: {
                        ...state.info,
                        messages: [
                            ...(state.info.messages || []),
                            attr
                        ]
                    }
                }
            }
        })
    },
    removeMesage(id: number) {
        set((state) => {
            const newMessage = state.info.messages
                .filter(({ id: idMesa }) => idMesa !== id)

            return {
                info: {
                    ...state.info,
                    messages: newMessage
                }
            }
        })
    },
    saveInfo: (): boolean => {
        try {

            const lista = window.store.get('listTemplate') || [];
            const info = get().info
            const newListTemplate: IInfo[] = mergeArray([{
                ...info,
                uid: info.uid && info.uid.length > 0 ? info.uid : uid()
            }], lista, "uid");

            window.store.set('listTemplate', newListTemplate);
            set({ info: defaulInfo, pageState: 0, messageInput: "" })
            return true

        } catch (error) {
            console.log(error);
            return false
        }
    },
    removeInfo(uid: string) {
        try {

            const lista = window.store.get('listTemplate') || [];
            const newListTemplate = lista.filter((template) => template.uid !== uid)
            window.store.set("listTemplate", newListTemplate)
        } catch (error) {
            console.log(error);
        }
    }

}))