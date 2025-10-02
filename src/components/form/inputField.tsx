import type { ChangeEvent } from 'react'

interface InputFieldProps {
  id: string
  type?: string
  value: string
  label: string
  placeholder: string
  required?: boolean
  textarea?: boolean
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void
  onChangeTextArea?: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const InputField = ({
  id,
  type = 'text',
  value,
  label,
  placeholder,
  required = true,
  textarea = false,
  onChangeInput,
  onChangeTextArea
}: InputFieldProps) => {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      {textarea ? (
        <textarea
          className="form-control"
          id={id}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={onChangeTextArea}
        />
      ) : (
        <input
          className="form-control"
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={onChangeInput}
        />
      )}
    </div>
  )
}

export default InputField
