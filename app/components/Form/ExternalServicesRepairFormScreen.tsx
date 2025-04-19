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

type ExternalServicesRepairFormScreenProps = {
  formData: WorkshopFormData
  register: UseFormRegister<WorkshopFormData>
  setValue: UseFormSetValue<WorkshopFormData>
  errors: FieldErrors<WorkshopFormData>
  setAreYouSureModalOpen: (open: boolean) => void
  setSelectedExternalService: (
    material: WorkshopFormData['externalServices'][number]
  ) => void
}

const ExternalServicesRepairFormScreen = (
  props: ExternalServicesRepairFormScreenProps
) => {
  const {
    formData,
    register,
    setValue,
    errors,
    setAreYouSureModalOpen,
    setSelectedExternalService,
  } = props
  const { externalServices } = formData

  return (
    <ContainerCard
      padding="xl:p-8 p-4"
      styles="flex flex-col gap-8 xl:gap-10 w-full rounded-xl max-h-[40rem] overflow-y-auto"
    >
      <Text
        text="Materiais Ordenados para a Reparação"
        styles="text-digiblack2025-semibold"
      />
      {externalServices?.length > 0 && (
        <div className="flex flex-col gap-4 w-full">
          {externalServices?.map((externalService, index) => (
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
                    text={`Material Externo ${index + 1}`}
                    header="h3"
                    id={`external-service-${index}-title`}
                    styles="text-digibrown1624-bold"
                  />
                  <div
                    className="flex flex-none h-6 w-6 items-start relative hover:cursor-pointer"
                    id={`external-service-${index}-delete`}
                    onClick={() => {
                      setSelectedExternalService(externalService)
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
                    text="Remover Serviço Externo"
                    anchorSelect={`external-service-${index}-delete`}
                    withArrow={false}
                  />
                </div>
                <Row>
                  <FormInput
                    label="Nº de Fatura"
                    labelStyles="text-digiblack1420-semibold flex gap-1"
                    placeholder="Nº de Fatura"
                    mandatory
                    query={externalService.numInvoice || undefined}
                    setQuery={(value) => {
                      setValue(`externalServices.${index}.numInvoice`, value, {
                        shouldValidate: true,
                      })
                    }}
                    error={
                      errors.externalServices?.[index]?.numInvoice
                        ? 'Campo obrigatório'
                        : undefined
                    }
                    {...register(`externalServices.${index}.numInvoice`, {
                      required: true,
                    })}
                    inputType="text"
                    width="xl:w-1/2 w-full"
                  />
                  <FormInput
                    label="Data"
                    labelStyles="text-digiblack1420-semibold flex gap-1"
                    mandatory
                    placeholder="Data"
                    inputType="date"
                    query={externalService.date || ''}
                    setQuery={(value) => {
                      setValue(`externalServices.${index}.date`, value, {
                        shouldValidate: true,
                      })
                    }}
                    error={
                      errors.externalServices?.[index]?.date
                        ? 'Campo obrigatório'
                        : undefined
                    }
                    {...register(`externalServices.${index}.date`, {
                      required: true,
                    })}
                    width="xl:w-1/2 w-full"
                  />
                </Row>
                <Row>
                  <FormInput
                    label="Preço de Compra"
                    labelStyles="text-digiblack1420-semibold flex gap-1"
                    placeholder="Preço de Compra"
                    mandatory
                    inputType="number"
                    query={externalService.buyPrice || undefined}
                    setQuery={(value) => {
                      setValue(
                        `externalServices.${index}.buyPrice`,
                        parseFloat(value),
                        {
                          shouldValidate: true,
                        }
                      )
                    }}
                    error={
                      errors.externalServices?.[index]?.buyPrice
                        ? 'Campo obrigatório'
                        : undefined
                    }
                    {...register(`externalServices.${index}.buyPrice`, {
                      required: true,
                    })}
                    width="xl:w-1/3 w-full"
                  />
                  <FormInput
                    label="Preço de Venda"
                    labelStyles="text-digiblack1420-semibold flex gap-1"
                    placeholder="Preço de Venda"
                    mandatory
                    inputType="number"
                    query={externalService.salePrice || undefined}
                    setQuery={(value) => {
                      setValue(
                        `externalServices.${index}.salePrice`,
                        parseFloat(value),
                        {
                          shouldValidate: true,
                        }
                      )
                    }}
                    error={
                      errors.externalServices?.[index]?.salePrice
                        ? 'Campo obrigatório'
                        : undefined
                    }
                    {...register(`externalServices.${index}.salePrice`, {
                      required: true,
                    })}
                    width="xl:w-1/3 w-full"
                  />
                  <FormInput
                    label="IVA"
                    labelStyles="text-digiblack1420-semibold flex gap-1"
                    placeholder="IVA"
                    mandatory
                    inputType="number"
                    query={externalService.iva || undefined}
                    setQuery={(value) => {
                      setValue(
                        `externalServices.${index}.iva`,
                        parseInt(value),
                        {
                          shouldValidate: true,
                        }
                      )
                    }}
                    error={
                      errors.externalServices?.[index]?.iva
                        ? 'Campo obrigatório'
                        : undefined
                    }
                    {...register(`externalServices.${index}.iva`, {
                      required: true,
                    })}
                    width="xl:w-1/3 w-full"
                  />
                </Row>
                <Row>
                  <FormInput
                    label="Descrição"
                    labelStyles="text-digiblack1420-semibold"
                    placeholder="Descrição"
                    query={externalService.description || ''}
                    setQuery={(value) => {
                      setValue(`externalServices.${index}.description`, value, {
                        shouldValidate: true,
                      })
                    }}
                    {...register(`externalServices.${index}.description`, {
                      required: false,
                    })}
                    width="w-full"
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
          id="add-external-service"
          text="Adicionar Novo Serviço Externo"
          size="large"
          fullWidth
          onClick={() => {
            setValue('externalServices', [
              ...formData.externalServices,
              {
                uuid: generateUuid(),
                repairUuid: undefined,
                description: '',
                date: '',
                numInvoice: '',
                buyPrice: undefined,
                salePrice: undefined,
                iva: undefined,
              },
            ])
          }}
          type="button"
        />
      </Row>
    </ContainerCard>
  )
}

export default ExternalServicesRepairFormScreen
