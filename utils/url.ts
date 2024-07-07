
export const getIdurl = (url: string) => {
    return url.split("/")[url.split("/").length - 2]
}
