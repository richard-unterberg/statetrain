import Button from '#components/common/Button'
import { APP_CONFIG } from '#lib/constants'

const TonePortalContent = ({ handleClick }: { handleClick: () => void }) => (
  <section className="flex justify-center">
    <div className="mt-16 p-3">
      <div className="text-5xl text-center mb-5">🚂🚃</div>
      <h1 className="text-4xl text-center font-black mb-6">STATETRAIN</h1>
      <h2 className="text-xl md:w-3/4 mx-auto mb-6 text-center text-light">
        {APP_CONFIG.description}
      </h2>
      <Button
        className="bg-successDark text-white w-full mb-3 max-w-60 justify-center mx-auto"
        onClick={handleClick}
      >
        Initialize Tone.js
      </Button>
      <p className="text-center md:w-1/2 mx-auto text-gray">
        This button unlocks tone.js context for all following pages / components
      </p>
    </div>
  </section>
)

export default TonePortalContent
