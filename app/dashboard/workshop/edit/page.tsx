export const metadata = {
  title: 'Editar Reparação - Digiauto',
  description:
    'Edite uma reparação existente para o seu veículo, atualizando todos os detalhes necessários.',
  openGraph: {
    title: 'Editar Reparação - Digiauto',
    description:
      'Edite uma reparação existente para o seu veículo, atualizando todos os detalhes necessários.',
    type: 'website',
  },
}

import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import GeneralLayout from '@/app/components/Layout/GeneralLayout'
import WorkshopCreateForm from '@/app/components/pages/dashboard/create/WorkshopCreateForm'
import { getServerSession } from 'next-auth/next'

const WorkshopEdit = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <GeneralLayout session={session}>
      <WorkshopCreateForm
        action="edit"
        session={session}
      />
    </GeneralLayout>
  )
}

export default WorkshopEdit
