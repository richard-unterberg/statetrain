import { Play, Square } from "lucide-react"
import { useCallback, useState } from "react"

import Button from "#components/common/Button"
import ElementContainer from "#components/common/ElementContainer"
import Layout from "#components/common/Layout"
import TransportSettings from "#components/TransportControls/TransportSettings"
import TransportVisualizer from "#components/TransportControls/TransportVisualizer"
import useMetronome from "#tone/useMetronome"
import useTone from "#tone/useTone"
import useTransportChange from "#tone/useTransportChange"

const TransportControl = () => {
  const [currentPosition, setCurrentPosition] = useState<undefined | number>(undefined)
  const { isPlaying, handlePlay, handleStop, tone, transport } = useTone()

  // mount metronome with controls
  const { setMetronome } = useMetronome({ tone, transport })

  const handlePlayButtonClick = useCallback(() => {
    if (isPlaying) {
      handleStop()
      setCurrentPosition(undefined)
    } else {
      handlePlay()
    }
  }, [handlePlay, handleStop, isPlaying])

  useTransportChange({
    registerEvent: setMetronome,
  })

  return (
    <Layout className="mt-10 flex">
      <ElementContainer className="inline-flex gap-2 items-stretch h-20">
        <TransportSettings />
        <Button
          icon={isPlaying ? <Square className="w-10 h-10" /> : <Play className="w-10 h-10" />}
          className={` ${isPlaying ? "bg-warningDark" : " bg-successDark"}`}
          onClick={handlePlayButtonClick}
        />
        <TransportVisualizer currentPosition={currentPosition} setCurrentPosition={setCurrentPosition} />
      </ElementContainer>
    </Layout>
  )
}
export default TransportControl
