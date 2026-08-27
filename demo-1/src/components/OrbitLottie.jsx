import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import orbitLottieUrl from '../assets/echo-orbit.json?url'

export default function OrbitLottie({ className = '' }) {
  return <DotLottieReact className={`orbit-lottie ${className}`} src={orbitLottieUrl} autoplay loop />
}
