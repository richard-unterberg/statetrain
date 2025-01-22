import H4Headline from "#components/common/H4Headline"
import Layout from "#components/common/Layout"
import Link from "#components/common/Link"
import InlinePlayButton from "#components/InlinePlayButton"

const StartPage = () => (
  <Layout className="mt-10">
    <H4Headline className="mb-5">🏡 This is the start page layout :)</H4Headline>
    <p>
      For a side project I needed a routable typescript react application with access to a shared tone.js
      context. To test my code I build a small metronome implementation which needs kind of a communication
      layer to and from tone.js
    </p>
    <p className="mb-3">We can control tone JS from here</p>
    <InlinePlayButton className="mb-3" />
    <p>
      or after transitioning to a <Link href="second-page/">alternative page</Link> of the application
    </p>
  </Layout>
)
export default StartPage
