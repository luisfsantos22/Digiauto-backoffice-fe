import { WorkshopFormData } from '@/app/types/workshop/workshop'
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import ContainerCard from '../Card/ContainerCard'
import Text from '../Text/Text'
import FormInput from '../Input/FormInput'
import Row from '../Row/Row'
import PrimaryButton from '../Button/PrimaryButton'
import { Divider } from '@mantine/core'
import { classNames, generateUuid } from '@/utils'
import Image from 'next/image'
import GenericTooltip from '../Tooltip/GenericTooltip'
import { SimpleUser } from '@/app/types/user/user'
import FormDropdown from '../Dropdown/FormDropdown'

type WorkforcesRepairFormScreenProps = {
  formData: WorkshopFormData
  register: UseFormRegister<WorkshopFormData>
  setValue: UseFormSetValue<WorkshopFormData>
  errors: FieldErrors<WorkshopFormData>
  setAreYouSureModalOpen: (open: boolean) => void
  setSelectedWorkforce: (
    workforce: WorkshopFormData['workforces'][number]
  ) => void
  workers: SimpleUser[]
}

const WorkforcesRepairFormScreen = (props: WorkforcesRepairFormScreenProps) => {
  const {
    formData,
    register,
    setValue,
    errors,
    setAreYouSureModalOpen,
    setSelectedWorkforce,
    workers,
  } = props
  const { workforces } = formData

  const hasWorkersOptions = workers?.map((worker) => ({
    label: worker.username,
    value: worker.uuid,
  }))

  console.log(hasWorkersOptions)
  return (
    <ContainerCard
      padding="xl:p-8 p-4"
      styles="flex flex-col gap-8 xl:gap-10 w-full rounded-xl max-h-[40rem] overflow-y-auto"
    >
      <Text
        text="Mão d'Obra da Reparação"
        styles="text-digiblack2025-semibold"
      />
      {workforces?.length > 0 && (
        <div className="flex flex-col gap-4 w-full">
          {workforces?.map((workforce, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 w-full"
            >
              <div
                key={index}
                className={classNames(
                  index % 2 === 0 ? 'bg-white' : 'bg-digigold/10',
                  'flex flex-col w-full p-4 gap-4 rounded-xl'
                )}
              >
                <div
                  className={classNames(
                    index % 2 === 0 ? 'bg-digigold-hover/10' : 'bg-white',
                    'flex justify-between gap-4 items-center w-full px-4 py-2 rounded-xl'
                  )}
                >
                  <Text
                    text={`Mão d'Obra ${index + 1}`}
                    header="h3"
                    id={`workforce-${index}-title`}
                    styles="text-digibrown1624-bold"
                  />
                  <div
                    className="flex flex-none h-6 w-6 items-start relative hover:cursor-pointer"
                    id={`workforce-${index}-delete`}
                    onClick={() => {
                      setSelectedWorkforce(workforce)
                      setAreYouSureModalOpen(true)
                    }}
                  >
                    <Image
                      src={'/icons/delete.svg'}
                      alt={'Logo Delete'}
                      style={{ objectFit: 'contain' }}
                      fill
                    />
                  </div>
                  <GenericTooltip
                    text="Remover Mão d'Obra"
                    anchorSelect={`workforce-${index}-delete`}
                    withArrow={false}
                  />
                </div>
                <Row>
                  <FormDropdown
                    choices={hasWorkersOptions || []}
                    placeholder="Escolha o mecânico"
                    selectedValue={workforces[index]?.workerUuid}
                    setSelectedValue={(value) =>
                      setValue(`workforces.${index}.workerUuid`, value, {
                        shouldValidate: true,
                      })
                    }
                    label="Mecânico Responsável"
                    labelStyles="text-digiblack1420-semibold flex gap-1"
                    error={
                      errors.workforces?.[index]?.workerUuid
                        ? 'Mecânico Responsável é obrigatório'
                        : undefined
                    }
                    mandatory
                    width="xl:w-1/2 w-full"
                    {...register(`workforces.${index}.workerUuid`, {
                      required: true,
                    })}
                  />
                  <FormInput
                    query={workforces[index]?.date || ''}
                    setQuery={(e) =>
                      setValue(`workforces.${index}.date`, e, {
                        shouldValidate: true,
                      })
                    }
                    error={
                      errors.workforces?.[index]?.date
                        ? 'Data de Criação da Reparação é obrigatória'
                        : undefined
                    }
                    placeholder="dd/mm/aaaa"
                    inputType="date"
                    mandatory={true}
                    label="Data da Mão d'Obra"
                    labelStyles="text-digiblack1420-semibold flex gap-1"
                    width="xl:w-1/2 w-full"
                    {...register(`workforces.${index}.date`, {
                      required: true,
                    })}
                  />
                </Row>
                <Row>
                  <FormInput
                    query={workforces[index]?.numHours || undefined}
                    setQuery={(e) =>
                      setValue(`workforces.${index}.numHours`, parseInt(e), {
                        shouldValidate: true,
                      })
                    }
                    error={
                      errors.workforces?.[index]?.numHours
                        ? 'Número de Horas é obrigatório'
                        : undefined
                    }
                    placeholder="Número de Horas"
                    inputType="number"
                    mandatory={true}
                    label="Número de Horas"
                    labelStyles="text-digiblack1420-semibold flex gap-1"
                    width="xl:w-1/2 w-full"
                    {...register(`workforces.${index}.numHours`, {
                      required: true,
                    })}
                  />
                  <FormInput
                    query={workforces[index]?.hourPrice || undefined}
                    setQuery={(e) =>
                      setValue(`workforces.${index}.hourPrice`, parseFloat(e), {
                        shouldValidate: true,
                      })
                    }
                    error={
                      errors.workforces?.[index]?.hourPrice
                        ? 'Preço à Hora é obrigatório'
                        : undefined
                    }
                    placeholder="Preço à Hora"
                    inputType="number"
                    mandatory={true}
                    label="Preço à Hora"
                    labelStyles="text-digiblack1420-semibold flex gap-1"
                    width="xl:w-1/2 w-full"
                    {...register(`workforces.${index}.hourPrice`, {
                      required: true,
                    })}
                  />
                </Row>
              </div>
              <Divider
                size={'xl'}
                c={'text-digibrown'}
              />
            </div>
          ))}
        </div>
      )}
      <Row>
        <PrimaryButton
          id="add-workforce"
          text="Adicionar Mão d'Obra"
          size="large"
          fullWidth
          onClick={() => {
            setValue('workforces', [
              ...formData.workforces,
              {
                date: '',
                hourPrice: undefined,
                numHours: undefined,
                workerUuid: '',
                uuid: generateUuid(),
                repairUuid: undefined,
              },
            ])
          }}
          type="button"
        />
      </Row>
    </ContainerCard>
  )
}

export default WorkforcesRepairFormScreen
