import { create } from 'zustand'


interface IMessage {
    orden: number,
    message: string,
    whitImage: boolean,
    keyImage: string
}
interface IImages {
    [key: string]: string
}
interface TempalteAddState {
    pageState: number
    increase: (by: number) => void,
    info: {
        name: string,
        description: string,
        images: IImages,
        messages: IMessage[]
    },
}
interface IAddNameAttr {
    name: string,
    description: string
}

export const useTempalteAddStore = create<TempalteAddState>()((set, get) => ({
    pageState: 0,
    info: {
        name: "",
        description: "",
        images: {},
        messages: []
    },
    increase: (by: number) => set(() => ({ pageState: by })),
    addName: (attr: IAddNameAttr) => {
        set((state) => ({
            info: {
                ...state.info,
                name: attr.name,
                description: attr.description
            }
        }))
    },
    addImages: (attr: IImages) => {
        set((state) => ({
            info: {
                ...state.info,
                images: {
                    ...state.info.images,
                    ...attr
                }
            }
        }))
    },
    addMesages: (attr: IMessage) => {
        set((state) => ({
            info: {
                ...state.info,
                messages: [
                    ...state.info.messages,
                    attr
                ]
            }
        }))
    },
    saveInfo: () => {
        
        window.store.set('listTemplate', [
            ...window.store.get('listTemplate'),
            get().info
        ]);
    }
}))