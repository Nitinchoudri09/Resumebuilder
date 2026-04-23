"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Plus, Trash2, Sparkles, RefreshCw, Sun, Moon } from "lucide-react"
import { ResumePreview } from "@/components/resume-preview"
import { ATSAnalyzer } from "@/components/ats-analyzer"
import { AISuggestions } from "@/components/ai-suggestions"

interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
  current: boolean
}

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  graduationDate: string
  gpa?: string
}

interface Skill {
  id: string
  name: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
}

interface Project {
  id: string
  name: string
  description: string
  technologies: string
  link?: string
  startDate: string
  endDate: string
}

interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  expiryDate?: string
  credentialId?: string
}

interface Language {
  id: string
  name: string
  proficiency: "Basic" | "Conversational" | "Fluent" | "Native"
}

interface Award {
  id: string
  title: string
  issuer: string
  date: string
  description?: string
}

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
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  certifications: Certification[]
  languages: Language[]
  awards: Award[]
}

export default function ResumeBuilder() {
  const searchParams = useSearchParams()
  const template = searchParams.get("template") || "modern"
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode
  const [showAISuggestions, setShowAISuggestions] = useState(false)

  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
      github: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    awards: [],
  })

  const [activeTab, setActiveTab] = useState("personal")

  const handleAITextUpdate = (field: string, value: string, itemId?: string) => {
    if (field === "summary") {
      setResumeData((prev) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, summary: value },
      }))
    } else if (field === "experience" && itemId) {
      setResumeData((prev) => ({
        ...prev,
        experience: prev.experience.map((exp) => (exp.id === itemId ? { ...exp, description: value } : exp)),
      }))
    } else if (field === "project" && itemId) {
      setResumeData((prev) => ({
        ...prev,
        projects: prev.projects.map((project) =>
          project.id === itemId ? { ...project, description: value } : project,
        ),
      }))
    } else if (field === "skills") {
      const skillsArray = value.split(", ").map((skillName, index) => ({
        id: (Date.now() + index).toString(),
        name: skillName.trim(),
        level: "Intermediate" as const,
      }))
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, ...skillsArray],
      }))
    } else if (field === "award" && itemId) {
      setResumeData((prev) => ({
        ...prev,
        awards: prev.awards.map((award) => (award.id === itemId ? { ...award, description: value } : award)),
      }))
    }
  }

  const generateAISummary = () => {
    const summaryExamples = [
      "Results-driven professional with 5+ years of experience in software development and project management. Proven track record of delivering high-quality solutions that increase efficiency by 30% and reduce costs. Skilled in leading cross-functional teams and implementing innovative technologies.",
      "Dynamic marketing specialist with expertise in digital campaigns and brand management. Successfully increased brand awareness by 40% and generated $2M+ in revenue through strategic marketing initiatives. Passionate about data-driven decision making and customer engagement.",
      "Experienced financial analyst with strong analytical skills and attention to detail. Demonstrated ability to identify cost-saving opportunities worth $500K+ annually. Proficient in financial modeling, forecasting, and risk assessment across multiple industries.",
      "Innovative product manager with 7+ years of experience driving product strategy and development. Led cross-functional teams to launch 12+ successful products, resulting in 45% revenue growth. Expert in agile methodologies, user research, and market analysis.",
      "Strategic business consultant with expertise in operational excellence and digital transformation. Helped 20+ companies optimize processes, resulting in average cost savings of 25%. Specialized in change management, process improvement, and stakeholder engagement.",
      "Creative UX/UI designer with passion for user-centered design and emerging technologies. Designed intuitive interfaces for 50+ digital products, improving user satisfaction by 60%. Proficient in design thinking, prototyping, and usability testing.",
    ]

    const randomSummary = summaryExamples[Math.floor(Math.random() * summaryExamples.length)]
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, summary: randomSummary },
    }))
  }

  const generateAIJobDescription = (experienceId: string) => {
    const jobDescriptions = [
      "• Led a team of 8 developers to deliver 15+ projects on time and under budget, resulting in 25% increase in client satisfaction\n• Implemented agile methodologies that improved development efficiency by 40% and reduced time-to-market by 30%\n• Collaborated with stakeholders to define requirements and ensure alignment with business objectives",
      "• Developed and executed comprehensive marketing strategies that increased lead generation by 60% and conversion rates by 35%\n• Managed social media campaigns across 5 platforms, growing follower base by 150% and engagement by 80%\n• Analyzed market trends and competitor activities to identify new opportunities worth $1M+ in potential revenue",
      "• Conducted financial analysis and modeling for investment decisions totaling $50M+ in capital allocation\n• Streamlined reporting processes, reducing monthly close time by 5 days and improving accuracy by 95%\n• Presented findings to C-level executives and board members, influencing strategic business decisions",
      "• Designed and launched 8 mobile applications with over 100K downloads and 4.5+ star ratings\n• Optimized application performance, reducing load times by 50% and increasing user retention by 35%\n• Mentored junior developers and established coding standards that improved code quality by 40%",
      "• Managed product roadmap for SaaS platform serving 10,000+ users, increasing customer satisfaction by 45%\n• Conducted user research and A/B testing to validate features, resulting in 25% increase in user engagement\n• Coordinated with engineering, design, and marketing teams to deliver 20+ feature releases",
      "• Created brand identity and marketing materials for 30+ clients, generating $2.5M in new business\n• Increased website conversion rates by 55% through strategic UX improvements and content optimization\n• Managed creative campaigns that achieved 200% ROI and won 3 industry awards",
    ]

    const randomJobDesc = jobDescriptions[Math.floor(Math.random() * jobDescriptions.length)]
    updateExperience(experienceId, "description", randomJobDesc)
  }

  const generateAIProjectDescription = (projectId: string) => {
    const projectDescriptions = [
      "Developed a full-stack e-commerce platform using React and Node.js, serving 10,000+ users with 99.9% uptime. Implemented secure payment processing and real-time inventory management, resulting in 40% increase in sales conversion.",
      "Built a machine learning model for predictive analytics that improved forecasting accuracy by 35%. Processed 1M+ data points daily and created interactive dashboards for stakeholders, leading to $500K cost savings.",
      "Created a mobile-first responsive web application with React Native, achieving 4.8-star rating on app stores. Integrated social authentication and push notifications, increasing user engagement by 60%.",
      "Designed and implemented a microservices architecture using Docker and Kubernetes, reducing deployment time by 70%. Established CI/CD pipelines that improved code quality and reduced bugs by 45%.",
      "Developed an AI-powered chatbot using natural language processing, handling 80% of customer inquiries automatically. Reduced response time from 24 hours to 2 minutes, improving customer satisfaction by 50%.",
      "Built a data visualization dashboard using D3.js and Python, processing real-time analytics for executive decision-making. Enabled data-driven insights that increased operational efficiency by 25%.",
    ]

    const randomProjectDesc = projectDescriptions[Math.floor(Math.random() * projectDescriptions.length)]
    updateProject(projectId, "description", randomProjectDesc)
  }

  const generateAISkills = () => {
    const skillSets = [
      ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker", "Git", "MongoDB", "TypeScript", "GraphQL"],
      [
        "Digital Marketing",
        "SEO/SEM",
        "Google Analytics",
        "Social Media",
        "Content Strategy",
        "Email Marketing",
        "A/B Testing",
        "CRM",
        "HubSpot",
        "Salesforce",
      ],
      [
        "Financial Analysis",
        "Excel",
        "SQL",
        "Tableau",
        "Risk Management",
        "Budgeting",
        "Forecasting",
        "PowerBI",
        "Python",
        "R",
      ],
      [
        "Project Management",
        "Scrum",
        "Leadership",
        "Communication",
        "Problem Solving",
        "Team Building",
        "Strategic Planning",
        "Process Improvement",
        "Jira",
        "Confluence",
      ],
      [
        "UX/UI Design",
        "Figma",
        "Adobe Creative Suite",
        "Prototyping",
        "User Research",
        "Wireframing",
        "Design Systems",
        "Usability Testing",
        "Sketch",
        "InVision",
      ],
      [
        "Data Science",
        "Machine Learning",
        "Python",
        "R",
        "SQL",
        "Tableau",
        "TensorFlow",
        "Pandas",
        "Statistics",
        "Data Visualization",
      ],
    ]

    const randomSkillSet = skillSets[Math.floor(Math.random() * skillSets.length)]
    const newSkills = randomSkillSet.map((skillName, index) => ({
      id: (Date.now() + index).toString(),
      name: skillName,
      level: ["Intermediate", "Advanced", "Expert"][Math.floor(Math.random() * 3)] as
        | "Intermediate"
        | "Advanced"
        | "Expert",
    }))

    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, ...newSkills],
    }))
  }

  const generateAIAwardDescription = (awardId: string) => {
    const awardDescriptions = [
      "Recognized for outstanding performance and leadership in driving team success, resulting in 25% increase in productivity and exceptional client satisfaction ratings.",
      "Awarded for innovative solution that streamlined operations and saved the company $200K annually while improving customer experience and team efficiency.",
      "Honored for exceptional contribution to product development, leading to successful launch of flagship product that generated $1M+ in first-year revenue.",
      "Received recognition for mentoring junior team members and establishing best practices that improved code quality and reduced development time by 30%.",
      "Acknowledged for outstanding customer service excellence, maintaining 98% satisfaction rating and resolving complex issues with creative solutions.",
      "Recognized for leadership in digital transformation initiative that modernized legacy systems and improved operational efficiency by 40%.",
    ]

    const randomAwardDesc = awardDescriptions[Math.floor(Math.random() * awardDescriptions.length)]
    updateAward(awardId, "description", randomAwardDesc)
  }

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    }
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }))
  }

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
  }

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      graduationDate: "",
      gpa: "",
    }
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }))
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }))
  }

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      level: "Intermediate",
    }
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }))
  }

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill)),
    }))
  }

  const removeSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }))
  }

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: "",
      link: "",
      startDate: "",
      endDate: "",
    }
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }))
  }

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((project) => (project.id === id ? { ...project, [field]: value } : project)),
    }))
  }

  const removeProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((project) => project.id !== id),
    }))
  }

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: "",
      expiryDate: "",
      credentialId: "",
    }
    setResumeData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCert],
    }))
  }

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)),
    }))
  }

  const removeCertification = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id),
    }))
  }

  const addLanguage = () => {
    const newLang: Language = {
      id: Date.now().toString(),
      name: "",
      proficiency: "Conversational",
    }
    setResumeData((prev) => ({
      ...prev,
      languages: [...prev.languages, newLang],
    }))
  }

  const updateLanguage = (id: string, field: keyof Language, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)),
    }))
  }

  const removeLanguage = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang.id !== id),
    }))
  }

  const addAward = () => {
    const newAward: Award = {
      id: Date.now().toString(),
      title: "",
      issuer: "",
      date: "",
      description: "",
    }
    setResumeData((prev) => ({
      ...prev,
      awards: [...prev.awards, newAward],
    }))
  }

  const updateAward = (id: string, field: keyof Award, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      awards: prev.awards.map((award) => (award.id === id ? { ...award, [field]: value } : award)),
    }))
  }

  const removeAward = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      awards: prev.awards.filter((award) => award.id !== id),
    }))
  }

  const handleDownload = () => {
    const printContent = document.getElementById("resume-preview")
    if (printContent) {
      // Clone the content to avoid modifying the original
      const clonedContent = printContent.cloneNode(true) as HTMLElement

      // Remove any v0 links or watermarks
      const v0Links = clonedContent.querySelectorAll('a[href*="v0.dev"], a[href*="vercel.ai"]')
      v0Links.forEach((link) => link.remove())

      // Remove any elements with v0-related classes or text
      const v0Elements = clonedContent.querySelectorAll('[class*="v0"], [data-v0]')
      v0Elements.forEach((element) => element.remove())

      // Remove any text nodes containing v0 references
      const walker = document.createTreeWalker(clonedContent, NodeFilter.SHOW_TEXT, null)

      const textNodesToRemove: Node[] = []
      let node
      while ((node = walker.nextNode())) {
        if (
          node.textContent &&
          (node.textContent.includes("v0.dev") ||
            node.textContent.includes("vercel.ai") ||
            node.textContent.includes("Generated by v0") ||
            node.textContent.includes("Powered by v0"))
        ) {
          textNodesToRemove.push(node)
        }
      }

      textNodesToRemove.forEach((node) => {
        if (node.parentNode) {
          node.parentNode.removeChild(node)
        }
      })

      // Create a clean HTML document for printing
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>${resumeData.personalInfo.fullName || "Resume"} - Resume</title>
            <style>
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                margin: 0;
                padding: 20px;
                background: white;
                color: black;
                line-height: 1.5;
              }
              @media print {
                body { padding: 0; }
                .no-print { display: none !important; }
              }
              * { box-sizing: border-box; }
            </style>
          </head>
          <body>
            ${clonedContent.innerHTML}
          </body>
          </html>
        `)
        printWindow.document.close()

        // Wait for content to load then print
        setTimeout(() => {
          printWindow.print()
          printWindow.close()
        }, 500)
      }
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Prep2Hire Resume Builder
            </h1>
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Template: <span className="font-medium text-blue-600">{template}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`border-gray-300 ${isDarkMode ? "text-white hover:bg-gray-800 border-gray-600" : "text-gray-700 hover:bg-gray-100"}`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowAISuggestions(!showAISuggestions)}
              className={`${isDarkMode ? "border-blue-400 text-blue-400 hover:bg-blue-900/20" : "border-blue-200 text-blue-700 hover:bg-blue-50"}`}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {showAISuggestions ? "Hide AI Assistant" : "Show AI Assistant"}
            </Button>
            <Button
              variant="outline"
              onClick={handleDownload}
              className={`${isDarkMode ? "border-green-400 text-green-400 hover:bg-green-900/20" : "border-green-200 text-green-700 hover:bg-green-50"}`}
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <div className="flex gap-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const resumeText = JSON.stringify(resumeData, null, 2)
                  const blob = new Blob([resumeText], { type: "application/json" })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement("a")
                  a.href = url
                  a.download = `${resumeData.personalInfo.fullName || "resume"}-data.json`
                  a.click()
                  URL.revokeObjectURL(url)
                }}
                className={`${isDarkMode ? "border-yellow-400 text-yellow-400 hover:bg-yellow-900/20" : "border-yellow-200 text-yellow-700 hover:bg-yellow-50"}`}
              >
                💾 Save Data
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const input = document.createElement("input")
                  input.type = "file"
                  input.accept = ".json"
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onload = (e) => {
                        try {
                          const data = JSON.parse(e.target?.result as string)
                          setResumeData(data)
                        } catch (error) {
                          alert("Invalid file format")
                        }
                      }
                      reader.readAsText(file)
                    }
                  }
                  input.click()
                }}
                className={`${isDarkMode ? "border-green-400 text-green-400 hover:bg-green-900/20" : "border-green-200 text-green-700 hover:bg-green-50"}`}
              >
                📁 Load Data
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList
                className={`grid w-full grid-cols-4 lg:grid-cols-8 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
              >
                <TabsTrigger
                  value="personal"
                  className={`data-[state=active]:bg-blue-600 data-[state=active]:text-white ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"}`}
                >
                  Personal
                </TabsTrigger>
                <TabsTrigger
                  value="experience"
                  className={`data-[state=active]:bg-blue-600 data-[state=active]:text-white ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"}`}
                >
                  Experience
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className={`data-[state=active]:bg-blue-600 data-[state=active]:text-white ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"}`}
                >
                  Education
                </TabsTrigger>
                <TabsTrigger
                  value="skills"
                  className={`data-[state=active]:bg-blue-600 data-[state=active]:text-white ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"}`}
                >
                  Skills
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className={`data-[state=active]:bg-blue-600 data-[state=active]:text-white ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"}`}
                >
                  Projects
                </TabsTrigger>
                <TabsTrigger
                  value="certifications"
                  className={`data-[state=active]:bg-blue-600 data-[state=active]:text-white ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"}`}
                >
                  Certs
                </TabsTrigger>
                <TabsTrigger
                  value="languages"
                  className={`data-[state=active]:bg-blue-600 data-[state=active]:text-white ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"}`}
                >
                  Languages
                </TabsTrigger>
                <TabsTrigger
                  value="awards"
                  className={`data-[state=active]:bg-blue-600 data-[state=active]:text-white ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"}`}
                >
                  Awards
                </TabsTrigger>
              </TabsList>

              {/* Personal Information */}
              <TabsContent value="personal">
                <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                  <CardHeader>
                    <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName" className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                          Full Name
                        </Label>
                        <Input
                          id="fullName"
                          value={resumeData.personalInfo.fullName}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, fullName: e.target.value },
                            }))
                          }
                          placeholder="John Doe"
                          className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={resumeData.personalInfo.email}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, email: e.target.value },
                            }))
                          }
                          placeholder="john@example.com"
                          className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          value={resumeData.personalInfo.phone}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, phone: e.target.value },
                            }))
                          }
                          placeholder="+1 (555) 123-4567"
                          className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location" className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                          Location
                        </Label>
                        <Input
                          id="location"
                          value={resumeData.personalInfo.location}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, location: e.target.value },
                            }))
                          }
                          placeholder="New York, NY"
                          className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin" className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                          LinkedIn
                        </Label>
                        <Input
                          id="linkedin"
                          value={resumeData.personalInfo.linkedin}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, linkedin: e.target.value },
                            }))
                          }
                          placeholder="linkedin.com/in/johndoe"
                          className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                        />
                      </div>
                      <div>
                        <Label htmlFor="website" className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                          Website
                        </Label>
                        <Input
                          id="website"
                          value={resumeData.personalInfo.website}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, website: e.target.value },
                            }))
                          }
                          placeholder="johndoe.com"
                          className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="github" className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                          GitHub
                        </Label>
                        <Input
                          id="github"
                          value={resumeData.personalInfo.github}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, github: e.target.value },
                            }))
                          }
                          placeholder="github.com/johndoe"
                          className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="summary" className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                          Professional Summary
                        </Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={generateAISummary}
                          className={`${isDarkMode ? "border-blue-400 text-blue-400 hover:bg-blue-900/20" : "border-blue-200 text-blue-600 hover:bg-blue-50"}`}
                        >
                          <Sparkles className="w-4 h-4 mr-1" />
                          AI Suggest
                        </Button>
                      </div>
                      <Textarea
                        id="summary"
                        value={resumeData.personalInfo.summary}
                        onChange={(e) =>
                          setResumeData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, summary: e.target.value },
                          }))
                        }
                        placeholder="Brief professional summary highlighting your key achievements and skills..."
                        rows={4}
                        className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Experience */}
              <TabsContent value="experience">
                <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>Work Experience</CardTitle>
                      <Button onClick={addExperience} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <div
                        key={exp.id}
                        className={`border rounded-lg p-4 space-y-4 ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            Experience {index + 1}
                          </h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeExperience(exp.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Company</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                              placeholder="Company Name"
                              className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                            />
                          </div>
                          <div>
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Position</Label>
                            <Input
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                              placeholder="Job Title"
                              className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                            />
                          </div>
                          <div>
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Start Date</Label>
                            <Input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                              className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                            />
                          </div>
                          <div>
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>End Date</Label>
                            <Input
                              type="month"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                              disabled={exp.current}
                              className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`current-${exp.id}`}
                            checked={exp.current}
                            onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                            className="text-blue-600"
                          />
                          <Label
                            htmlFor={`current-${exp.id}`}
                            className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                          >
                            Currently working here
                          </Label>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Description</Label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => generateAIJobDescription(exp.id)}
                              className={`${isDarkMode ? "border-blue-400 text-blue-400 hover:bg-blue-900/20" : "border-blue-200 text-blue-600 hover:bg-blue-50"}`}
                            >
                              <Sparkles className="w-4 h-4 mr-1" />
                              AI Suggest
                            </Button>
                          </div>
                          <Textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                            placeholder="Describe your responsibilities and achievements..."
                            rows={3}
                            className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                          />
                        </div>
                      </div>
                    ))}
                    {resumeData.experience.length === 0 && (
                      <div className={`text-center py-8 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        No experience added yet. Click "Add Experience" to get started.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Education */}
              <TabsContent value="education">
                <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>Education</CardTitle>
                      <Button onClick={addEducation} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Education
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.education.map((edu, index) => (
                      <div
                        key={edu.id}
                        className={`border rounded-lg p-4 space-y-4 ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            Education {index + 1}
                          </h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeEducation(edu.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Institution</Label>
                            <Input
                              value={edu.institution}
                              onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                              placeholder="University Name"
                              className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                            />
                          </div>
                          <div>
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Degree</Label>
                            <Input
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                              placeholder="Bachelor's, Master's, etc."
                              className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                            />
                          </div>
                          <div>
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Field of Study</Label>
                            <Input
                              value={edu.field}
                              onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                              placeholder="Computer Science, Business, etc."
                              className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                            />
                          </div>
                          <div>
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Graduation Date</Label>
                            <Input
                              type="month"
                              value={edu.graduationDate}
                              onChange={(e) => updateEducation(edu.id, "graduationDate", e.target.value)}
                              className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                            />
                          </div>
                          <div>
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>GPA (Optional)</Label>
                            <Input
                              value={edu.gpa || ""}
                              onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                              placeholder="3.8/4.0"
                              className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    {resumeData.education.length === 0 && (
                      <div className={`text-center py-8 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        No education added yet. Click "Add Education" to get started.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Skills */}
              <TabsContent value="skills">
                <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>Skills</CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={generateAISkills}
                          className={`${isDarkMode ? "border-blue-400 text-blue-400 hover:bg-blue-900/20" : "border-blue-200 text-blue-600 hover:bg-blue-50"}`}
                        >
                          <Sparkles className="w-4 h-4 mr-1" />
                          AI Generate
                        </Button>
                        <Button onClick={addSkill} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Skill
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resumeData.skills.map((skill, index) => (
                      <div
                        key={skill.id}
                        className={`flex items-center gap-4 p-3 border rounded-lg ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}
                      >
                        <div className="flex-1">
                          <Input
                            value={skill.name}
                            onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                            placeholder="Skill name (e.g., JavaScript, Project Management)"
                            className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                          />
                        </div>
                        <div className="w-32">
                          <select
                            value={skill.level}
                            onChange={(e) => updateSkill(skill.id, "level", e.target.value)}
                            className={`w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                          </select>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeSkill(skill.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {resumeData.skills.length === 0 && (
                      <div className={`text-center py-8 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        No skills added yet. Click "Add Skill" or "AI Generate" to get started.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Projects */}
              <TabsContent value="projects">
                <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>Projects</CardTitle>
                      <Button onClick={addProject} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.projects.map((project, index) => (
                      <div
                        key={project.id}
                        className={`border rounded-lg p-4 space-y-4 ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            Project {index + 1}
                          </h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeProject(project.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Project Name</Label>
                            <Input
                              value={project.name}
                              onChange={(e) => updateProject(project.id, "name", e.target.value)}
                              placeholder="Project Name"
                              className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                            />
                          </div>
                          <div>
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Technologies</Label>
                            <Input
                              value={project.technologies}
                              onChange={(e) => updateProject(project.id, "technologies", e.target.value)}
                              placeholder="React, Node.js, MongoDB"
                              className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                            />
                          </div>
                          <div>
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Start Date</Label>
                            <Input
                              type="month"
                              value={project.startDate}
                              onChange={(e) => updateProject(project.id, "startDate", e.target.value)}
                              className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                            />
                          </div>
                          <div>
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>End Date</Label>
                            <Input
                              type="month"
                              value={project.endDate}
                              onChange={(e) => updateProject(project.id, "endDate", e.target.value)}
                              className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                              Project Link (Optional)
                            </Label>
                            <Input
                              value={project.link || ""}
                              onChange={(e) => updateProject(project.id, "link", e.target.value)}
                              placeholder="https://github.com/username/project"
                              className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Description</Label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => generateAIProjectDescription(project.id)}
                              className={`${isDarkMode ? "border-blue-400 text-blue-400 hover:bg-blue-900/20" : "border-blue-200 text-blue-600 hover:bg-blue-50"}`}
                            >
                              <Sparkles className="w-4 h-4 mr-1" />
                              AI Suggest
                            </Button>
                          </div>
                          <Textarea
                            value={project.description}
                            onChange={(e) => updateProject(project.id, "description", e.target.value)}
                            placeholder="Describe the project, your role, and key achievements..."
                            rows={3}
                            className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                          />
                        </div>
                      </div>
                    ))}
                    {resumeData.projects.length === 0 && (
                      <div className={`text-center py-8 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        No projects added yet. Click "Add Project" to get started.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Certifications */}
              <TabsContent value="certifications">
                <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>Certifications</CardTitle>
                      <Button onClick={addCertification} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Certification
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.certifications.map((cert, index) => (
                      <div
                        key={cert.id}
                        className={`border rounded-lg p-4 space-y-4 ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            Certification {index + 1}
                          </h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeCertification(cert.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Certification Name</Label>
                            <Input
                              value={cert.name}
                              onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                              placeholder="AWS Certified Solutions Architect"
                              className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                            />
                          </div>
                          <div>
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                              Issuing Organization
                            </Label>
                            <Input
                              value={cert.issuer}
                              onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)}
                              placeholder="Amazon Web Services"
                              className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                            />
                          </div>
                          <div>
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Issue Date</Label>
                            <Input
                              type="month"
                              value={cert.date}
                              onChange={(e) => updateCertification(cert.id, "date", e.target.value)}
                              className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                            />
                          </div>
                          <div>
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                              Expiry Date (Optional)
                            </Label>
                            <Input
                              type="month"
                              value={cert.expiryDate || ""}
                              onChange={(e) => updateCertification(cert.id, "expiryDate", e.target.value)}
                              className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                              Credential ID (Optional)
                            </Label>
                            <Input
                              value={cert.credentialId || ""}
                              onChange={(e) => updateCertification(cert.id, "credentialId", e.target.value)}
                              placeholder="ABC123456789"
                              className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    {resumeData.certifications.length === 0 && (
                      <div className={`text-center py-8 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        No certifications added yet. Click "Add Certification" to get started.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Languages */}
              <TabsContent value="languages">
                <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>Languages</CardTitle>
                      <Button onClick={addLanguage} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Language
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resumeData.languages.map((lang, index) => (
                      <div
                        key={lang.id}
                        className={`flex items-center gap-4 p-3 border rounded-lg ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}
                      >
                        <div className="flex-1">
                          <Input
                            value={lang.name}
                            onChange={(e) => updateLanguage(lang.id, "name", e.target.value)}
                            placeholder="Language name (e.g., Spanish, Mandarin)"
                            className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                          />
                        </div>
                        <div className="w-32">
                          <select
                            value={lang.proficiency}
                            onChange={(e) => updateLanguage(lang.id, "proficiency", e.target.value)}
                            className={`w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                          >
                            <option value="Basic">Basic</option>
                            <option value="Conversational">Conversational</option>
                            <option value="Fluent">Fluent</option>
                            <option value="Native">Native</option>
                          </select>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeLanguage(lang.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {resumeData.languages.length === 0 && (
                      <div className={`text-center py-8 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        No languages added yet. Click "Add Language" to get started.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Awards */}
              <TabsContent value="awards">
                <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>
                        Awards & Achievements
                      </CardTitle>
                      <Button onClick={addAward} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Award
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.awards.map((award, index) => (
                      <div
                        key={award.id}
                        className={`border rounded-lg p-4 space-y-4 ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            Award {index + 1}
                          </h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeAward(award.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Award Title</Label>
                            <Input
                              value={award.title}
                              onChange={(e) => updateAward(award.id, "title", e.target.value)}
                              placeholder="Employee of the Year"
                              className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                            />
                          </div>
                          <div>
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                              Issuing Organization
                            </Label>
                            <Input
                              value={award.issuer}
                              onChange={(e) => updateAward(award.id, "issuer", e.target.value)}
                              placeholder="Company Name / Organization"
                              className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                            />
                          </div>
                          <div>
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Date Received</Label>
                            <Input
                              type="month"
                              value={award.date}
                              onChange={(e) => updateAward(award.id, "date", e.target.value)}
                              className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                              Description (Optional)
                            </Label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => generateAIAwardDescription(award.id)}
                              className={`${isDarkMode ? "border-blue-400 text-blue-400 hover:bg-blue-900/20" : "border-blue-200 text-blue-600 hover:bg-blue-50"}`}
                            >
                              <Sparkles className="w-4 h-4 mr-1" />
                              AI Suggest
                            </Button>
                          </div>
                          <Textarea
                            value={award.description || ""}
                            onChange={(e) => updateAward(award.id, "description", e.target.value)}
                            placeholder="Brief description of the achievement..."
                            rows={2}
                            className={`border-gray-300 focus:border-blue-500 ${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white"}`}
                          />
                        </div>
                      </div>
                    ))}
                    {resumeData.awards.length === 0 && (
                      <div className={`text-center py-8 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        No awards added yet. Click "Add Award" to get started.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* ATS Analyzer */}
            <ATSAnalyzer resumeData={resumeData} isDarkMode={isDarkMode} />

            {/* AI Suggestions - Only show when button is clicked */}
            {showAISuggestions && (
              <AISuggestions resumeData={resumeData} onUpdateText={handleAITextUpdate} isDarkMode={isDarkMode} />
            )}
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-6">
            <Card className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <RefreshCw className="w-5 h-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white" id="resume-preview">
                  <ResumePreview data={resumeData} template={template} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
