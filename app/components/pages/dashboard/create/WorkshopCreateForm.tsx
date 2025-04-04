'use client'

import PrimaryButton from '@/app/components/Button/PrimaryButton'
import MainRepairFormScreen from '@/app/components/Form/MainRepairFormScreen'
import MaterialsRepairFormScreen from '@/app/components/Form/MainRepairFormScreen copy'
import ProgressBarWithNames from '@/app/components/ProgressBar/ProgressBar'
import Text from '@/app/components/Text/Text'
import { NEW_REPAIR_STEPS } from '@/app/constants'
import { WorkshopFormData } from '@/app/types/workshop/workshop'
import { checkIfEveryObjectHasAValue } from '@/utils/check'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function WorkshopCreateForm(props: { session: any }) {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<WorkshopFormData>({
    defaultValues: {
      vehicle: '',
      nOr: '',
      appointmentDate: '',
      status: undefined,
      hasRequestedMaterial: false,
      services: [],
      materials: [],
      externalServices: [],
      workforces: [],
      client: {
        id: '',
        name: '',
      },
      createdAt: new Date().toISOString().split('T')[0],
    },
  })

  const [canSubmit, setCanSubmit] = useState(false)

  const [currentStep, setCurrentStep] = useState<number>(1)

  const formData = watch()

  const formSubmit = (data) => {
    // Handle form submission logic here
    console.log('Form submitted:', data)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentStep])

  useEffect(() => {
    // Check if all required fields are filled (all fields in this case)
    const isAllFieldsFilled = Object.values(formData).every(
      (value) => value !== ''
    )
    const isStatusValid = formData.status !== undefined
    const isClientValid =
      formData.client.id !== '' && formData.client.name !== ''
    const isVehicleValid = formData.vehicle !== ''
    const isNOrValid = formData.nOr !== ''

    if (
      isAllFieldsFilled &&
      isStatusValid &&
      isClientValid &&
      isVehicleValid &&
      isNOrValid
    ) {
      setCanSubmit(true)
    } else {
      setCanSubmit(false)
    }
  }, [formData])

  // Memoized functions
  const pageOneFields = useMemo(() => {
    return {
      vehicle: formData?.vehicle,
      nOr: formData?.nOr,
      appointmentDate: formData?.appointmentDate,
      createdAt: formData?.createdAt,
      status: formData?.status,
      hasRequestedMaterial: formData?.hasRequestedMaterial,
      client: formData?.client,
    }
  }, [
    formData?.vehicle,
    formData?.nOr,
    formData?.appointmentDate,
    formData?.createdAt,
    formData?.status,
    formData?.hasRequestedMaterial,
    formData?.client,
  ])

  const readyToGoToSecondStep = useMemo(() => {
    const pageFields = pageOneFields
    return checkIfEveryObjectHasAValue(pageFields)
  }, [
    pageOneFields,
    formData?.vehicle,
    formData?.nOr,
    formData?.appointmentDate,
    formData?.createdAt,
    formData?.status,
    formData?.hasRequestedMaterial,
    formData?.client,
  ])

  return (
    <div className="flex flex-col xl:items-start xl:justify-start items-center justify-center px-4 xl:px-0 xl:gap-8 gap-4 w-full">
      {/* Title */}
      <Text
        header="h1"
        text="Nova Reparação"
        styles="text-digiblack3240-bold"
      />

      <ProgressBarWithNames
        currentStep={currentStep}
        totalSteps={NEW_REPAIR_STEPS}
        onClick={setCurrentStep}
      />

      <form
        onSubmit={handleSubmit(formSubmit)}
        className="w-full flex flex-col gap-4"
      >
        {
          {
            1: (
              <MainRepairFormScreen
                formData={formData}
                register={register}
                setValue={setValue}
                errors={errors}
              />
            ),
            2: (
              <MaterialsRepairFormScreen
                formData={formData}
                register={register}
                setValue={setValue}
                errors={errors}
              />
            ),
          }[currentStep]
        }
        <div className="flex xl:flex-row gap-4 xl:gap-8 w-full items-center justify-center xl:justify-end">
          {currentStep > 1 && (
            <div
              className="flex items-center justify-center py-3 px-3 bg-digigold rounded-2xl hover:cursor-pointer"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              <div className="flex flex-none h-6 w-6 items-start relative">
                <Image
                  src={'/icons/arrow-left.svg'}
                  alt={'Logo Arrow Left'}
                  style={{ objectFit: 'contain' }}
                  fill
                />
              </div>
            </div>
          )}
          <PrimaryButton
            text="Criar Reparação"
            type="submit"
            size="large"
            disabled={!canSubmit}
            id="create-repair"
            textDisabled="Preencha todos os campos obrigatórios"
          />
          {currentStep < NEW_REPAIR_STEPS.length && (
            <div
              className="flex items-center justify-center py-3 px-3 bg-digigold rounded-2xl hover:cursor-pointer"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              <div className="flex flex-none h-6 w-6 items-start relative">
                <Image
                  src={'/icons/arrow-right.svg'}
                  alt={'Logo Arrow Right'}
                  style={{ objectFit: 'contain' }}
                  fill
                />
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

{
  /* <div className="form-container">
<label className="label">Vehicle</label>
<SearchInput
  placeholder="Search for a vehicle..."
  data={vehicles}
  query={queryVehicle}
  setQuery={setQueryVehicle}
  disabled={false}
  inputType="text"
  mandatory={true}
  {...register("vehicle", { required: true })}
  error={
    errors.vehicle ? "Escolha do veículo é obrigatória" : undefined
  }
/>
</div> */
}
