import { classNames } from '@/utils'
import Text from '../Text/Text'
import Spinner from '../Spinner/Spinner'
import useOutsideClick from '@/app/hooks/utils/useOutsideClick'
import { useEffect, useState } from 'react'

type SearchInputProps = {
  query: string
  setQuery: (e: string) => void
  placeholder: string
  disabled?: boolean
  inputType?: 'text'
  mandatory?: boolean
  data: any[]
  error?: string
  width?: string
  dataIsLoading?: boolean
  label: string
  labelStyles?: string
  value?: string
  setValue?: (value: string) => void
  displayType?: string
}

const SearchInput = (props: SearchInputProps) => {
  const {
    query,
    setQuery,
    placeholder,
    disabled = false,
    inputType = 'text',
    mandatory = false,
    data,
    dataIsLoading = false,
    error = undefined,
    width = 'w-full',
    label,
    labelStyles = 'text-digiblack1624-semibold',
    value,
    setValue,
    displayType = '',
  } = props

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const dropdownRef = useOutsideClick(() => setIsDropdownOpen(false))

  const translateValue = (value: string) => {
    const selectedItem = data.find((item) => item.uuid === value)
    if (selectedItem) {
      if (displayType === 'vehicle') {
        return `${selectedItem.brand} ${selectedItem.model} | ${selectedItem.licensePlate}`
      }
    }
    return ''
  }

  return (
    <div
      className={classNames(
        width,
        'flex flex-col items-start justify-start gap-2'
      )}
    >
      <Text
        text={label}
        styles={error ? 'text-digired1624-semibold' : labelStyles}
        required={mandatory}
      />
      <div className="flex flex-col items-start justify-start gap-2 w-full relative">
        <div className="relative w-full">
          <input
            type={inputType}
            disabled={disabled}
            required={mandatory}
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIsDropdownOpen(true)
            }}
            className={classNames(
              error
                ? 'border-b-digired'
                : value
                  ? 'border-b-digibrown'
                  : 'border-b-gray-300',
              'border-b text-digibrown1624-semibold p-2 relative w-full focus:outline-none focus:border-b-digibrown focus:ring-0 '
            )}
          />
          {value && (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setValue?.('')
                setIsDropdownOpen(false)
              }}
              className="absolute hover:cursor-pointer right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          )}
        </div>
        <div
          className="w-full"
          ref={dropdownRef}
        >
          <div
            className={classNames(
              'absolute bg-white border border-gray-300 rounded-xl shadow-lg w-full',
              isDropdownOpen && query?.length > 0
                ? 'max-h-80 overflow-y-auto'
                : 'hidden'
            )}
            id="dropdown"
          >
            {dataIsLoading ? (
              <div className="flex justify-center items-center p-4 h-full ">
                <Spinner
                  height={64}
                  width={64}
                />
              </div>
            ) : data?.length === 0 && query?.length > 0 ? (
              <Text
                text="Nenhum veículo encontrado."
                styles="text-gray-500 px-4 py-2"
              />
            ) : (
              data.map((obj, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setValue?.(obj.uuid)
                    setQuery(translateValue(obj.uuid))
                    setIsDropdownOpen(false)
                  }}
                >
                  {translateValue(obj.uuid)}
                </div>
              ))
            )}
          </div>
          {/* Error message */}
          {error && (
            <Text
              text={error}
              styles="text-red-500"
              id="error-message"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchInput
