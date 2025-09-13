"use client"

import { useState, useEffect } from "react"
import { X, Star, Users, BookOpen, Award } from "lucide-react"

interface PromotionWidgetProps {
  trigger?: string // Used to trigger widget reappearance when switching tabs
}

export default function PromotionWidget({ trigger }: PromotionWidgetProps) {
  const [visible, setVisible] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  // Show widget when component mounts or trigger changes (tab switching)
  useEffect(() => {
    setVisible(true)
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 500)
    return () => clearTimeout(timer)
  }, [trigger])

  // Handle close with 10-minute timer
  const handleClose = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setVisible(false)
      setIsAnimating(false)
    }, 300)

    // Set timer to show widget again after 10 minutes (600,000 ms)
    setTimeout(
      () => {
        setVisible(true)
      },
      10 * 60 * 1000,
    ) // 10 minutes
  }

  if (!visible || trigger === "menu") return null

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 w-full sm:w-96 lg:w-[420px] p-4 z-50">
      <div 
        className={`relative overflow-hidden transition-all duration-500 ease-out transform ${
          isAnimating ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        }`}
      >
        {/* Background with gradient and pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 opacity-95"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        {/* Main content */}
        <div className="relative text-white p-6 rounded-l-2xl shadow-2xl border border-white/10 backdrop-blur-sm">
          {/* Close button */}
          <button 
            onClick={handleClose} 
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 group"
          >
            <X className="h-4 w-4 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Header with icon */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Award className="h-6 w-6 text-yellow-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Premium OET Course
              </h2>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-300 text-yellow-300" />
                ))}
                <span className="text-xs text-blue-100 ml-1">(4.9/5)</span>
              </div>
            </div>
          </div>

          {/* Features list */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <BookOpen className="h-4 w-4 text-green-300 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-blue-50">
                <span className="font-semibold text-white">17 Core Lectures:</span> 10 Writing + 7 Speaking
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-4 w-4 text-blue-300 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-blue-50">
                <span className="font-semibold text-white">9 Bonus Lectures:</span> 5 Grammar + 4 Speaking Practice
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Award className="h-4 w-4 text-purple-300 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-blue-50">
                <span className="font-semibold text-white">5 Letter Corrections</span> included
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href="https://t.me/elgendy011"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold py-3 px-6 rounded-xl text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-yellow-500/25 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>Get Your Discount Now</span>
              <div className="w-2 h-2 bg-gray-900 rounded-full animate-pulse"></div>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>

          {/* Trust indicator */}
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-blue-200">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Limited time offer • Join 500+ successful students</span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-tr from-purple-400/20 to-pink-500/20 rounded-full blur-xl"></div>
      </div>
    </div>
  )
}
