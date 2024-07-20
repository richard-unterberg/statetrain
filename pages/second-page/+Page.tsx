import H4Headline from '#components/common/H4Headline'
import Layout from '#components/common/Layout'
import Link from '#components/common/Link'
import InlinePlayButton from '#components/InlinePlayButton'

// todo: the current implementation must be oursourced to a separate file out of the page context
const StartPage = () => (
  <Layout className="mt-10">
    <H4Headline className="mb-5">💫 This is the alternative page layout :)</H4Headline>
    <p className="mb-3">We can now control tone.js from here</p>
    <InlinePlayButton className="mb-3" />
    <p>
      or after transitioning to the <Link href="">start page</Link> of the app
    </p>
  </Layout>
)
export default StartPage
