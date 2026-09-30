import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return <label className="search-box"><Search size={17} /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /></label>
}
