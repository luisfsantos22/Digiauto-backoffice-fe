import { WorkshopFormData } from '@/app/types/workshop/workshop'
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import ContainerCard from '../Card/ContainerCard'
import Text from '../Text/Text'
import FormInput from '../Input/FormInput'
import Row from '../Row/Row'
import PrimaryButton from '../Button/PrimaryButton'
import { Divider } from '@mantine/core'
import { classNames } from '@/utils'
import { WorkshopMaterialObj } from '@/app/types/workshop/workshop-materials'

type MaterialsRepairFormScreenProps = {
  formData: WorkshopFormData
  register: UseFormRegister<WorkshopFormData>
  setValue: UseFormSetValue<WorkshopFormData>
  errors: FieldErrors<WorkshopFormData>
  materialsCreated: WorkshopMaterialObj[]
  setMaterialsCreated: React.Dispatch<
    React.SetStateAction<WorkshopMaterialObj[]>
  >
}

const MaterialsRepairFormScreen = (props: MaterialsRepairFormScreenProps) => {
  const {
    formData,
    register,
    setValue,
    errors,
    materialsCreated,
    setMaterialsCreated,
  } = props
  const { materials } = formData

  return (
    <ContainerCard
      padding="xl:p-8 p-4"
      styles="flex flex-col gap-8 xl:gap-10 w-full rounded-xl max-h-[40rem] overflow-y-auto"
    >
      <Text
        text="Materiais Ordenados para a Reparação"
        styles="text-digiblack2025-semibold"
      />
      {materialsCreated.length > 0 && (
        <div className="flex flex-col gap-4 w-full">
          {materialsCreated.map((material, index) => (
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
                <Row>
                  <FormInput
                    label="Material"
                    placeholder="Material"
                    value={material.name}
                    disabled
                    width="xl:w-1/3 w-full"
                  />
                  <FormInput
                    label="Data"
                    placeholder="Data"
                    inputType="date"
                    value={material.date}
                    disabled
                    width="xl:w-1/3 w-full"
                  />
                  <FormInput
                    label="Descrição"
                    placeholder="Descrição"
                    value={material.description}
                    disabled
                    width="xl:w-1/3 w-full"
                  />
                </Row>
                <Row>
                  <FormInput
                    label="Nº de Fatura"
                    placeholder="Nº de Fatura"
                    value={material.numInvoice}
                    disabled
                    width="xl:w-1/3 w-full"
                  />
                  <FormInput
                    label="Preço de Compra"
                    placeholder="Preço de Compra"
                    inputType="number"
                    value={material.buyPrice}
                    disabled
                    width="xl:w-1/3 w-full"
                  />
                  <FormInput
                    label="Preço de Venda"
                    placeholder="Preço de Venda"
                    inputType="number"
                    value={material.salePrice}
                    disabled
                    width="xl:w-1/3 w-full"
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
          id="add-material"
          text="Adicionar Novo Material"
          size="large"
          fullWidth
          onClick={() => {
            setMaterialsCreated((prev) => [
              ...prev,
              {
                name: '',
                quantity: 0,
                id: undefined,
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

export default MaterialsRepairFormScreen
