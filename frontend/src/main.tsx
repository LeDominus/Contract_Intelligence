import { AuthProvider } from "./providers/AuthProvider"
import ReactDOM from "react-dom/client"
import { QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "@tanstack/react-router"
import { queryClient } from "@/lib/query-client"
import { ThemeProvider } from "@/providers/ThemeProvider"
import { router } from "@/router"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </ThemeProvider>
)