export const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

export const isMobileSize = (screenSize) => {
    return screenSize?.width < process.env.NEXT_PUBLIC_DESKTOP_WIDTH
}

export const isDesktopSize = (screenSize) => {
    return screenSize?.width >= process.env.NEXT_PUBLIC_DESKTOP_WIDTH
}

export const isHomePage = (router) => {
    return router?.pathname === '/'
}

export function useWindowSize() {
const [windowSize, setWindowSize] = useState({
    width: undefined,
    heigth: undefined
})
useEffect(() => {
    // eslint-disable-next-line space-before-function-paren
    function handleResize() {
    setWindowSize({
        width: window.innerWidth,
        heigth: window.innerHeight
    })
    }
    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
}, [])
return windowSize
}