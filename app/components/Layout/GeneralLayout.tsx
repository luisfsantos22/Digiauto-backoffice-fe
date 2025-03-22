import MainNavbar from "../Navbar/MainNavbar"

export default function GeneralLayout({ children }) {
  return (
    <div className="bg-digiblue/20 min-h-screen flex justify-center">
      <div className="w-full max-w-[90rem] min-h-screen">
        <MainNavbar />
        <main>{children}</main>
      </div>
    </div>
  )
}
