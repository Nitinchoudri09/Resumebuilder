"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle, TrendingUp, FileText, Target, Zap } from "lucide-react"

interface ResumeData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    linkedin: string
    website: string
    github: string
    summary: string
  }
  experience: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
    current: boolean
  }>
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    graduationDate: string
    gpa?: string
  }>
  skills: Array<{
    id: string
    name: string
    level: string
  }>
  projects: Array<{
    id: string
    name: string
    description: string
    technologies: string
    link?: string
    startDate: string
    endDate: string
  }>
  certifications: Array<{
    id: string
    name: string
    issuer: string
    date: string
    expiryDate?: string
    credentialId?: string
  }>
  languages: Array<{
    id: string
    name: string
    proficiency: string
  }>
  awards: Array<{
    id: string
    title: string
    issuer: string
    date: string
    description?: string
  }>
}

interface ATSAnalyzerProps {
  resumeData: ResumeData
  isDarkMode?: boolean
}

export function ATSAnalyzer({ resumeData, isDarkMode }: ATSAnalyzerProps) {
  const analyzeResume = () => {
    let score = 0
    const suggestions = []
    const strengths = []

    // Contact Information (15 points)
    let contactScore = 0
    if (resumeData.personalInfo.fullName) contactScore += 3
    if (resumeData.personalInfo.email) contactScore += 3
    if (resumeData.personalInfo.phone) contactScore += 3
    if (resumeData.personalInfo.location) contactScore += 3
    if (resumeData.personalInfo.linkedin) contactScore += 3

    score += contactScore
    if (contactScore >= 12) {
      strengths.push("Complete contact information")
    } else {
      suggestions.push("Complete all contact information fields")
    }

    // Professional Summary (15 points)
    if (resumeData.personalInfo.summary) {
      if (resumeData.personalInfo.summary.length > 100) {
        score += 15
        strengths.push("Comprehensive professional summary")
      } else if (resumeData.personalInfo.summary.length > 50) {
        score += 10
        suggestions.push("Expand your professional summary (aim for 2-3 sentences)")
      } else {
        score += 5
        suggestions.push("Write a more detailed professional summary")
      }
    } else {
      suggestions.push("Add a professional summary")
    }

    // Work Experience (25 points)
    if (resumeData.experience.length > 0) {
      score += 10
      strengths.push("Work experience included")

      const hasDescriptions = resumeData.experience.some((exp) => exp.description && exp.description.length > 50)
      if (hasDescriptions) {
        score += 15
        strengths.push("Detailed job descriptions")
      } else {
        score += 5
        suggestions.push("Add detailed descriptions for your work experience")
      }
    } else {
      suggestions.push("Add work experience")
    }

    // Education (10 points)
    if (resumeData.education.length > 0) {
      score += 10
      strengths.push("Education information included")
    } else {
      suggestions.push("Add education information")
    }

    // Skills (15 points)
    if (resumeData.skills.length >= 8) {
      score += 15
      strengths.push("Comprehensive skills list")
    } else if (resumeData.skills.length >= 5) {
      score += 10
      suggestions.push("Add more relevant skills (aim for 8-12)")
    } else if (resumeData.skills.length > 0) {
      score += 5
      suggestions.push("Add more skills to showcase your expertise")
    } else {
      suggestions.push("Add relevant skills")
    }

    // Projects (10 points)
    if (resumeData.projects.length >= 2) {
      score += 10
      strengths.push("Multiple projects showcased")
    } else if (resumeData.projects.length === 1) {
      score += 5
      suggestions.push("Add more projects to demonstrate your experience")
    } else {
      suggestions.push("Add relevant projects")
    }

    // Certifications (5 points)
    if (resumeData.certifications.length > 0) {
      score += 5
      strengths.push("Professional certifications included")
    }

    // Languages (3 points)
    if (resumeData.languages.length > 0) {
      score += 3
      strengths.push("Language skills included")
    }

    // Awards (2 points)
    if (resumeData.awards.length > 0) {
      score += 2
      strengths.push("Awards and achievements included")
    }

    return {
      score: Math.min(score, 100),
      suggestions,
      strengths,
    }
  }

  const analysis = analyzeResume()

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600"
    if (score >= 70) return "text-blue-600"
    if (score >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeColor = (score: number) => {
    if (score >= 85) return "bg-green-100 text-green-800"
    if (score >= 70) return "bg-blue-100 text-blue-800"
    if (score >= 50) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 85) return "Excellent"
    if (score >= 70) return "Very Good"
    if (score >= 50) return "Good"
    return "Needs Improvement"
  }

  return (
    <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "border-slate-200"}`}>
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          <TrendingUp className="w-5 h-5 text-blue-600" />
          ATS Score Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Score Display */}
        <div className="text-center">
          <div className={`text-4xl font-bold ${getScoreColor(analysis.score)} mb-2`}>{analysis.score}/100</div>
          <Badge className={`${getScoreBadgeColor(analysis.score)} text-sm px-3 py-1`}>
            {getScoreLabel(analysis.score)}
          </Badge>
          <Progress value={analysis.score} className="mt-4 h-3" />
          <p className={`text-sm mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Your resume is{" "}
            {analysis.score >= 85
              ? "highly optimized"
              : analysis.score >= 70
                ? "well optimized"
                : analysis.score >= 50
                  ? "moderately optimized"
                  : "poorly optimized"}{" "}
            for ATS systems
          </p>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`text-center p-3 rounded-lg ${isDarkMode ? "bg-blue-900/20" : "bg-blue-50"}`}>
            <Target className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <div className="text-lg font-semibold text-blue-600">{analysis.strengths.length}</div>
            <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Strengths</div>
          </div>
          <div className={`text-center p-3 rounded-lg ${isDarkMode ? "bg-orange-900/20" : "bg-orange-50"}`}>
            <Zap className="w-6 h-6 text-orange-600 mx-auto mb-1" />
            <div className="text-lg font-semibold text-orange-600">{analysis.suggestions.length}</div>
            <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>Improvements</div>
          </div>
          <div className={`text-center p-3 rounded-lg ${isDarkMode ? "bg-green-900/20" : "bg-green-50"}`}>
            <FileText className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <div className="text-lg font-semibold text-green-600">{analysis.score}%</div>
            <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-slate-600"}`}>ATS Ready</div>
          </div>
        </div>

        {/* Strengths */}
        {analysis.strengths.length > 0 && (
          <div>
            <h4
              className={`font-semibold ${isDarkMode ? "text-green-500" : "text-green-700"} mb-3 flex items-center gap-2`}
            >
              <CheckCircle className="w-5 h-5" />
              What's Working Well
            </h4>
            <ul className="space-y-2">
              {analysis.strengths.map((strength, index) => (
                <li
                  key={index}
                  className={`text-sm ${isDarkMode ? "text-green-300" : "text-green-700"} flex items-center gap-2 ${isDarkMode ? "bg-green-900/20" : "bg-green-50"} p-2 rounded`}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Suggestions */}
        {analysis.suggestions.length > 0 && (
          <div>
            <h4
              className={`font-semibold ${isDarkMode ? "text-orange-500" : "text-orange-700"} mb-3 flex items-center gap-2`}
            >
              <AlertCircle className="w-5 h-5" />
              Areas for Improvement
            </h4>
            <ul className="space-y-2">
              {analysis.suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className={`text-sm ${isDarkMode ? "text-orange-300" : "text-orange-700"} flex items-center gap-2 ${isDarkMode ? "bg-orange-900/20" : "bg-orange-50"} p-2 rounded`}
                >
                  <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ATS Tips */}
        <div
          className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}
        >
          <h4 className={`font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            <FileText className="w-5 h-5" />
            ATS Optimization Tips
          </h4>
          <ul className={`text-sm space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            <li>• Use standard section headings (Experience, Education, Skills)</li>
            <li>• Include relevant keywords from job descriptions</li>
            <li>• Use bullet points for easy scanning</li>
            <li>• Quantify achievements with numbers and percentages</li>
            <li>• Avoid images, graphics, and complex formatting</li>
            <li>• Save as PDF to preserve formatting</li>
            <li>• Include both hard and soft skills</li>
            <li>• Use action verbs to start bullet points</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
