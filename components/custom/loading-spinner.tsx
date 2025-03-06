import { LoaderCircle } from 'lucide-react'

export default function LoadingWidget({ className, withoutContainer = false }: { className?: string, withoutContainer?: boolean }) {
  return (
    <>
      {withoutContainer == true && (
        <div className="animate-spin">
          <LoaderCircle size={40} />
        </div>
      )}
      {withoutContainer == false && (
        <div className={`flex items-center justify-center h-screen ${className}`}>
          <div className="animate-spin">
            <LoaderCircle size={40} />
          </div>
        </div>
      )}
    </>
  )
}
