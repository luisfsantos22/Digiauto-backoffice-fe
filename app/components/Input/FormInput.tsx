import { classNames } from '@/utils'
import Text from '../Text/Text'

type FormInputProps = {
  query: string
  setQuery: (e: string) => void
  placeholder: string
  error?: string | null
  inputType?: 'text' | 'email' | 'password' | 'date' | 'number'
  mandatory?: boolean
  label: string
  labelStyles?: string
  width?: string
}

const FormInput = (props: FormInputProps) => {
  const {
    query,
    setQuery,
    placeholder,
    error,
    inputType = 'text',
    mandatory = false,
    label,
    labelStyles = 'text-digiblack1624-semibold',
    width = 'w-full',
  } = props

  return (
    <div
      className={classNames(
        width,
        'flex flex-col items-start justify-start gap-2 w-full'
      )}
    >
      <Text
        text={label}
        styles={error ? 'text-digired1624-semibold' : labelStyles}
        required={mandatory}
      />
      <div className="flex flex-col gap-0.5 w-full">
        <input
          type={inputType}
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required={mandatory}
          className={classNames(
            error
              ? 'border-b-digired'
              : query
                ? 'border-b-digibrown'
                : 'border-b-gray-300',
            'border-b p-2 text-digibrown1624-semibold  w-full focus:outline-none focus:border-b-digibrown focus:ring-0'
          )}
        />
        {error && (
          <Text
            text={error}
            styles="text-digired1212-normal"
          />
        )}
      </div>
    </div>
  )
}

export default FormInput
