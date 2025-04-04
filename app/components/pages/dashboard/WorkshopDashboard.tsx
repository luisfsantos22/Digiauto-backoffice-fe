'use client'

import { Table, Alert } from '@mantine/core'
import { useRepairsWorkshop } from '@/app/hooks/workshop/useRepairsWorkshop'
import Spinner from '../../Spinner/Spinner'
import { useSession } from 'next-auth/react'
import Text from '../../Text/Text'
import { classNames, isDesktopSize } from '@/utils'
import { useWindowSize } from '@/utils/hooks'
import Image from 'next/image'
import GenericTooltip from '../../Tooltip/GenericTooltip'
import { redirect } from 'next/navigation'

export default function WorkshopDashboard() {
  const { data: session } = useSession()
  const screenSize = useWindowSize()
  const isDesktop = isDesktopSize(screenSize)
  const accessToken = session?.accessToken
  const { workshopItems, loading, error } = useRepairsWorkshop(accessToken)

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4 h-full ">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert
          color="red"
          title="Error"
        >
          {error}
        </Alert>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 w-full px-4 xl:px-0">
      <Text
        text="Lista de Reparações"
        header="h2"
        styles={classNames(
          isDesktop ? 'text-digiblack3240-bold ' : 'text-digiblack2025-semibold'
        )}
      />

      {workshopItems?.length === 0 ? (
        <div className="flex flex-col gap-4 justify-center items-center p-4 h-full">
          <Text
            text="Nenhuma reparação encontrada.
            Crie uma nova reparação para começar."
            styles={classNames(
              isDesktop
                ? 'text-digired2025-semibold'
                : 'text-digired1624-semibold'
            )}
          />
          <div
            id="add-workshop-btn"
            className="flex flex-none hover:cursor-pointer xl:h-32 xl:w-32 items-center justify-center relative"
            onClick={() => {
              redirect('/dashboard/workshop/create')
            }}
          >
            <Image
              src={'/icons/add_circle.svg'}
              alt={'Add workshop Image'}
              style={{ objectFit: 'contain' }}
              fill
            />
            <GenericTooltip
              text={'Criar nova reparação'}
              anchorSelect={'add-workshop-btn'}
              position="bottom"
              withArrow={false}
            />
          </div>
        </div>
      ) : (
        <Table
          striped
          highlightOnHover
          withTableBorder
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Brand</Table.Th>
              <Table.Th>Model</Table.Th>
              <Table.Th>Year</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {workshopItems.map((item) => (
              <Table.Tr key={item.uuid}>
                <Table.Td>{item.vehicle.version}</Table.Td>
                <Table.Td>{item.vehicle.brand}</Table.Td>
                <Table.Td>{item.vehicle.model}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </div>
  )
}
