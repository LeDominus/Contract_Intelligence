import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Moon, Sun, Monitor, Pencil, Check, X } from "lucide-react"
import { useAuth } from "@/providers/AuthProvider"
import { useTheme } from "@/providers/ThemeProvider"
import { ROLE_META } from "@/types/user"
import type { UserRole } from "@/types/user"

const THEME_OPTIONS = [
  { value: "light", label: "Светлая", icon: Sun },
  { value: "dark", label: "Тёмная", icon: Moon },
  { value: "system", label: "Системная", icon: Monitor },
] as const

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function ProfilePage() {
  const { user, updateUser } = useAuth()
  const { theme, setTheme } = useTheme()
  const [isEditing, setIsEditing] = useState(false)
  const [draftName, setDraftName] = useState(user?.name ?? "")

  if (!user) return null

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const handleSave = () => {
    if (draftName.trim()) {
      updateUser({ name: draftName.trim() })
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setDraftName(user.name)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Профиль</h2>
        <p className="text-sm text-muted-foreground">
          Личные данные, роль и предпочтения
        </p>
      </div>

      {/* Карточка пользователя */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-3">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    className="max-w-xs"
                    autoFocus
                  />
                  <Button size="icon" variant="ghost" onClick={handleSave}>
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={handleCancel}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => setIsEditing(true)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}

              <p className="text-sm text-muted-foreground">{user.email}</p>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{ROLE_META[user.role].label}</Badge>
                <span className="text-xs text-muted-foreground">ID: {user.id}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Роль */}
      <Card>
        <CardHeader>
          <CardTitle>Роль в системе</CardTitle>
          <CardDescription>
            Определяет, какие инсайты и типы событий показываются в ленте
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            value={user.role}
            onValueChange={(value) => updateUser({ role: value as UserRole })}
          >
            <SelectTrigger className="max-w-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(ROLE_META) as UserRole[]).map((role) => (
                <SelectItem key={role} value={role}>
                  {ROLE_META[role].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="rounded-lg border bg-muted/30 p-3">
            <p className="text-sm">{ROLE_META[user.role].description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Внешний вид */}
      <Card>
        <CardHeader>
          <CardTitle>Внешний вид</CardTitle>
          <CardDescription>Тема оформления интерфейса</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3 max-w-md">
            {THEME_OPTIONS.map((option) => {
              const isActive = theme === option.value
              return (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
                    isActive
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  }`}
                >
                  <option.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Активность */}
      <Card>
        <CardHeader>
          <CardTitle>Активность</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Дата регистрации</span>
            <span>{formatDate(user.joinedAt)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Последняя активность</span>
            <span>{formatDate(user.lastActiveAt)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Опасная зона */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Сессия</CardTitle>
          <CardDescription>
            Выход завершит текущую сессию и потребует повторного входа
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="text-red-600 border-red-200 hover:bg-red-50"
            onClick={() => {
              localStorage.removeItem("ci-user")
              window.location.href = "/login"
            }}
          >
            Выйти из аккаунта
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}