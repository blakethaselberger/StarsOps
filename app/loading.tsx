export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-[#006847] animate-spin" />
        <img
          src="/dallas-stars.svg"
          alt="Stars Logo"
          className="absolute inset-0 h-8 w-8 m-auto object-contain"
        />
      </div>
    </div>
  )
}
