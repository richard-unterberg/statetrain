import { Play, Square } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import Button from '#components/common/Button'
import ElementContainer from '#components/common/ElementContainer'
import Layout from '#components/common/Layout'
import TransportSettings from '#components/TransportControls/TransportSettings'
import TransportVisualizer from '#components/TransportControls/TransportVisualizer'
import useTone from '#tone/useTone'

const TransportControl = () => {
  const [currentPosition, setCurrentPosition] = useState(0)
  const { isPlaying, loopLength, timeSignature, handlePlay, handleStop, setMetronome } = useTone()

  // calculate the total length of the transport loop
  const modifiedLoopAndSignature = useMemo(
    () => loopLength * timeSignature - 1,
    [loopLength, timeSignature],
  )

  const handlePlayButtonClick = useCallback(() => {
    if (isPlaying) {
      handleStop()
      setCurrentPosition(modifiedLoopAndSignature)
    } else {
      handlePlay()
    }
  }, [handlePlay, handleStop, isPlaying, modifiedLoopAndSignature])

  // setup metronome on mount - todo: overthink placement
  useEffect(() => {
    setMetronome?.()
  }, [setMetronome])

  return (
    <Layout className="mt-10 flex">
      <ElementContainer className="inline-flex gap-2 items-stretch h-20">
        <TransportSettings />
        <Button
          icon={isPlaying ? <Square className="w-10 h-10" /> : <Play className="w-10 h-10" />}
          className={` ${isPlaying ? 'bg-warningDark' : ' bg-successDark'}`}
          onClick={handlePlayButtonClick}
        />
        <TransportVisualizer
          transportLength={modifiedLoopAndSignature}
          currentPosition={currentPosition}
          setCurrentPosition={setCurrentPosition}
        />
      </ElementContainer>
    </Layout>
  )
}
export default TransportControl
