"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, ShieldCheck, ArrowRight, Loader2 } from "lucide-react"

import { AuthCard } from "@/components/auth/auth-card"
import { AuthInput } from "@/components/auth/auth-input"
import { SSOButton } from "@/components/auth/sso-button"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const router = useRouter()
  const [step, setStep] = React.useState<"email" | "otp">("email")
  const [email, setEmail] = React.useState("")
  const [otp, setOtp] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | undefined>()

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError("Please enter your email")
      return
    }
    setError(undefined)
    setIsLoading(true)
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setStep("otp")
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length < 6) {
      setError("Please enter a valid 6-digit code")
      return
    }
    setError(undefined)
    setIsLoading(true)
    
    // Mock verification
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (otp === "123456") {
      router.push("/dashboard")
    } else {
      setError("Invalid code. Try 123456 for testing.")
      setIsLoading(false)
    }
  }

  return (
    <AuthCard
      title={step === "email" ? "Welcome back" : "Verify Email"}
      description={
        step === "email" 
          ? "Enter your details to access your account" 
          : `We've sent a code to ${email}`
      }
    >
      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {step === "email" ? (
            <motion.div
              key="email-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-3">
                <SSOButton provider="google" label="Continue with Google" />
                <SSOButton provider="github" label="Continue with GitHub" />
                <SSOButton provider="microsoft" label="Continue with Microsoft" />
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>

              <form onSubmit={handleContinue} className="space-y-4">
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
                      Continue <ArrowRight className="ml-2 size-4" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="otp-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <form onSubmit={handleVerify} className="space-y-4">
                <AuthInput
                  label="Verification Code"
                  placeholder="000000"
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setOtp(val);
                  }}
                  leftIcon={<ShieldCheck className="size-4" />}
                  error={error}
                  required
                />
                <p className="text-center text-xs text-muted-foreground">
                  Test code: <span className="font-mono text-primary">123456</span>
                </p>
                <Button 
                  type="submit" 
                  className="w-full h-11 rounded-xl text-md font-semibold bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="size-5 animate-spin" /> : "Verify & Sign In"}
                </Button>
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Back to email
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </AuthCard>
  )
}
