import { Label, Select } from 'flowbite-react'
import { useState } from 'react'

const sampleOptions = ['Canada', 'France', 'Germany']

const SelectContact = () => {
  const [options] = useState(sampleOptions)

  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="countries" value="Select your country" />
      </div>
      <Select id="countries" required>
        {options.map((o) => (
          <option value={o}>{o}</option>
        ))}
      </Select>
    </div>
  )
}

export default SelectContact
