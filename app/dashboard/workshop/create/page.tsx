import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import GeneralLayout from '@/app/components/Layout/GeneralLayout'
import WorkshopCreateForm from '@/app/components/pages/dashboard/create/WorkshopCreateForm'
import { getServerSession } from 'next-auth/next'

const WorkshopCreate = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <GeneralLayout session={session}>
      <WorkshopCreateForm session={session} />
    </GeneralLayout>
  )
}

export default WorkshopCreate
