export const numberCompare = (number1: number, number2: number): boolean => (number1 === number2);

export const scrollUp = () => {
    const page = document.getElementById("container-pages")
    page?.scrollTo({ top: 0, behavior: 'smooth' });
}
export const scrollDown = (elemtDom) => {
    elemtDom?.scrollTo({ top: elemtDom.scrollHeight, behavior: "smooth" })
}
export const uid = () => (Date.now().toString(36) + Math.random().toString(36).substr(2));

export const STATE_SEND = {
    idle: "idle",
    warning: "warning",
    error: "error",
    success: "success"
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// mejorar
export const mergeArray = (a: any[], b: any[], clave) => {
    const seen = new Set();
    return [...a, ...b].filter((item) => {
        const valor = item[clave];
        if (!seen.has(valor)) {
            seen.add(valor);
            return true;
        }
        return false;
    });
}