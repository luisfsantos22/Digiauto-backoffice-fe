// component to show the progress of a task
import React, { Fragment } from 'react'
import Text from '../Text/Text'
import { classNames } from '@/utils'
import { on } from 'events'

type ProgressBarWithNamesProps = {
  currentStep: number
  totalSteps: string[]
  onClick?: (step: number) => void
}

const ProgressBarWithNames = (props: ProgressBarWithNamesProps) => {
  const { currentStep, totalSteps, onClick } = props

  const stepsCount = totalSteps.length

  return (
    <div className="flex items-center self-center gap-1 w-full xl:w-2/4 gap">
      {totalSteps.map((name, index) => {
        return (
          <Fragment key={index}>
            <div
              key={index}
              onClick={() => {
                if (onClick) {
                  onClick(index + 1)
                }
              }}
              className={classNames(
                index == currentStep - 1 ? 'bg-digigold' : 'bg-gray-200',
                onClick && 'hover:cursor-pointer',
                'h-8 w-auto px-4  rounded-2xl flex items-center justify-center'
              )}
            >
              <Text
                text={name}
                styles="text-digibrown1212-bold"
              />
            </div>
            {index < stepsCount - 1 && (
              <div className={`h-1 flex-1 rounded-xl bg-gray-200`}></div>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

export default ProgressBarWithNames
