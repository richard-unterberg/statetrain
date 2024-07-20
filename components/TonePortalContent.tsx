import Button from '#components/common/Button'
import H2Headline from '#components/common/H2Headline'

const TonePortalContent = ({ handleClick }: { handleClick: () => void }) => (
  <div className="flex justify-center">
    <div className="mt-16 p-3">
      <div className="text-5xl text-center mb-6">🚂🚃</div>
      <H2Headline className="text-4xl text-center font-black mb-6">STATETRAIN</H2Headline>
      <p className="text-xl md:w-3/4 mx-auto mb-5 text-center">
        Gain control of the tone.js transport with a modern routable typescript-react environment.
        🚂🚃
      </p>
      <Button className="bg-successDark text-white w-full justify-center" onClick={handleClick}>
        Initialize Tone.js *
      </Button>
      <div className="text-sm mt-3 text-gray text-center">
        * unlocks tone.js context for all following pages / components
      </div>
    </div>
  </div>
)

export default TonePortalContent
