interface SpringConfig {
  mass: number
  duration: number
  dampingRatio?: number
}

export default function physicsSpring({ mass, duration, dampingRatio = 0.6 }: SpringConfig) {
  const omega0 = 4.6 / duration
  const stiffness = mass * omega0 * omega0
  const damping = 2 * dampingRatio * Math.sqrt(stiffness * mass)

  return {
    mass,
    stiffness,
    damping,
  }
}

// I am really like this spring function i hope y'all like it as much as i am 😜   chlen
