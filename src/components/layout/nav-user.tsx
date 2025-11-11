
import { Avatar, AvatarFallback, AvatarImage,} from "@/components/ui/avatar"
import { SidebarMenu, SidebarMenuItem, } from "@/components/ui/sidebar"
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LogoutButton } from "../ui/logout-button"
import { LifeBuoy, Star } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import { Separator } from "../ui/separator"


export async  function NavUser(){
    const supabase = await createClient()
  
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }
    
  return (
    <SidebarMenu>
        <SidebarMenuItem className="flex flex-col items-center bg-foreground/5 p-2 space-y-2 rounded-lg">
            <Button asChild className="w-full" variant={"ghost"}> 
                <Link href="http://chat.wescctech.com.br:3000/home" className="flex items-center justify-start space-x-2">
                    <LifeBuoy />
                    <span>Suporte</span>
                </Link>
            </Button>
            <Separator className="w-full" />
            <Button asChild className="w-full" variant={"ghost"}> 
                <Link href="http://chat.wescctech.com.br:3000/home" className="flex items-center justify-start space-x-2">
                    <Star />
                    <span>Falar com Super</span>
                </Link>
            </Button>
        </SidebarMenuItem>
        <SidebarMenuItem className="flex flex-row items-center bg-foreground/5 p-2 rounded-lg">
            <div className="flex flex-1 items-center space-x-3">
                <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/user.png" alt="Avatar"/>
                    <AvatarFallback  className="h-8 w-8 rounded-xs">
                        {user.email ? user.email.split('@')[0].split('.').slice(0, 2).map(word => word.charAt(0).toUpperCase()).join(''): 'U'}
                    </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                        {user.email ? user.email.split('@')[0].split('.').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ') : 'Usuário'}
                    </span>
                    <span className="text-foreground/60 truncate text-xs">{user.email}</span>
                </div>
            </div>
            <LogoutButton />
        </SidebarMenuItem>
    </SidebarMenu>
  )
}
