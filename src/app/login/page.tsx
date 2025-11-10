'use client'

import { Suspense } from 'react'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Image from 'next/image'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const domainError = searchParams.get('error') === 'domain'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Verificar domínio
      const allowedDomain = process.env.NEXT_PUBLIC_SUPABASE_ALLOWED_DOMAIN
      if (allowedDomain) {
        const userDomain = email.split('@')[1]
        
        if (userDomain !== allowedDomain) {
          await supabase.auth.signOut()
          setError(`Apenas emails do domínio @${allowedDomain} são permitidos.`)
          setLoading(false)
          return
        }
      }

      router.push('/dashboard')
      router.refresh()
    } catch (error: any) {
      setError(error.message || 'Erro ao fazer login. Verifique suas credenciais.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex-flex-col md:grid md:grid-cols-12 bg-gray-100 items-stretch">
      <div className='md:col-span-6 flex items-center justify-center'>
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 mb-6">
            <Image src={'/logo_corsan.svg'} alt='logo login' width={70} height={70}/>
            <CardTitle className="text-xl font-bold mt-10">Login</CardTitle>
            <CardDescription>Entre com suas credenciais para acessar a plataforma.</CardDescription>
          </CardHeader>
          
          <CardContent>
            {domainError && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>
                  Seu domínio de email não é permitido nesta plataforma.
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>

          <CardFooter className='mt-20 flex justify-center'>
            <CardDescription className='text-[10px]'>©Todos os Direitos Reservados <a href='https://explorercallcenter.com.br?utm_source=google&utm_medium=plataforma+chat+corsan' target='_blank' className='font-bold'>Explorer Call Center.</a></CardDescription>
          </CardFooter>
        </Card>
      </div>

      <div className="relative md:col-span-6 md:block hidden overflow-hidden ">
        <div className="absolute inset-0 bg-[url(/2151210298.jpg)] bg-cover bg-center" />
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}