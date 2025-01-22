import type { ReactNode } from "react"

import "#components/styles.css"
import "@unocss/reset/tailwind.css"
import "virtual:uno.css"

import TransportControl from "#components/TransportControls"
import ToneContextProvider from "#tone/context/ToneContextProvider"
import TonePortal from "#tone/TonePortal"

const App = ({ children }: { children: ReactNode }) => (
  <ToneContextProvider>
    <TonePortal>
      <TransportControl />
      {children}
    </TonePortal>
  </ToneContextProvider>
)

export default App
