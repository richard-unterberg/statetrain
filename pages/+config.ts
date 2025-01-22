import vikeReact from "vike-react/config"
import type { Config } from "vike/types"

// Default configs (can be overridden by pages)
export default {
  // https://vike.dev/clientRouting
  clientRouting: true,
  // https://vike.dev/extends
  extends: vikeReact,
  // https://vike.dev/meta#example-modify-data-env
  meta: {
    data: {
      // By default, the data() hook is loaded and executed only on the
      // server-side. By using meta we can make it isomorphic instead:
      // data() is loaded and executed as well on the client-side.
      env: { server: true, client: true },
    },
  },
} satisfies Config
