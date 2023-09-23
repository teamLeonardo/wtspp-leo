export const numberCompare = (number1: number, number2: number): boolean => (number1 === number2);
export const scrollUp = () => {
    const page = document.getElementById("container-pages")
    page?.scrollTo({ top: 0, behavior: 'smooth' });
}