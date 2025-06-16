import * as React from "react"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(({ className, containerClassName, ...props }, ref) => {
  return (
    <div className={`relative ${containerClassName}`}>
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input ref={ref} className={`pl-10 ${className}`} type="search" {...props} />
    </div>
  )
})
Search.displayName = "Search"

export { Search }
