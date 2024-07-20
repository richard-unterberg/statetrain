import { ReactNode } from 'react'
import tw from 'tailwind-styled-components'

interface StyledToggleButtonProps {
  $pos: 'left' | 'right'
}

const StyledToggleButton = tw.button<StyledToggleButtonProps>`
  bg-dark
  border-1
  border-darkLightBorder
  px-2
  flex
  text-center
  items-center
  w-10
  font-bold
  justify-center
  h-full
  ${p => (p.$pos === 'left' ? 'rounded-s-lg' : 'rounded-e-lg')}
`

const StyledNumberInput = tw.input`
  bg-darkLight
  border-x-0
  border-1
  border-darkLightBorder
  text-center
  text-light
  text-sm
  flex
  items-center
  justify-center
  font-bold
  w-full
  min-w-10
  h-full
`

interface NumberInputProps {
  onDecrease: () => void
  onIncrease: () => void
  value: number | string
  label: ReactNode
}

const NumberInput = ({ onIncrease, onDecrease, value, label }: NumberInputProps) => (
  <div className="flex justify-between items-center gap-2 items-stretch flex-1">
    <div className="whitespace-nowrap text-sm flex flex-col items-center justify-center">
      {label}
    </div>
    <div className="relative flex items-center max-w-24">
      <StyledToggleButton $pos="left" type="button" onClick={onDecrease} aria-label="Decrement">
        -
      </StyledToggleButton>
      <StyledNumberInput type="text" value={value} readOnly />
      <StyledToggleButton $pos="right" type="button" onClick={onIncrease} aria-label="Increment">
        +
      </StyledToggleButton>
    </div>
  </div>
)

export default NumberInput
