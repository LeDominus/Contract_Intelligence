export type UserRole = "risk_manager" | "dealmaker" | "client_manager"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatarUrl?: string
  joinedAt: string
  lastActiveAt: string
}

export const ROLE_META: Record<UserRole, { label: string; description: string }> = {
  risk_manager: {
    label: "Риск-менеджер",
    description: "Мониторинг контрагентов, регуляторики и санкционных рисков",
  },
  dealmaker: {
    label: "Инвестиционный банкир",
    description: "Сигналы по сделкам, M&A и рыночным возможностям",
  },
  client_manager: {
    label: "Клиентский менеджер",
    description: "События у клиентов и отраслевые сдвиги",
  },
}