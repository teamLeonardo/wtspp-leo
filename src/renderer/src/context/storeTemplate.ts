
import { uid } from '@renderer/util/utiles'
import { create } from 'zustand'


export interface IMessage {
    id: number,
    message: string,
    whitMedia: boolean,
    keyMedia: string
}
interface IMedia {
    [key: string]: object
}
interface TempalteAddState {
    pageState: number,
    messageInput: string,
    info: {
        name: string,
        description: string,
        media: IMedia,
        messages: IMessage[]
    },
    setMessageInput: (by: string, isEmogi: boolean) => void,
    increase: (by: number) => void,
    addName: (by: IAddNameAttr) => boolean,
    addMedia: (by: IMedia) => void,
    addMesages: (by: IMessage | IMessage[]) => void,
    saveInfo: () => boolean,
    getInfoListTemplate: () => any[]
}
export interface IAddNameAttr {
    name: string,
    description: string
}

const defaulInfo = {
    name: "",
    description: "",
    media: {},
    messages: []
}
export const useTempalteAddStore = create<TempalteAddState>()((set, get) => ({
    pageState: 0,
    info: defaulInfo,
    messageInput: "",
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
                            ...state.info.messages,
                            attr
                        ]
                    }
                }
            }
        })
    },
    saveInfo: (): boolean => {
        try {

            const lista = window.store.get('listTemplate') || [];

            window.store.set('listTemplate', [
                ...lista,
                {
                    ...get().info,
                    uid: uid()
                }
            ]);
            
            set(() => ({ info: defaulInfo, messageInput: "", pageState: 0 }));
            return true

        } catch (error) {
            console.log(error);
            return false
        }
    },
    getInfoListTemplate: (): any[] => {
        const lista = window.store.get('listTemplate') || []
        return lista
    }
}))