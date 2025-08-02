import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type SortOption = 'title' | 'price' | 'date'

type SortDropdownProps = {
  value: SortOption
  onChange: (value: SortOption) => void
}

export function Toolbar({ value, onChange }: SortDropdownProps) {
  return (
    <div className="p-4 text-text dark:text-dark-text">
      <Select
        value={value}
        onValueChange={(val) => onChange(val as SortOption)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="title">Sort by: Title (A–Z)</SelectItem>
          <SelectItem value="price">Sort by: Price (Low–High)</SelectItem>
          <SelectItem value="date">Sort by: Newest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
