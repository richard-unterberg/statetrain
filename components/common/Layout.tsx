import tw from 'tailwind-styled-components'

interface LayoutTwProps {
  $fullWidth?: boolean
}

export default tw.div<LayoutTwProps>`
  m-auto
  ${p => (p.$fullWidth ? 'w-full' : 'container max-w-screen-lg')}
  px-4
  px-lg-0
`
