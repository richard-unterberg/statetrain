import { Play, Square } from 'lucide-react'
import React, { useCallback } from 'react'

import Button from '#components/common/Button'
import useTone from '#tone/useTone'

type InlinePlayButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  className?: string
}

const InlinePlayButton = ({ className, ...props }: InlinePlayButtonProps) => {
  const { isPlaying, handlePlay, handleStop } = useTone()

  const handlePlayButtonClick = useCallback(() => {
    if (isPlaying) {
      handleStop()
    } else {
      handlePlay()
    }
  }, [handlePlay, handleStop, isPlaying])

  return (
    <Button
      className={`${isPlaying ? 'bg-warningDark' : 'bg-successDark animate-pulse'} ${className}`}
      onClick={handlePlayButtonClick}
      icon={
        isPlaying ? (
          <Square className="w-3 h-3" strokeWidth={4} />
        ) : (
          <Play className="w-3 h-3" strokeWidth={4} />
        )
      }
      {...props}
    >
      {isPlaying ? 'Stop' : 'Play'}
    </Button>
  )
}

export default InlinePlayButton
