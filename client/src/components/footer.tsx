import { Github, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="text-muted-foreground dark:text-dark-muted-text py-10 px-6 border-t">
      <div className="max-w-6xl mx-auto flex flex-row items-center justify-between gap-6 text-sm">
        {/* Left: Brand */}
        <div className="text-left">
          <span className="font-bold text-primary text-lg">
            Skill<span className="text-green-600">Market</span>
          </span>
          <p className="mt-1 text-xs">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Right: Social Icons */}
        <div className="flex gap-4">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <Linkedin className="w-5 h-5 hover:text-primary transition" />
          </a>
          <a href="https://github.com/vraun0" target="_blank" rel="noreferrer">
            <Github className="w-5 h-5 hover:text-primary transition" />
          </a>
        </div>
      </div>
    </footer>
  )
}
