import { useEffect, useRef, useState } from "react"
import  "./select.css"

export type SelectOption = {
  label: string
  value: string | number
}

type MultiSelectProps = {
  value: SelectOption[]
  onChange: (value: SelectOption[]) => void
  options: SelectOption[]
  isCommaSeparated?:boolean 
}

export function MultiSelect({ value, onChange, options,isCommaSeparated=false }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  function clearOptions() {
    onChange([])
  }

  function selectOption(option: SelectOption) {
    if (value.includes(option)) {
      onChange(value.filter(o => o !== option))
    } else {
      onChange([...value, option])
    }
  }

  function isOptionSelected(option: SelectOption) {
    return value.includes(option)
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0)
  }, [isOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target != containerRef.current) return
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen(prev => !prev)
          if (isOpen) selectOption(options[highlightedIndex])
          break
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true)
            break
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue)
          }
          break
        }
        case "Escape":
          setIsOpen(false)
          break
      }
    }
    containerRef.current?.addEventListener("keydown", handler)

    return () => {
      containerRef.current?.removeEventListener("keydown", handler)
    }
  }, [isOpen, highlightedIndex, options])

  return (
    <div

      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen(prev => !prev)}
      tabIndex={0}
      className="multi-container"
    >
       <span className="multi-value">
        {isCommaSeparated ? (
          value.map(v => v.label).join(', ')
        ) : (
          value.map(v => (
            <button
              key={v.value}
              onClick={e => {
                e.stopPropagation()
                selectOption(v)
              }}
              className="multi-option-badge"
            >
              {v.label}
              <span className="remove-btn">&times;</span>
            </button>
          ))
        )}
      </span>
      <button
        onClick={e => {
          e.stopPropagation()
          clearOptions()
        }}
        className="multi-clear-btn"
      >
        &times;
      </button>
      <div className="multi-divider"></div>
      <div className="multi-caret"></div>
      <ul className={`multi-options ${isOpen ? "show" : ""}`}>

        {options.map((option, index) => (
          <li
            onClick={e => {
              e.stopPropagation()
              selectOption(option)
              setIsOpen(false)

            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            key={option.value}
            className={`multi-option ${
              isOptionSelected(option) ? "selected" : ""
            } ${index === highlightedIndex ? "highlighted" : ""}`}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
}