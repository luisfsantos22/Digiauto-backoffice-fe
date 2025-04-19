'use client'

import { Table, Alert, ScrollArea } from '@mantine/core'
import { useRepairsWorkshop } from '@/app/hooks/workshop/useRepairsWorkshop'
import Spinner from '../../Spinner/Spinner'
import { useSession } from 'next-auth/react'
import Text from '../../Text/Text'
import {
  classNames,
  isDesktopSize,
  translateRepairStateValue,
  translateVehicleValue,
} from '@/utils'
import { useWindowSize } from '@/utils/hooks'
import { redirect } from 'next/navigation'
import { WORKSHOP_TABLE_DASHBOARD_LIST } from '@/app/constants'
import TableRow from '../../Table/TableRow'
import AddButton from '../../Button/AddButton'
import { useState } from 'react'
import { WorkshopObj } from '@/app/types/workshop/workshop'
import AreYouSureModal from '../../Modal/AreYouSureModal'
import { useDeleteRepair } from '@/app/hooks/workshop/useDeleteRepair'
import DeleteButton from '../../Button/DeleteButton'
import EditButton from '../../Button/EditButton'

export default function WorkshopDashboard() {
  const { data: session } = useSession()
  const screenSize = useWindowSize()
  const isDesktop = isDesktopSize(screenSize)
  const accessToken = session?.accessToken
  const [refreshKey, setRefreshKey] = useState(0)

  const { workshopItems, loading, error } = useRepairsWorkshop(
    accessToken,
    refreshKey
  )
  const { deleteRepair } = useDeleteRepair()

  const [areYouSureToDeleteOpen, setAreYouSureToDeleteOpen] =
    useState<boolean>(false)
  const [selectedRepair, setSelectedRepair] = useState<WorkshopObj | null>(null)

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

  //queries
  const handleDelete = async (uuid: string | undefined) => {
    if (!uuid) return
    await deleteRepair(uuid, accessToken)
    setAreYouSureToDeleteOpen(false)
    setSelectedRepair(null)
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="flex flex-col gap-4 w-full px-4 xl:px-0">
      <div className="flex justify-between items-center w-full">
        <Text
          text="Lista de Reparações"
          header="h2"
          styles={classNames(
            isDesktop
              ? 'text-digiblack3240-bold '
              : 'text-digiblack2025-semibold'
          )}
        />
        {workshopItems?.length > 0 && (
          <AddButton
            id="add-workshop-btn"
            onClick={() => {
              redirect('/dashboard/workshop/create')
            }}
            tooltipText={'Criar nova reparação'}
            size="xl:w-20 xl:h-20 h-10 w-10"
            width={'300'}
          />
        )}
      </div>

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
          <AddButton
            id="add-workshop-btn"
            onClick={() => {
              redirect('/dashboard/workshop/create')
            }}
            tooltipText={'Criar nova reparação'}
          />
        </div>
      ) : (
        <ScrollArea>
          <Table
            striped
            withTableBorder
            highlightOnHoverColor="bg-digigold-hover/10"
          >
            <Table.Thead className="bg-digigold">
              <Table.Tr>
                {WORKSHOP_TABLE_DASHBOARD_LIST.map((text) => (
                  <Table.Th
                    className="text-digibrown1624-bold"
                    key={text}
                  >
                    {text}
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {workshopItems.map((item) => (
                <Table.Tr
                  key={item.uuid}
                  onClick={() =>
                    redirect(`/dashboard/workshop/edit?uuid=${item.uuid}`)
                  }
                  className="hover:cursor-pointer hover:!bg-digigold-hover/20"
                >
                  <TableRow>
                    <Text
                      text={item.nOr}
                      styles="text-digibrown1624-normal"
                    />
                  </TableRow>
                  <TableRow>
                    <Text
                      text={translateVehicleValue(item.vehicle, false)}
                      styles="text-digibrown1624-normal"
                    />
                  </TableRow>
                  <TableRow>
                    <Text
                      text={item.createdAt}
                      styles="text-digibrown1624-normal"
                    />
                  </TableRow>
                  <TableRow>
                    <Text
                      text={translateRepairStateValue(item.state)}
                      styles="text-digibrown1624-normal"
                    />
                  </TableRow>
                  <TableRow>
                    <Text
                      text={item.hasRequestedMaterial ? 'Sim' : 'Não'}
                      styles="text-digibrown1624-normal"
                    />
                  </TableRow>
                  <TableRow customStyles="!hover:bg-white/0 z-10">
                    <div className="flex gap-4 justify-start items-center">
                      <EditButton
                        id={`edit-${item.uuid}`}
                        onClick={() => {
                          redirect(`/dashboard/workshop/edit?uuid=${item.uuid}`)
                        }}
                        tooltipText="Editar Reparação"
                        hasTooltip
                      />
                      <DeleteButton
                        id={`delete-${item.uuid}`}
                        onClick={() => {
                          setAreYouSureToDeleteOpen(true)
                          setSelectedRepair(item)
                        }}
                        tooltipText="Remover Reparação"
                        hasTooltip
                      />
                    </div>
                  </TableRow>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      )}
      {areYouSureToDeleteOpen && (
        <AreYouSureModal
          isOpen={areYouSureToDeleteOpen}
          title="Remover Reparação"
          message={`Tem a certeza que deseja remover a reparação selecionada (${selectedRepair?.nOr})?`}
          onConfirm={() => handleDelete(selectedRepair?.uuid)}
          onClose={() => {
            setAreYouSureToDeleteOpen(false)
            setSelectedRepair(null)
          }}
          primaryBtnText="Remover"
        />
      )}
    </div>
  )
}
