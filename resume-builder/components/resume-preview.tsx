"use client"

import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar, ExternalLink, Code } from "lucide-react"

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
    level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
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
    proficiency: "Basic" | "Conversational" | "Fluent" | "Native"
  }>
  awards: Array<{
    id: string
    title: string
    issuer: string
    date: string
    description?: string
  }>
}

interface ResumePreviewProps {
  data: ResumeData
  template: string
}

export function ResumePreview({ data, template }: ResumePreviewProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString + "-01")
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  const getSkillColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "bg-blue-600 text-white"
      case "Advanced":
        return "bg-blue-500 text-white"
      case "Intermediate":
        return "bg-slate-500 text-white"
      case "Beginner":
        return "bg-slate-400 text-white"
      default:
        return "bg-slate-400 text-white"
    }
  }

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case "Native":
        return "bg-blue-600 text-white"
      case "Fluent":
        return "bg-blue-500 text-white"
      case "Conversational":
        return "bg-slate-500 text-white"
      case "Basic":
        return "bg-slate-400 text-white"
      default:
        return "bg-slate-400 text-white"
    }
  }

  // Modern Professional Template
  if (template === "modern") {
    return (
      <div className="p-8 max-w-4xl mx-auto bg-white text-sm leading-relaxed print:p-0 print:max-w-none">
        {/* Header */}
        <div className="border-b-3 border-gray-900 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName || "Your Name"}</h1>
          <div className="grid grid-cols-2 gap-2 text-gray-600">
            {data.personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{data.personalInfo.location}</span>
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-blue-600" />
                <span className="text-xs">{data.personalInfo.linkedin}</span>
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="text-xs">{data.personalInfo.website}</span>
              </div>
            )}
            {data.personalInfo.github && (
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-blue-600" />
                <span className="text-xs">{data.personalInfo.github}</span>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {data.personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">Work Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id} className="border-l-3 border-blue-200 pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <span className="text-gray-600 text-sm flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="font-medium text-blue-600 mb-2">{exp.company}</p>
                  {exp.description && <p className="text-gray-600 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">Projects</h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id} className="border-l-3 border-slate-200 pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      {project.name}
                      {project.link && <ExternalLink className="w-3 h-3 text-blue-600" />}
                    </h3>
                    <span className="text-gray-600 text-sm">
                      {formatDate(project.startDate)} - {formatDate(project.endDate)}
                    </span>
                  </div>
                  <p className="text-blue-600 text-sm mb-1">{project.technologies}</p>
                  {project.description && <p className="text-gray-600 leading-relaxed">{project.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">Education</h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="border-l-3 border-slate-200 pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <span className="text-gray-600 text-sm">{formatDate(edu.graduationDate)}</span>
                  </div>
                  <p className="font-medium text-blue-600">{edu.institution}</p>
                  {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">Skills</h2>
            <div className="grid grid-cols-2 gap-2">
              {data.skills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                  <span className="font-medium">{skill.name}</span>
                  <Badge className={getSkillColor(skill.level)}>{skill.level}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">Certifications</h2>
            <div className="space-y-3">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="border-l-3 border-slate-200 pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                    <span className="text-gray-600 text-sm">{formatDate(cert.date)}</span>
                  </div>
                  <p className="font-medium text-blue-600">{cert.issuer}</p>
                  {cert.credentialId && <p className="text-gray-600 text-sm">ID: {cert.credentialId}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages & Awards in two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Languages */}
          {data.languages.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">Languages</h2>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex items-center justify-between">
                    <span className="font-medium">{lang.name}</span>
                    <Badge className={getProficiencyColor(lang.proficiency)}>{lang.proficiency}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Awards */}
          {data.awards.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">Awards</h2>
              <div className="space-y-3">
                {data.awards.map((award) => (
                  <div key={award.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900">{award.title}</h3>
                      <span className="text-gray-600 text-sm">{formatDate(award.date)}</span>
                    </div>
                    <p className="font-medium text-blue-600">{award.issuer}</p>
                    {award.description && <p className="text-gray-600 text-sm">{award.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Executive Template
  if (template === "executive") {
    return (
      <div className="p-8 max-w-4xl mx-auto bg-white text-sm leading-relaxed print:p-0 print:max-w-none">
        {/* Header */}
        <div className="text-center border-b-2 border-gray-900 pb-6 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{data.personalInfo.fullName || "Your Name"}</h1>
          <div className="flex justify-center flex-wrap gap-4 text-gray-600">
            {data.personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {data.personalInfo.email}
              </span>
            )}
            {data.personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {data.personalInfo.phone}
              </span>
            )}
            {data.personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {data.personalInfo.location}
              </span>
            )}
            {data.personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin className="w-4 h-4" />
                {data.personalInfo.linkedin}
              </span>
            )}
          </div>
        </div>

        {/* Executive Summary */}
        {data.personalInfo.summary && (
          <div className="mb-6 bg-slate-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">Executive Summary</h2>
            <p className="text-gray-700 leading-relaxed font-medium">{data.personalInfo.summary}</p>
          </div>
        )}

        {/* Professional Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">Professional Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-5 pb-4 border-b border-slate-200 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-blue-600 font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-gray-600 font-medium">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.description && <p className="text-gray-700">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {data.education.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">Education</h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-blue-600">{edu.institution}</p>
                  <p className="text-gray-600">{formatDate(edu.graduationDate)}</p>
                </div>
              ))}
            </div>
          )}

          {data.certifications.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">Certifications</h2>
              {data.certifications.map((cert) => (
                <div key={cert.id} className="mb-3">
                  <h3 className="font-bold text-gray-900">{cert.name}</h3>
                  <p className="text-blue-600">{cert.issuer}</p>
                  <p className="text-gray-600">{formatDate(cert.date)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">Core Competencies</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <Badge key={skill.id} className="bg-gray-900 text-white px-3 py-1">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Tech Specialist Template
  if (template === "tech") {
    return (
      <div className="p-8 max-w-4xl mx-auto bg-white text-sm leading-relaxed print:p-0 print:max-w-none">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-gray-900 text-white p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName || "Your Name"}</h1>
          <div className="grid grid-cols-2 gap-2 text-blue-100">
            {data.personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {data.personalInfo.email}
              </span>
            )}
            {data.personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {data.personalInfo.phone}
              </span>
            )}
            {data.personalInfo.github && (
              <span className="flex items-center gap-1">
                <Github className="w-4 h-4" />
                {data.personalInfo.github}
              </span>
            )}
            {data.personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin className="w-4 h-4" />
                {data.personalInfo.linkedin}
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        {data.personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-3 flex items-center gap-2">
              <Code className="w-5 h-5" />
              Technical Profile
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
          </div>
        )}

        {/* Technical Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-3">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded border-l-4 border-blue-600"
                >
                  <span className="font-medium">{skill.name}</span>
                  <Badge className={getSkillColor(skill.level)}>{skill.level}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-3">Projects</h2>
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    <span className="text-gray-600 text-sm">
                      {formatDate(project.startDate)} - {formatDate(project.endDate)}
                    </span>
                  </div>
                  <p className="text-blue-600 font-medium mb-2">{project.technologies}</p>
                  {project.description && <p className="text-gray-700">{project.description}</p>}
                  {project.link && (
                    <p className="text-blue-600 text-sm mt-2 flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      {project.link}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-3">Professional Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id} className="border-l-4 border-blue-200 pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <span className="text-gray-600 text-sm">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="font-medium text-blue-600 mb-2">{exp.company}</p>
                  {exp.description && <p className="text-gray-700">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.education.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-blue-600 mb-3">Education</h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-3 p-3 bg-slate-50 rounded">
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-blue-600">{edu.institution}</p>
                  <p className="text-gray-600 text-sm">{formatDate(edu.graduationDate)}</p>
                </div>
              ))}
            </div>
          )}

          {data.certifications.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-blue-600 mb-3">Certifications</h2>
              {data.certifications.map((cert) => (
                <div key={cert.id} className="mb-3 p-3 bg-slate-50 rounded">
                  <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                  <p className="text-blue-600">{cert.issuer}</p>
                  <p className="text-gray-600 text-sm">{formatDate(cert.date)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Default/Minimal template
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white text-sm leading-relaxed print:p-0 print:max-w-none">
      {/* Header */}
      <div className="text-center border-b pb-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName || "Your Name"}</h1>
        <div className="flex justify-center flex-wrap gap-3 text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2 uppercase tracking-wide">Summary</h2>
          <p className="text-gray-700">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold">{exp.position}</h3>
                <span className="text-gray-600">
                  {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                </span>
              </div>
              <p className="font-medium text-gray-700 mb-1">{exp.company}</p>
              {exp.description && <p className="text-gray-600">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-700">{edu.institution}</p>
                </div>
                <span className="text-gray-600">{formatDate(edu.graduationDate)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill.id} className="px-3 py-1 bg-slate-100 text-gray-700 rounded">
                {skill.name} ({skill.level})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Projects</h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-4">
              <h3 className="font-semibold">{project.name}</h3>
              <p className="text-gray-600 text-sm">{project.technologies}</p>
              {project.description && <p className="text-gray-700">{project.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Additional sections in grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Certifications</h2>
            {data.certifications.map((cert) => (
              <div key={cert.id} className="mb-2">
                <h3 className="font-medium text-sm">{cert.name}</h3>
                <p className="text-gray-600 text-xs">{cert.issuer}</p>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Languages</h2>
            {data.languages.map((lang) => (
              <div key={lang.id} className="mb-1">
                <span className="font-medium text-sm">{lang.name}</span>
                <span className="text-gray-600 text-xs"> - {lang.proficiency}</span>
              </div>
            ))}
          </div>
        )}

        {/* Awards */}
        {data.awards.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide">Awards</h2>
            {data.awards.map((award) => (
              <div key={award.id} className="mb-2">
                <h3 className="font-medium text-sm">{award.title}</h3>
                <p className="text-gray-600 text-xs">{award.issuer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
