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
import FormDropdown from '../Dropdown/FormDropdown'
import { REPAIR_SERVICE_TYPES } from '@/app/constants'

type ServicesRepairFormScreenProps = {
  formData: WorkshopFormData
  register: UseFormRegister<WorkshopFormData>
  setValue: UseFormSetValue<WorkshopFormData>
  errors: FieldErrors<WorkshopFormData>
  setAreYouSureModalOpen: (open: boolean) => void
  setSelectedService: (service: WorkshopFormData['services'][number]) => void
}

const ServicesRepairFormScreen = (props: ServicesRepairFormScreenProps) => {
  const {
    formData,
    register,
    setValue,
    errors,
    setAreYouSureModalOpen,
    setSelectedService,
  } = props
  const { services } = formData

  return (
    <ContainerCard
      padding="xl:p-8 p-4"
      styles="flex flex-col gap-8 xl:gap-10 w-full rounded-xl max-h-[40rem] overflow-y-auto"
    >
      <Text
        text="Serviços Ordenados para a Reparação"
        styles="text-digiblack2025-semibold"
      />
      {services?.length > 0 && (
        <div className="flex flex-col gap-4 w-full">
          {services?.map((service, index) => (
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
                    text={`Serviço ${index + 1}`}
                    header="h3"
                    id={`service-${index}-title`}
                    styles="text-digibrown1624-bold"
                  />
                  <div
                    className="flex flex-none h-6 w-6 items-start relative hover:cursor-pointer"
                    id={`service-${index}-delete`}
                    onClick={() => {
                      setSelectedService(service)
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
                    text="Remover Serviço"
                    anchorSelect={`service-${index}-delete`}
                    withArrow={false}
                  />
                </div>
                <Row>
                  <FormDropdown
                    choices={REPAIR_SERVICE_TYPES || []}
                    placeholder="Tipo de Serviço"
                    selectedValue={service.typeService}
                    setSelectedValue={(value) => {
                      setValue(`services.${index}.typeService`, value, {
                        shouldValidate: true,
                      })
                    }}
                    label="Tipo de Serviço"
                    labelStyles="text-digiblack1420-semibold flex gap-1"
                    error={
                      errors.services?.[index]?.type
                        ? 'Tipo de Serviço é obrigatório'
                        : undefined
                    }
                    mandatory
                    width="xl:w-1/6 w-full"
                    {...register(`services.${index}.typeService`, {
                      required: true,
                    })}
                  />
                  <FormInput
                    query={services[index]?.date || ''}
                    setQuery={(e) =>
                      setValue(`services.${index}.date`, e, {
                        shouldValidate: true,
                      })
                    }
                    error={
                      errors.services?.[index]?.date
                        ? 'Data é obrigatória'
                        : undefined
                    }
                    placeholder="dd/mm/aaaa"
                    inputType="date"
                    mandatory={true}
                    label="Data do Serviço"
                    labelStyles="text-digiblack1420-semibold flex gap-1"
                    width="xl:w-1/6 w-full"
                    {...register(`services.${index}.date`, {
                      required: true,
                    })}
                  />
                  <FormInput
                    label="Descrição"
                    labelStyles="text-digiblack1420-semibold"
                    placeholder="Descrição"
                    query={service.description || ''}
                    setQuery={(value) => {
                      setValue(`services.${index}.description`, value, {
                        shouldValidate: true,
                      })
                    }}
                    {...register(`services.${index}.description`, {
                      required: false,
                    })}
                    width="xl:w-4/6 w-full"
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
          id="add-service"
          text="Adicionar Novo Serviço"
          size="large"
          fullWidth
          onClick={() => {
            setValue('services', [
              ...formData.services,
              {
                date: '',
                description: '',
                uuid: generateUuid(),
                repairUuid: undefined,
                typeService: '',
              },
            ])
          }}
          type="button"
        />
      </Row>
    </ContainerCard>
  )
}

export default ServicesRepairFormScreen
