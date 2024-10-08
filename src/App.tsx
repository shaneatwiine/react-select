import { useState } from "react"
import { Select, SelectOption } from "./Select"
import { MultiSelect } from "./MultiSelect"
import NumberFormatter from "./NumberFormatter"

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
]

function App() {
  const [value1, setValue1] = useState<SelectOption[]>([options[0]])
  const [value2, setValue2] = useState<SelectOption | undefined>(options[0])

  return (
    <>
      <MultiSelect
        value={value1}
        options={options}
        onChange={o => setValue1(o)}
      />
      <br />
      <Select options={options} value={value2} onChange={o => setValue2(o)} />
      <NumberFormatter />
    </>
  )
}

export default App
