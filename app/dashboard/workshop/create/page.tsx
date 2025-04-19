export const metadata = {
  title: 'Nova Reparação - Digiauto',
  description:
    'Crie uma nova reparação para o seu veículo, adicionando todos os detalhes necessários.',
  openGraph: {
    title: 'Nova Reparação - Digiauto',
    description:
      'Crie uma nova reparação para o seu veículo, adicionando todos os detalhes necessários.',
    type: 'website',
  },
}

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
      <WorkshopCreateForm action="create" />
    </GeneralLayout>
  )
}

export default WorkshopCreate
