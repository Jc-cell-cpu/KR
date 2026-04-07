"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, ArrowRight, Loader2, CheckCircle2 } from "lucide-react"

import { AuthCard } from "@/components/auth/auth-card"
import { AuthInput } from "@/components/auth/auth-input"
import { SSOButton } from "@/components/auth/sso-button"
import { Button } from "@/components/ui/button"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [error, setError] = React.useState<string | undefined>()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError("Please enter your email")
      return
    }
    setError(undefined)
    setIsLoading(true)
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setIsSuccess(true)
    
    // Redirect to login after a delay
    setTimeout(() => {
      router.push("/")
    }, 3000)
  }

  if (isSuccess) {
    return (
      <AuthCard 
        title="Check your inbox" 
        description="We've sent a magic link to your email to complete registration."
      >
        <div className="flex flex-col items-center justify-center space-y-6 py-8">
          <div className="relative">
            <div className="absolute inset-0 scale-150 blur-2xl opacity-20 bg-primary rounded-full animate-pulse-glow" />
            <CheckCircle2 className="size-20 text-primary relative z-10" />
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-6">
              You'll be redirected to login in a few seconds...
            </p>
            <Button 
              variant="outline" 
              className="rounded-xl"
              onClick={() => router.push("/")}
            >
              Go to login
            </Button>
          </div>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Create account"
      description="Join thousands of teams using KR today"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-3">
          <SSOButton provider="google" label="Sign up with Google" />
          <SSOButton provider="github" label="Sign up with GitHub" />
          <SSOButton provider="microsoft" label="Sign up with Microsoft" />
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-transparent px-2 text-muted-foreground">
              Or sign up with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <AuthInput
            label="Email address"
            placeholder="name@company.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="size-4" />}
            error={error}
            required
          />
          <Button 
            type="submit" 
            className="w-full h-11 rounded-xl text-md font-semibold bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="size-5 animate-spin" /> : (
              <>
                Create account <ArrowRight className="ml-2 size-4" />
              </>
            )}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/"
            className="font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Sign in
          </Link>
        </div>

        <p className="text-[10px] text-center text-muted-foreground leading-relaxed">
          By signing up, you agree to our{" "}
          <Link href="#" className="underline hover:text-foreground transition-colors">Terms of Service</Link> and{" "}
          <Link href="#" className="underline hover:text-foreground transition-colors">Privacy Policy</Link>.
        </p>
      </div>
    </AuthCard>
  )
}
