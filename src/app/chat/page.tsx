import { AppSidebar } from "@/components/layout/app-sidebar"
import Chatbot from "@/components/layout/chatbot"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Page() {
  
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // NOVO: Se não estiver autenticado, redireciona
  if (!user) {
    redirect('/login')
  }

  return (
    <SidebarProvider
      className="h-screen overflow-hidden"
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <Chatbot userEmail={user.email!} />
      </SidebarInset>
    </SidebarProvider>
  )
}