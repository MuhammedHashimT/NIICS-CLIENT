'use client'

import { useState } from 'react'
import { PersonalInfo } from '../components/PersonalInfo'
import { ContactDetails } from '../components/ContactDetails'
import { ExamCenter } from '../components/ExamCenter'
import { LoadingAnimation } from '../components/ApplicationLoading'
import { SuccessMessage } from '@/components/ApplicationSuccess'

export default function Apply() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    personalInfo: {},
    contactDetails: {},
    examCenter: {}
  })

  const handleNext = async (data: any) => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setFormData(prev => ({ ...prev, [Object.keys(data)[0]]: data[Object.keys(data)[0]] }))
    setLoading(false)
    setStep(prev => prev + 1)
  }

  const handleDoLater = () => {
    // Logic for saving progress and exiting
    console.log("Progress saved. You can continue later.")
  }

  if (loading) {
    return <LoadingAnimation />
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Admission Application</h1>
      {step === 1 && <PersonalInfo onNext={handleNext} />}
      {step === 2 && <ContactDetails onNext={handleNext} onDoLater={handleDoLater} />}
      {step === 3 && <ExamCenter onNext={handleNext} onDoLater={handleDoLater} />}
      {step > 3 && <SuccessMessage />}
    </div>
  )
}