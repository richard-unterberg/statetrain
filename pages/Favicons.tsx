import { APP_CONFIG } from "#lib/constants"

const Favicons = () => (
  <>
    <meta name="msapplication-TileImage" content={`${APP_CONFIG.viteUrl}/favicon/ms-icon-144x144.png`} />
    <link rel="icon" href={`${APP_CONFIG.viteUrl}/favicon/favicon.ico`} sizes="32x32" />
    <link
      rel="icon"
      href={`${APP_CONFIG.viteUrl}/favicon/favicon-16x16.png`}
      sizes="16x16"
      type="image/png"
    />
    <link
      rel="icon"
      href={`${APP_CONFIG.viteUrl}/favicon/favicon-32x32.png`}
      sizes="32x32"
      type="image/png"
    />
    <link
      rel="icon"
      href={`${APP_CONFIG.viteUrl}/favicon/favicon-96x96.png`}
      sizes="96x96"
      type="image/png"
    />
    <link rel="apple-touch-icon" href={`${APP_CONFIG.viteUrl}/favicon/apple-icon-57x57.png`} sizes="57x57" />
    <link rel="apple-touch-icon" href={`${APP_CONFIG.viteUrl}/favicon/apple-icon-60x60.png`} sizes="60x60" />
    <link rel="apple-touch-icon" href={`${APP_CONFIG.viteUrl}/favicon/apple-icon-72x72.png`} sizes="72x72" />
    <link rel="apple-touch-icon" href={`${APP_CONFIG.viteUrl}/favicon/apple-icon-76x76.png`} sizes="76x76" />
    <link
      rel="apple-touch-icon"
      href={`${APP_CONFIG.viteUrl}/favicon/apple-icon-114x114.png`}
      sizes="114x114"
    />
    <link
      rel="apple-touch-icon"
      href={`${APP_CONFIG.viteUrl}/favicon/apple-icon-120x120.png`}
      sizes="120x120"
    />
    <link
      rel="apple-touch-icon"
      href={`${APP_CONFIG.viteUrl}/favicon/apple-icon-144x144.png`}
      sizes="144x144"
    />
    <link
      rel="apple-touch-icon"
      href={`${APP_CONFIG.viteUrl}/favicon/apple-icon-152x152.png`}
      sizes="152x152"
    />
    <link
      rel="apple-touch-icon"
      href={`${APP_CONFIG.viteUrl}/favicon/apple-icon-180x180.png`}
      sizes="180x180"
    />
  </>
)

export default Favicons
