import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Settings, LogOut, HelpCircle } from "lucide-react"
import { Link, useNavigate } from "@tanstack/react-router"
import { useAuth } from "@/providers/AuthProvider"

export function UserMenu() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "??"

  const handleLogout = () => {
    logout()
    navigate({ to: "/login" })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon" className="rounded-full" />}
      >
        <Avatar className="h-8 w-8">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        {/* Label обязан быть внутри Group — требование Base UI */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.name ?? "Гость"}</span>
              <span className="text-xs text-muted-foreground">{user?.email}</span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem render={<Link to="/profile" />}>
          <User className="h-4 w-4 mr-2" />
          Профиль
        </DropdownMenuItem>

        <DropdownMenuItem render={<Link to="/settings" />}>
          <Settings className="h-4 w-4 mr-2" />
          Настройки
        </DropdownMenuItem>

        <DropdownMenuItem>
          <HelpCircle className="h-4 w-4 mr-2" />
          Помощь
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          <LogOut className="h-4 w-4 mr-2" />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}