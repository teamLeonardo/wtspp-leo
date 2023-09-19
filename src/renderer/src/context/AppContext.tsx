import { createContext, useContext, useState } from "react"


const AppContext = createContext({})



export const AppContextProvider = ({ children }) => {
    const api = (window as any).api;
    const getWtspp = "getWtspp"
    // const [model, setModel] = useState(false)

    // const [info, setInfo] = useState(false)

    const [readyConection, setReadyConection] = useState(false)

    const [imgBase68, setImgBase68] = useState("")

    const [contacts, setContacts] = useState<any[]>([])


    api.on("qr", (_: any, data: any) => {
        if (typeof data.qr === "string" && data.qr !== "") {
            setImgBase68(data.qr)
        }
    })

    api.on("ready", async (_: any, data: boolean) => {
        if (data) {
            api.invoke(getWtspp, "getContacts")
                .then((cont: any[]) => {
                    setContacts(formatContact(cont))
                }).finally(() => {
                    setReadyConection(data)
                })
        }
    })
    const getContacts = async (param: any) => {
        try {
            if (typeof param === "string") {
                return {
                    ...(await api.invoke(getWtspp, "getContactById", param)),
                    img: (await api.invoke(getWtspp, "getProfilePicUrl", param)),
                }
            } else {
                api.invoke(getWtspp, "getContacts")
                    .then((data: any[]) => {
                        setContacts(formatContact(data))
                    })
                return null
            }
        } catch (error) {
            throw error
        }
    }

    const formatContact = (data: any[]) => {
        // isMyContact
        return data.filter((contact) => !!contact.isMyContact === true)
    }
    return <AppContext.Provider value={{
        get: {
            qr: imgBase68,
            readyConection,
            contacts
        },
        set: {
            getContacts
        }
    }}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = (type: string | undefined) => useContext(AppContext)[type || ""] || useContext(AppContext)