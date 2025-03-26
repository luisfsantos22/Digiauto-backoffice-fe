import GeneralLayout from "../components/Layout/GeneralLayout"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

const Dashboard = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <GeneralLayout session={session}>
      <div> ss</div>
    </GeneralLayout>
  )
}

export default Dashboard
