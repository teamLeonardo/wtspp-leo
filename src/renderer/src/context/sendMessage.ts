
import { create } from 'zustand'
import { IMessage } from './storeTemplate'
import { STATE_SEND, sleep } from '@renderer/util/utiles'

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
            const countSend = Object.values(newlistStatePhone)
                .filter((state) => state === STATE_SEND.success).length;
            return {
                list: newList,
                listStatePhone: newlistStatePhone,
                stateAllSend: `${countSend}/${newList.length}`
            }
        })
    },
    removePhone(by: string) {
        set((state) => {
            const newList = state.list.filter((phone) => phone !== by);
            const newlistStatePhone = Object
                .keys(state.listStatePhone)
                .filter(key => key !== by)
                .reduce((obj, key) => {
                    obj[key] = state.listStatePhone[key];
                    return obj;
                }, {});
            const countSend = Object.values(newlistStatePhone)
                .filter((state) => state === STATE_SEND.success).length;
            return {
                list: newList,
                listStatePhone: newlistStatePhone,
                stateAllSend: `${countSend}/${newList.length}`
            }
        })
    },
    async sendMessage(uid: string) {
        try {


            const changeState = (number, state) => {
                set(({ listStatePhone, list }) => {
                    const newlistStatePhone = {
                        ...listStatePhone,
                        ...{ [number]: state }
                    };
                    const countSend = Object.values(newlistStatePhone)
                        .filter((state) => state === STATE_SEND.success).length;
                    return {
                        listStatePhone: newlistStatePhone,
                        stateAllSend: `${countSend}/${list.length}`
                    }
                })
            }

            const listTemplate: any[] = window.store.get('listTemplate') || [];

            const list = get().list;

            if (!!listTemplate.length && list.length) {
                const filterList = listTemplate.find((val) => val.uid === uid) as any
                if (filterList && filterList.messages) {
                    const messages = (filterList.messages as IMessage[])
                    for (const number of list) {
                        try {
                            changeState(number, STATE_SEND.warning)
                            for (const { message, whitMedia, pathMedia } of messages) {
                                console.log({ message, whitMedia, pathMedia });
                                if (whitMedia) {
                                    await window.api.invoke("getWtspp", "sendMessageMedia", number, pathMedia[0], { caption: message })
                                } else {
                                    await window.api.invoke("getWtspp", "sendMessage", number, message)
                                }
                            }
                            changeState(number, STATE_SEND.success)
                            await sleep(5 * 1000)
                        } catch (error) {
                            changeState(number, STATE_SEND.error)
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

}))