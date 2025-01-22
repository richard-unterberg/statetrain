import type { ReactNode } from "react"

import "#components/styles.css"
import "@unocss/reset/tailwind.css"
import "virtual:uno.css"

import TransportControl from "#components/TransportControls"
import ToneContextProvider from "#tone/context/ToneContextProvider"
import TonePortal from "#tone/TonePortal"
import TransportContextProvider from "#tone/context/TransportContextProvider"

const App = ({ children }: { children: ReactNode }) => (
  <ToneContextProvider>
    <TransportContextProvider>
      <TonePortal>
        <TransportControl />
        {children}
      </TonePortal>
    </TransportContextProvider>
  </ToneContextProvider>
)

export default App
