"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Briefcase, GraduationCap, Code, Heart, Building, Award, Globe } from "lucide-react"
import Link from "next/link"

const templates = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean and contemporary design perfect for tech and business roles",
    icon: <Briefcase className="w-6 h-6" />,
    preview: "/placeholder.svg?height=300&width=200",
    category: "Professional",
    atsScore: 98,
  },
  {
    id: "executive",
    name: "Executive Leadership",
    description: "Sophisticated design for senior management positions",
    icon: <Building className="w-6 h-6" />,
    preview: "/placeholder.svg?height=300&width=200",
    category: "Executive",
    atsScore: 96,
  },
  {
    id: "tech",
    name: "Tech Specialist",
    description: "Developer-focused layout with emphasis on technical skills",
    icon: <Code className="w-6 h-6" />,
    preview: "/placeholder.svg?height=300&width=200",
    category: "Technology",
    atsScore: 97,
  },
  {
    id: "academic",
    name: "Academic Excellence",
    description: "Traditional format ideal for academic and research positions",
    icon: <GraduationCap className="w-6 h-6" />,
    preview: "/placeholder.svg?height=300&width=200",
    category: "Academic",
    atsScore: 95,
  },
  {
    id: "creative",
    name: "Creative Professional",
    description: "Balanced design for creative roles with professional appeal",
    icon: <Heart className="w-6 h-6" />,
    preview: "/placeholder.svg?height=300&width=200",
    category: "Creative",
    atsScore: 94,
  },
  {
    id: "minimal",
    name: "Minimal Clean",
    description: "Simple and elegant design that works for any industry",
    icon: <FileText className="w-6 h-6" />,
    preview: "/placeholder.svg?height=300&width=200",
    category: "Universal",
    atsScore: 99,
  },
  {
    id: "corporate",
    name: "Corporate Elite",
    description: "Professional design for finance and consulting roles",
    icon: <Award className="w-6 h-6" />,
    preview: "/placeholder.svg?height=300&width=200",
    category: "Corporate",
    atsScore: 97,
  },
  {
    id: "international",
    name: "Global Professional",
    description: "International format suitable for multinational companies",
    icon: <Globe className="w-6 h-6" />,
    preview: "/placeholder.svg?height=300&width=200",
    category: "International",
    atsScore: 96,
  },
]

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = [
    "All",
    "Professional",
    "Executive",
    "Technology",
    "Academic",
    "Creative",
    "Universal",
    "Corporate",
    "International",
  ]

  const filteredTemplates =
    selectedCategory === "All" ? templates : templates.filter((template) => template.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-gray-900 bg-clip-text text-transparent mb-4">
            Prep2Hire Resume Builder
          </h1>
          <a href="http://127.0.0.1:8000/" className="text-blue-600 hover:underline">
            Visit Prep2Hire
          </a>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create stunning, ATS-optimized resumes with our advanced builder. Choose from premium templates and get
            AI-powered suggestions to land your dream job.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`mb-2 ${
                selectedCategory === category
                  ? "bg-gray-900 hover:bg-gray-800 text-white"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-slate-200"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gray-100 rounded-lg text-gray-900">{template.icon}</div>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                      {template.category}
                    </Badge>
                  </div>
                  <Badge
                    className={`${
                      template.atsScore >= 97
                        ? "bg-green-100 text-green-800"
                        : template.atsScore >= 95
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    ATS {template.atsScore}%
                  </Badge>
                </div>
                <CardTitle className="text-lg text-gray-900">{template.name}</CardTitle>
                <CardDescription className="text-gray-600">{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[3/4] bg-gradient-to-br from-slate-100 to-blue-50 rounded-lg mb-4 overflow-hidden border">
                  <img
                    src={template.preview || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <Link href={`/builder?template=${template.id}`}>
                  <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">Use This Template</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-900" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Real-time Preview</h3>
            <p className="text-gray-600">See your resume update instantly as you type</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">ATS Optimization</h3>
            <p className="text-gray-600">Get suggestions to improve your ATS score</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">AI Suggestions</h3>
            <p className="text-gray-600">Get AI-powered content suggestions</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Premium Templates</h3>
            <p className="text-gray-600">Industry-specific professional designs</p>
          </div>
        </div>
      </div>
    </div>
  )
}
