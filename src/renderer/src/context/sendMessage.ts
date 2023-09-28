
import { create } from 'zustand'
import { IMessage } from './storeTemplate'
import { STATE_SEND } from '@renderer/util/utiles'

interface ISendMessageState {
    list: string[]
    listTemplate: any[]
    stateAllSend: string
    listStatePhone: {
        [_: string]: string
    } | {}
    addPhone: (by: string | any[]) => void
    removePhone: (by: string) => void
    sendMessage: (uid: string) => void
}


export const useSendMessage = create<ISendMessageState>()((set, get) => ({
    list: [],
    listTemplate: window.store.get('listTemplate') || [],
    listStatePhone: {},
    stateAllSend: "",
    addPhone(by: string | string[]) {
        const newBy: string[] = typeof by === "string" ? [by] : by
        set((state) => {
            const newList = state.list.concat(
                newBy.filter((item) => state.list.indexOf(item) < 0)
            )
            const newlistStatePhone = newList.reduce((accumulator, curValue) => {
                accumulator[curValue] = state.listStatePhone[curValue] || STATE_SEND.idle
                return accumulator
            }, {})

            return {
                list: newList,
                listStatePhone: newlistStatePhone
            }
        })
    },
    removePhone(by: string) {
        set((state) => ({
            list: state.list.filter((phone) => phone !== by),
            listStatePhone: Object
                .keys(state.listStatePhone)
                .filter(key => key !== by)
                .reduce((obj, key) => {
                    obj[key] = state.listStatePhone[key];
                    return obj;
                }, {})
        }))
    },
    sendMessage(uid: string) {
        const listTemplate: any[] = window.store.get('listTemplate') || [];
        const list = get().list;
        const changeState = (number, state) => {
            set(({ listStatePhone }) => (
                {
                    listStatePhone: {
                        ...listStatePhone,
                        ...{ [number]: state }
                    }
                }
            ))
        }
        if (!!listTemplate.length && list.length) {
            const filterList = listTemplate.find((val) => val.uid === uid) as any
            if (filterList && filterList.messages) {
                const messages = (filterList.messages as IMessage[]).sort((a, b) => a.id - b.id);
                list.forEach((number: string) => {
                    try {
                        changeState(number, STATE_SEND.warning)
                        messages.forEach(async (message) => {
                            await window.api.invoke("getWtspp", "sendMessage", number, message)
                        })
                        changeState(number, STATE_SEND.success)
                    } catch (error) {
                        changeState(number, STATE_SEND.error)
                    }

                })
            }
        }
    }

}))