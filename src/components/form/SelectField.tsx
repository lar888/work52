import type { ChangeEvent } from 'react'
import type { SelectOptionInterface } from '../../types/Common'

interface SelectFieldProps {
  id: string
  value: string
  label: string
  required?: boolean
  options: SelectOptionInterface[]
  onChangeSelect?: (e: ChangeEvent<HTMLSelectElement>) => void
}

const SelectField = ({
  id,
  value,
  label,
  required = true,
  options,
  onChangeSelect
}: SelectFieldProps) => {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <select
        className="form-control"
        id={id}
        value={value}
        onChange={onChangeSelect}
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectField
