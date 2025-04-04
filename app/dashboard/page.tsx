import GeneralLayout from '../components/Layout/GeneralLayout'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import DashboardContent from '../components/pages/dashboard/DashboardContent'

const Dashboard = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <GeneralLayout session={session}>
      <DashboardContent />
    </GeneralLayout>
  )
}

export default Dashboard
