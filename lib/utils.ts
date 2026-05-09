export function cn(...inputs: unknown[]): string {
  const out: string[] = []

  const push = (value: unknown) => {
    if (!value) return
    if (typeof value === "string") {
      if (value.trim()) out.push(value)
      return
    }
    if (typeof value === "number") {
      out.push(String(value))
      return
    }
    if (Array.isArray(value)) {
      for (const v of value) push(v)
      return
    }
    // Ignore non-string inputs (objects, functions, MotionValues, etc.)
  }

  for (const input of inputs) push(input)
  return out.join(" ")
}
