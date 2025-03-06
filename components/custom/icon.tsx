import Image from 'next/image'

export default function Icon({ icon, width, height, className }: { icon: string, width?: number, height?: number, className?: string }) {
  return (
    <Image src={`/assets/icons/${icon}.svg`} alt={icon} width={width || 20} height={height || 20} className={className} color='currentColor' />
  )
}
