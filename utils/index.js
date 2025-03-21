export const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

export const isMobileSize = (screenSize) => {
    return screenSize?.width < process.env.NEXT_PUBLIC_DESKTOP_WIDTH
}

export const isDesktopSize = (screenSize) => {
    return screenSize?.width >= process.env.NEXT_PUBLIC_DESKTOP_WIDTH
}