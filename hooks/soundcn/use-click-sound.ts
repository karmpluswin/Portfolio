"use client"

import { useCallback, useRef } from "react"

type ClickFn = () => void

let sharedAudioContext: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctx) return null
  if (!sharedAudioContext) sharedAudioContext = new Ctx()
  return sharedAudioContext
}

/**
 * Tiny click sound inspired by UI toggle demos.
 * No external audio assets required.
 */
export function useClickSound(): [ClickFn] {
  const lastPlayedAtRef = useRef(0)

  const click = useCallback(() => {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = performance.now()
    // Prevent rapid-fire clicks from stacking too loudly.
    if (now - lastPlayedAtRef.current < 60) return
    lastPlayedAtRef.current = now

    const play = () => {
      const t0 = ctx.currentTime

      // Noise burst (tick) + bandpass filter.
      const duration = 0.035
      const sampleRate = ctx.sampleRate
      const frameCount = Math.max(1, Math.floor(sampleRate * duration))
      const buffer = ctx.createBuffer(1, frameCount, sampleRate)
      const data = buffer.getChannelData(0)

      for (let i = 0; i < frameCount; i += 1) {
        // Slightly tapered noise to avoid harshness.
        const x = i / frameCount
        const amp = 1 - x
        data[i] = (Math.random() * 2 - 1) * amp
      }

      const source = ctx.createBufferSource()
      source.buffer = buffer

      const filter = ctx.createBiquadFilter()
      filter.type = "bandpass"
      filter.frequency.setValueAtTime(2800, t0)
      filter.Q.setValueAtTime(0.9, t0)

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.0001, t0)
      gain.gain.exponentialRampToValueAtTime(0.14, t0 + 0.004)
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)

      source.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      source.start(t0)
      source.stop(t0 + duration)

      source.onended = () => {
        try {
          source.disconnect()
          filter.disconnect()
          gain.disconnect()
        } catch {
          // ignore
        }
      }
    }

    if (ctx.state === "suspended") {
      // Resume must be triggered by a user gesture.
      void ctx.resume().then(play)
      return
    }

    play()
  }, [])

  return [click]
}
