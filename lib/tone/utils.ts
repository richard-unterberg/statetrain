import { TRANSPORT_CONFIG } from '#lib/constants'
import { TransportType } from '#lib/types'

export const setTransportDefaults = (transport: TransportType) => {
  transport.loop = TRANSPORT_CONFIG.loop.default
  transport.loopEnd = `${TRANSPORT_CONFIG.loopLength.default}m`
  transport.bpm.value = TRANSPORT_CONFIG.bpm.default
  transport.timeSignature = TRANSPORT_CONFIG.timeSignature.default
}
