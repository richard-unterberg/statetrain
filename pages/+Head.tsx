import { APP_CONFIG } from "#lib/constants"
import Favicons from "#pages/Favicons"

const Head = () => (
  <>
    <Favicons />
    <meta name="msapplication-TileColor" content="#020617" />
    <meta name="theme-color" content="#020617" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="index, follow" />
    <link rel="manifest" href={`${APP_CONFIG.viteUrl}/site.webmanifest`} />
    <meta name="description" content={APP_CONFIG.description} />
  </>
)

export default Head
