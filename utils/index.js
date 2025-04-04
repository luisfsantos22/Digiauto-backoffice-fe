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

export function translateRole(role) {
  switch (role) {
    case 'ADMIN':
      return 'Administrador'
    case 'WORKSHOP':
      return 'Mecânico'
    default:
      return 'Utilizador'
  }
}

export function requiredSpan() {
  return <span className="text-red-800">*</span>
}
