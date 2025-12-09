import React from "react";
import { useLanguage } from "@/components/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Section, SectionTitle } from "@/components/Section";
import { cn } from "@/lib/utils";
import {
  Download,
  Leaf,
  ShieldCheck,
  FileText,
  Users,
  BarChart3,
  Search,
  Briefcase,
  GraduationCap,
  Mail,
  Linkedin,
  Phone,
  CheckCircle2,
  Calendar,
  Building2,
  Globe2,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Portfolio() {
  const { t, language } = useLanguage();

  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth <= 768;

    if (isMobile) {
      // Mobile: mở ứng dụng gọi điện
      window.location.href = "tel:+84387542402";
    } else {
      // Desktop: mở Zalo
      e.preventDefault();
      window.open(
        "https://zalo.me/0387542402",
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-esg-green/20">
      <Navigation />

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-gray-50 to-white pt-20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-esg-green/5 blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-esg-blue/5 blur-3xl rounded-full transform -translate-x-1/4 translate-y-1/4"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}>
              <span className="inline-block px-3 py-1 mb-6 text-sm font-semibold tracking-wider text-esg-green bg-esg-green/10 rounded-full uppercase">
                Portfolio
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                {t.hero.name}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light leading-relaxed max-w-2xl">
                {t.hero.title}
              </p>
              <p className="text-lg text-gray-500 mb-10 max-w-xl border-l-4 border-esg-blue pl-4 italic">
                "{t.hero.tagline}"
              </p>

              <a
                href="https://www.canva.com/design/DAG661GQQ8o/Jppyk4-hLRaF8vSzOOlw6A/edit?utm_content=DAG661GQQ8o&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-esg-green text-white rounded-lg font-medium hover:bg-esg-green/90 transition-all shadow-lg shadow-esg-green/20 hover:shadow-xl hover:-translate-y-1">
                <Download className="w-5 h-5" />
                {t.hero.cta}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center md:justify-end">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-esg-green/10 rounded-2xl transform rotate-2"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                  <img
                    src="/profile-photo.jpg"
                    alt={t.hero.name}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <Section id="about" className="bg-white">
        <SectionTitle>{t.about.title}</SectionTitle>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-lg text-gray-600 leading-relaxed space-y-4">
            <p>{t.about.summary}</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Leaf className="w-32 h-32 text-esg-green" />
            </div>
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
                <ShieldCheck className="w-8 h-8 text-esg-green mb-2" />
                <span className="text-sm font-medium text-center">
                  Compliance
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
                <Globe2 className="w-8 h-8 text-esg-blue mb-2" />
                <span className="text-sm font-medium text-center">
                  Sustainability
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
                <FileText className="w-8 h-8 text-orange-500 mb-2" />
                <span className="text-sm font-medium text-center">
                  Documentation
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
                <Users className="w-8 h-8 text-purple-500 mb-2" />
                <span className="text-sm font-medium text-center">
                  Collaboration
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" className="bg-gray-50/50">
        <SectionTitle>{t.skills.title}</SectionTitle>
        <div className="grid md:grid-cols-3 gap-8">
          {/* ESG Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-esg-green/30 transition-colors">
            <div className="w-12 h-12 bg-esg-green/10 rounded-xl flex items-center justify-center mb-6 text-esg-green">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {t.skills.categories.esg.title}
            </h3>
            <ul className="space-y-3">
              {t.skills.categories.esg.items.map((skill, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-600 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-esg-green shrink-0 mt-0.5" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Project Mgmt Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-esg-blue/30 transition-colors">
            <div className="w-12 h-12 bg-esg-blue/10 rounded-xl flex items-center justify-center mb-6 text-esg-blue">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {t.skills.categories.project.title}
            </h3>
            <ul className="space-y-3">
              {t.skills.categories.project.items.map((skill, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-600 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-esg-blue shrink-0 mt-0.5" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Research Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-500/30 transition-colors">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-6 text-orange-500">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {t.skills.categories.research.title}
            </h3>
            <ul className="space-y-3">
              {t.skills.categories.research.items.map((skill, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-600 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience" className="bg-white">
        <SectionTitle>{t.experience.title}</SectionTitle>
        <div className="space-y-12 relative before:absolute before:left-0 md:before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-gray-200 before:-ml-px">
          {t.experience.jobs.map((job, index) => (
            <div
              key={index}
              className="relative flex flex-col md:flex-row items-start group">
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-white border-4 border-esg-green rounded-full transform -translate-x-1.5 md:-translate-x-2 mt-1.5 z-10"></div>

              {/* Content */}
              <div
                className={cn(
                  "w-full md:w-1/2 pl-8 md:pl-0 md:pr-12",
                  index % 2 !== 0
                    ? "md:ml-auto md:pl-12 md:pr-0"
                    : "text-left md:text-right"
                )}>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group-hover:border-esg-green/20">
                  <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider text-esg-blue bg-esg-blue/10 rounded-full">
                    {job.period}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">
                    {job.role}
                  </h3>
                  <div
                    className={cn(
                      "flex items-center gap-2 text-gray-500 mb-4 text-sm font-medium",
                      index % 2 !== 0 ? "" : "md:justify-end"
                    )}>
                    <Building2 className="w-4 h-4" />
                    <span>{job.company}</span>
                  </div>
                  <ul
                    className={cn(
                      "space-y-2 text-gray-600 text-sm list-disc list-inside",
                      index % 2 !== 0 ? "" : "md:list-none"
                    )}>
                    {job.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" className="bg-gray-50">
        <SectionTitle>{t.projects.title}</SectionTitle>
        <div className="grid md:grid-cols-3 gap-8">
          {t.projects.items.map((project, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full">
              <div className="w-12 h-12 bg-esg-green/10 rounded-xl flex items-center justify-center mb-6 text-esg-green">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {project.title}
              </h3>
              <p className="text-gray-600 leading-relaxed flex-grow">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Education & Languages Grid */}
      <Section id="education" className="bg-white">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Education */}
          <div>
            <SectionTitle>{t.education.title}</SectionTitle>
            <div className="space-y-6">
              {t.education.items.map((edu, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-esg-blue/10 rounded-xl flex items-center justify-center shrink-0 text-esg-blue">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-600">{edu.school}</p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {edu.year}
                      </span>
                      <span className="font-semibold text-esg-green">
                        {edu.gpa}
                      </span>
                    </div>
                    {edu.achievement && (
                      <p className="mt-2 text-sm text-gray-600 italic">
                        {edu.achievement}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div id="languages">
            <SectionTitle>{t.languages.title}</SectionTitle>
            <div className="space-y-8">
              {t.languages.items.map((lang, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-gray-900">{lang.name}</span>
                    <span className="text-sm text-gray-500">{lang.level}</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percent}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-esg-green rounded-full"></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Certificates Section */}
      {t.certificates && t.certificates.items.length > 0 && (
        <Section id="certificates" className="bg-gray-50">
          <SectionTitle>{t.certificates.title}</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.certificates.items.map((cert, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4 text-orange-500 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {cert.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{cert.issuer}</p>
                {cert.date && (
                  <p className="text-xs text-gray-500 mb-3">{cert.date}</p>
                )}
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-esg-green hover:text-esg-green/80 font-medium mt-auto">
                    {language === "vi"
                      ? "Xem chứng chỉ →"
                      : "View Certificate →"}
                  </a>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Contact Section */}
      <Section id="contact" className="bg-gray-900 text-white mb-0 pb-15">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            {t.contact.title}
          </h2>
          <p className="text-gray-400 mb-12 text-lg">
            {language === "en"
              ? "Connect with me so we can build sustainable value together!"
              : "Hãy kết nối với tôi để có thể cùng nhau xây dựng giá trị bền vững!"}
          </p>

          <div className="space-y-6">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=vincentnguyentnt@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
              <Mail className="w-6 h-6 text-esg-green" />
              <span className="text-lg">vincentnguyentnt@gmail.com</span>
            </a>
            <a
              href="tel:+84387542402"
              onClick={handlePhoneClick}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
              <Phone className="w-6 h-6 text-esg-blue" />
              <span className="text-lg">+84 387 542 402</span>
            </a>
            <a
              href="https://www.linkedin.com/in/vinh-nguyen-viet-276490393/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
              <Linkedin className="w-6 h-6 text-[#0077b5]" />
              <span className="text-lg">
                linkedin.com/in/vinh-nguyen-viet-276490393
              </span>
            </a>
          </div>
        </div>
      </Section>

      <footer className="bg-gray-950 text-gray-500 py-4 text-center text-xs border-t border-gray-900">
        <p>© 2025 Nguyen Viet Vinh. All rights reserved.</p>
      </footer>
    </div>
  );
}
