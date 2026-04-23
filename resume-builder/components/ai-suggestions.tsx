"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, RefreshCw, Send, Wand2 } from "lucide-react"
import React from "react"

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

interface AISuggestionsProps {
  resumeData: ResumeData
  onUpdateText: (field: string, value: string, experienceId?: string) => void
  isDarkMode?: boolean
}

export function AISuggestions({ resumeData, onUpdateText, isDarkMode }: AISuggestionsProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [customPrompt, setCustomPrompt] = useState("")
  const [selectedSection, setSelectedSection] = useState("summary")
  const [showCustomPrompt, setShowCustomPrompt] = useState(false)

  const generateSuggestions = () => {
    const newSuggestions = []

    // Professional Summary Suggestions
    const summaryExamples = [
      "Results-driven professional with 5+ years of experience in software development and project management. Proven track record of delivering high-quality solutions that increase efficiency by 30% and reduce costs. Skilled in leading cross-functional teams and implementing innovative technologies.",
      "Dynamic marketing specialist with expertise in digital campaigns and brand management. Successfully increased brand awareness by 40% and generated $2M+ in revenue through strategic marketing initiatives. Passionate about data-driven decision making and customer engagement.",
      "Experienced financial analyst with strong analytical skills and attention to detail. Demonstrated ability to identify cost-saving opportunities worth $500K+ annually. Proficient in financial modeling, forecasting, and risk assessment across multiple industries.",
      "Innovative product manager with 7+ years of experience driving product strategy and development. Led cross-functional teams to launch 12+ successful products, resulting in 45% revenue growth. Expert in agile methodologies, user research, and market analysis.",
      "Strategic business consultant with expertise in operational excellence and digital transformation. Helped 20+ companies optimize processes, resulting in average cost savings of 25%. Specialized in change management, process improvement, and stakeholder engagement.",
      "Creative UX/UI designer with passion for user-centered design and emerging technologies. Designed intuitive interfaces for 50+ digital products, improving user satisfaction by 60%. Proficient in design thinking, prototyping, and usability testing.",
    ]

    // Job Description Suggestions
    const jobDescriptions = [
      "• Led a team of 8 developers to deliver 15+ projects on time and under budget, resulting in 25% increase in client satisfaction\n• Implemented agile methodologies that improved development efficiency by 40% and reduced time-to-market by 30%\n• Collaborated with stakeholders to define requirements and ensure alignment with business objectives",
      "• Developed and executed comprehensive marketing strategies that increased lead generation by 60% and conversion rates by 35%\n• Managed social media campaigns across 5 platforms, growing follower base by 150% and engagement by 80%\n• Analyzed market trends and competitor activities to identify new opportunities worth $1M+ in potential revenue",
      "• Conducted financial analysis and modeling for investment decisions totaling $50M+ in capital allocation\n• Streamlined reporting processes, reducing monthly close time by 5 days and improving accuracy by 95%\n• Presented findings to C-level executives and board members, influencing strategic business decisions",
      "• Designed and launched 8 mobile applications with over 100K downloads and 4.5+ star ratings\n• Optimized application performance, reducing load times by 50% and increasing user retention by 35%\n• Mentored junior developers and established coding standards that improved code quality by 40%",
      "• Managed product roadmap for SaaS platform serving 10,000+ users, increasing customer satisfaction by 45%\n• Conducted user research and A/B testing to validate features, resulting in 25% increase in user engagement\n• Coordinated with engineering, design, and marketing teams to deliver 20+ feature releases",
      "• Created brand identity and marketing materials for 30+ clients, generating $2.5M in new business\n• Increased website conversion rates by 55% through strategic UX improvements and content optimization\n• Managed creative campaigns that achieved 200% ROI and won 3 industry awards",
    ]

    // Project Description Suggestions
    const projectDescriptions = [
      "Developed a full-stack e-commerce platform using React and Node.js, serving 10,000+ users with 99.9% uptime. Implemented secure payment processing and real-time inventory management, resulting in 40% increase in sales conversion.",
      "Built a machine learning model for predictive analytics that improved forecasting accuracy by 35%. Processed 1M+ data points daily and created interactive dashboards for stakeholders, leading to $500K cost savings.",
      "Created a mobile-first responsive web application with React Native, achieving 4.8-star rating on app stores. Integrated social authentication and push notifications, increasing user engagement by 60%.",
      "Designed and implemented a microservices architecture using Docker and Kubernetes, reducing deployment time by 70%. Established CI/CD pipelines that improved code quality and reduced bugs by 45%.",
      "Developed an AI-powered chatbot using natural language processing, handling 80% of customer inquiries automatically. Reduced response time from 24 hours to 2 minutes, improving customer satisfaction by 50%.",
      "Built a data visualization dashboard using D3.js and Python, processing real-time analytics for executive decision-making. Enabled data-driven insights that increased operational efficiency by 25%.",
    ]

    // Skills Suggestions
    const skillSuggestions = [
      "JavaScript, React, Node.js, Python, AWS, Docker, Git, MongoDB, TypeScript, GraphQL",
      "Digital Marketing, SEO/SEM, Google Analytics, Social Media, Content Strategy, Email Marketing, A/B Testing, CRM, HubSpot, Salesforce",
      "Financial Analysis, Excel, SQL, Tableau, Risk Management, Budgeting, Forecasting, PowerBI, Python, R",
      "Project Management, Scrum, Leadership, Communication, Problem Solving, Team Building, Strategic Planning, Process Improvement, Jira, Confluence",
      "UX/UI Design, Figma, Adobe Creative Suite, Prototyping, User Research, Wireframing, Design Systems, Usability Testing, Sketch, InVision",
      "Data Science, Machine Learning, Python, R, SQL, Tableau, TensorFlow, Pandas, Statistics, Data Visualization",
    ]

    // Add suggestions based on selected section
    if (selectedSection === "summary") {
      const randomSummary = summaryExamples[Math.floor(Math.random() * summaryExamples.length)]
      newSuggestions.push({
        type: "Professional Summary",
        content: randomSummary,
        field: "summary",
        category: "summary",
      })
    } else if (selectedSection === "experience") {
      const randomJobDesc = jobDescriptions[Math.floor(Math.random() * jobDescriptions.length)]
      newSuggestions.push({
        type: "Job Description",
        content: randomJobDesc,
        field: "experience",
        category: "experience",
      })
    } else if (selectedSection === "projects") {
      const randomProjectDesc = projectDescriptions[Math.floor(Math.random() * projectDescriptions.length)]
      newSuggestions.push({
        type: "Project Description",
        content: randomProjectDesc,
        field: "project",
        category: "projects",
      })
    } else if (selectedSection === "skills") {
      const randomSkills = skillSuggestions[Math.floor(Math.random() * skillSuggestions.length)]
      newSuggestions.push({
        type: "Skills List",
        content: randomSkills,
        field: "skills",
        category: "skills",
      })
    }

    return newSuggestions
  }

  const generateCustomSuggestion = () => {
    if (!customPrompt.trim()) return

    setIsGenerating(true)

    // Simulate AI processing
    setTimeout(() => {
      const customSuggestions = [
        `Based on your prompt "${customPrompt}", here's a tailored suggestion: Experienced professional with expertise in ${customPrompt.toLowerCase()}. Demonstrated success in implementing innovative solutions that drive business growth and operational excellence. Proven ability to lead cross-functional teams and deliver results in fast-paced environments.`,
        `Leveraging your focus on "${customPrompt}", here's a customized description: • Spearheaded initiatives related to ${customPrompt.toLowerCase()}, resulting in measurable improvements in efficiency and performance\n• Collaborated with stakeholders to develop strategies that align with business objectives\n• Implemented best practices that enhanced team productivity and customer satisfaction`,
        `Custom content for "${customPrompt}": Developed comprehensive solutions focusing on ${customPrompt.toLowerCase()}, achieving significant milestones and exceeding performance targets. Utilized data-driven approaches to optimize processes and deliver exceptional results that contributed to organizational success.`,
      ]

      const randomCustom = customSuggestions[Math.floor(Math.random() * customSuggestions.length)]

      setSuggestions([
        {
          type: "Custom AI Suggestion",
          content: randomCustom,
          field: selectedSection,
          category: "custom",
          prompt: customPrompt,
        },
      ])

      setIsGenerating(false)
      setCustomPrompt("")
    }, 2000)
  }

  const handleUseText = (suggestion: any) => {
    onUpdateText(suggestion.field, suggestion.content)
  }

  const handleRegenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setSuggestions(generateSuggestions())
      setIsGenerating(false)
    }, 1500)
  }

  // Generate initial suggestions
  React.useEffect(() => {
    setSuggestions(generateSuggestions())
  }, [selectedSection])

  return (
    <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            <Sparkles className="w-5 h-5 text-blue-600" />
            AI Content Assistant
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCustomPrompt(!showCustomPrompt)}
              className={`${isDarkMode ? "border-purple-400 text-purple-400 hover:bg-purple-900/20" : "border-purple-200 text-purple-700 hover:bg-purple-50"}`}
            >
              <Wand2 className="w-4 h-4 mr-1" />
              Custom Prompt
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRegenerate}
              disabled={isGenerating}
              className={`${isDarkMode ? "border-blue-400 text-blue-400 hover:bg-blue-900/20" : "border-blue-200 text-blue-700 hover:bg-blue-50"}`}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? "animate-spin" : ""}`} />
              {isGenerating ? "Generating..." : "Regenerate"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Section Selection */}
        <div>
          <Label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Select Section for AI Suggestions
          </Label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className={`w-full mt-1 p-2 border rounded-md focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white border-gray-300"}`}
          >
            <option value="summary">Professional Summary</option>
            <option value="experience">Work Experience</option>
            <option value="projects">Projects</option>
            <option value="skills">Skills</option>
          </select>
        </div>

        {/* Custom Prompt Section */}
        {showCustomPrompt && (
          <div
            className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-700 border-gray-600" : "bg-purple-50 border-purple-200"}`}
          >
            <Label className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Custom AI Prompt
            </Label>
            <div className="mt-2 space-y-3">
              <Textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Describe what you want AI to help you with... (e.g., 'Write a summary for a senior software engineer with cloud expertise' or 'Create project description for an e-commerce platform')"
                rows={3}
                className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-600 text-white border-gray-500" : "bg-white"}`}
              />
              <Button
                onClick={generateCustomSuggestion}
                disabled={!customPrompt.trim() || isGenerating}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Generate Custom Content
              </Button>
            </div>
          </div>
        )}

        {/* AI Suggestions */}
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 space-y-3 ${isDarkMode ? "border-gray-600 bg-gray-700" : "border-gray-200 bg-gray-50"}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={`${suggestion.category === "custom" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"}`}
                >
                  {suggestion.type}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  AI Generated
                </Badge>
                {suggestion.prompt && (
                  <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700">
                    Custom
                  </Badge>
                )}
              </div>
              <Button
                size="sm"
                onClick={() => handleUseText(suggestion)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Sparkles className="w-4 h-4 mr-1" />
                Use This
              </Button>
            </div>
            {suggestion.prompt && (
              <div
                className={`text-xs p-2 rounded ${isDarkMode ? "bg-gray-600 text-gray-300" : "bg-purple-100 text-purple-700"}`}
              >
                <strong>Your prompt:</strong> {suggestion.prompt}
              </div>
            )}
            <div
              className={`p-3 rounded border-l-4 ${suggestion.category === "custom" ? "border-purple-500" : "border-blue-500"} ${isDarkMode ? "bg-gray-600" : "bg-white"}`}
            >
              <p
                className={`text-sm leading-relaxed whitespace-pre-line ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
              >
                {suggestion.content}
              </p>
            </div>
          </div>
        ))}

        {/* Tips Section */}
        <div
          className={`p-4 rounded-lg border ${isDarkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}
        >
          <h4 className={`font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>💡 Pro Resume Tips</h4>
          <ul className={`text-sm space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            <li>
              • <strong>Quantify achievements:</strong> Use numbers, percentages, and dollar amounts
            </li>
            <li>
              • <strong>Action verbs:</strong> Start bullet points with strong action words (Led, Developed, Increased)
            </li>
            <li>
              • <strong>Keywords:</strong> Include industry-specific terms from job descriptions
            </li>
            <li>
              • <strong>Tailor content:</strong> Customize your resume for each job application
            </li>
            <li>
              • <strong>Keep it concise:</strong> Aim for 1-2 pages maximum
            </li>
            <li>
              • <strong>Proofread:</strong> Check for spelling and grammar errors
            </li>
            <li>
              • <strong>Save multiple versions:</strong> Use the Save/Load feature for different job types
            </li>
            <li>
              • <strong>PDF format:</strong> Always submit as PDF to preserve formatting
            </li>
          </ul>

          <div className="mt-4 pt-3 border-t border-gray-300">
            <h5 className={`font-medium mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>🎯 Next Steps</h5>
            <ul className={`text-sm space-y-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              <li>• Review and customize AI-generated content</li>
              <li>• Check your ATS score and implement suggestions</li>
              <li>• Save your resume data for future updates</li>
              <li>• Create multiple versions for different job types</li>
              <li>• Consider adding a cover letter for applications</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
