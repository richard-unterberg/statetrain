import NumberInput from '#components/form/NumberInput'
import useTone from '#tone/useTone'

const TransportSettings = () => {
  const { bpm, timeSignature, handleChangeBpm, handleChangeTimeSignature } = useTone()

  return (
    <div className="flex flex-col items-stretch justify-between gap-1">
      <NumberInput
        label="Global BPM"
        value={bpm}
        onIncrease={() => handleChangeBpm(bpm + 1)}
        onDecrease={() => handleChangeBpm(bpm - 1)}
      />
      <NumberInput
        label="Time Signature"
        value={`${timeSignature}/4`}
        onIncrease={() => handleChangeTimeSignature(timeSignature + 1)}
        onDecrease={() => handleChangeTimeSignature(timeSignature - 1)}
      />
    </div>
  )
}

export default TransportSettings
