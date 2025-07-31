import { Link } from '@tanstack/react-router'

export function Logo() {
  return (
    <div className="text-2xl font-bold text-primary">
      <Link to="/">
        <span className="text-primary dark:text-dark-primary">Skill</span>
        <span className="text-green-600">Market</span>
      </Link>
    </div>
  )
}
