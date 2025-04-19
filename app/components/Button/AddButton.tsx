import { classNames } from '@/utils'
import GenericTooltip from '../Tooltip/GenericTooltip'
import Image from 'next/image'

type AddButtonButtonProps = {
  onClick: () => void
  id: string
  tooltipText?: string
  size?: string
  width?: string
}

const AddButton = (props: AddButtonButtonProps) => {
  const {
    onClick,
    id,
    tooltipText = '',
    size = 'xl:h-32 xl:w-32 w-10 h-10',
    width = 'auto',
  } = props

  return (
    <div
      id={id}
      className={classNames(
        size,
        'flex flex-none hover:cursor-pointer items-center justify-center relative z-50'
      )}
      onClick={onClick}
    >
      <Image
        src={'/icons/add_circle.svg'}
        alt={'Add circle Image'}
        style={{ objectFit: 'contain' }}
        fill
      />
      <GenericTooltip
        text={tooltipText}
        anchorSelect={id}
        position="bottom"
        withArrow={false}
        width={width}
      />
    </div>
  )
}

export default AddButton
