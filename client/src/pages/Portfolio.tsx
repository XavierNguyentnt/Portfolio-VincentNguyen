import React from "react";
import { useLanguage } from "@/components/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Section, SectionTitle } from "@/components/Section";
import { LazyBackgroundImage } from "@/components/LazyBackgroundImage";
import { LazyPDFPreview } from "@/components/LazyPDFPreview";
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
  BookOpen,
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
    <div className="min-h-screen text-gray-800 font-sans selection:bg-esg-green/20 relative">
      {/* Background Image - Lazy Loaded */}
      <LazyBackgroundImage
        src="/bg-image.webp"
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed -z-10"
      />
      {/* Overlay for better readability */}
      <div className="fixed inset-0 w-full h-full bg-white/85 backdrop-blur-[1px] -z-10" />

      <Navigation />

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-[85vh] flex items-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-24 pb-16">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-esg-green/5 blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-esg-blue/5 blur-3xl rounded-full transform -translate-x-1/4 translate-y-1/4"></div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block px-4 py-2 mb-4 text-xs font-bold tracking-widest text-esg-green bg-esg-green/10 rounded-full uppercase border border-esg-green/20">
                Portfolio
              </motion.span>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-[1.1] tracking-tight"
                style={{
                  textShadow:
                    "0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)",
                }}>
                <span className="block mb-2">{t.hero.name.split(" ")[0]}</span>
                <span
                  className="block text-esg-green"
                  style={{
                    textShadow:
                      "0 2px 8px rgba(46, 125, 50, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1)",
                  }}>
                  {t.hero.name.split(" ").slice(1).join(" ")}
                </span>
              </h1>
              <p
                className="text-xl md:text-2xl lg:text-3xl text-gray-700 mb-6 font-medium leading-relaxed max-w-2xl"
                style={{
                  textShadow:
                    "0 1px 4px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)",
                }}>
                {t.hero.title}
              </p>
              <div className="border-l-4 border-esg-blue pl-6 py-2 my-8">
                <p
                  className="text-lg md:text-xl text-gray-600 italic leading-relaxed max-w-xl"
                  style={{ textShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}>
                  "{t.hero.tagline}"
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  href="https://www.canva.com/design/DAG661GQQ8o/Jppyk4-hLRaF8vSzOOlw6A/edit?utm_content=DAG661GQQ8o&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-esg-green text-white rounded-lg font-semibold hover:bg-esg-green/90 transition-all duration-300 shadow-lg shadow-esg-green/30 hover:shadow-xl hover:shadow-esg-green/40 hover:-translate-y-1 active:translate-y-0">
                  <Download className="w-5 h-5" />
                  <span>{t.hero.cta}</span>
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  href="/esg-learning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-esg-blue text-white rounded-lg font-semibold hover:bg-esg-blue/90 transition-all duration-300 shadow-lg shadow-esg-blue/30 hover:shadow-xl hover:shadow-esg-blue/40 hover:-translate-y-1 active:translate-y-0">
                  <BookOpen className="w-5 h-5" />
                  <span>Cùng tôi tìm hiểu về ESG</span>
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center md:justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-esg-green/20 to-esg-blue/20 rounded-3xl transform rotate-3 blur-xl"></div>
                <div className="absolute inset-0 bg-esg-green/10 rounded-3xl transform -rotate-2"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm">
                  <img
                    src="/profile-photo.jpg"
                    alt={t.hero.name}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <Section id="about" className="bg-white">
        <div className="text-center mb-16">
          <SectionTitle className="text-center">{t.about.title}</SectionTitle>
        </div>
        <div className="grid md:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-lg md:text-xl text-gray-700 leading-relaxed space-y-6">
            <p className="font-light">{t.about.summary}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-gray-50 to-white p-10 rounded-3xl border-2 border-gray-100 relative overflow-hidden group hover:shadow-2xl hover:border-esg-green/30 transition-all duration-300">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
              <Leaf className="w-40 h-40 text-esg-green" />
            </div>
            <div className="relative z-10 grid grid-cols-2 gap-6">
              <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-50">
                <div className="w-14 h-14 bg-esg-green/10 rounded-xl flex items-center justify-center mb-3">
                  <ShieldCheck className="w-7 h-7 text-esg-green" />
                </div>
                <span className="text-sm font-semibold text-center text-gray-800">
                  Compliance
                </span>
              </div>
              <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-50">
                <div className="w-14 h-14 bg-esg-blue/10 rounded-xl flex items-center justify-center mb-3">
                  <Globe2 className="w-7 h-7 text-esg-blue" />
                </div>
                <span className="text-sm font-semibold text-center text-gray-800">
                  Sustainability
                </span>
              </div>
              <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-50">
                <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-3">
                  <FileText className="w-7 h-7 text-orange-500" />
                </div>
                <span className="text-sm font-semibold text-center text-gray-800">
                  Documentation
                </span>
              </div>
              <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-50">
                <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-3">
                  <Users className="w-7 h-7 text-purple-500" />
                </div>
                <span className="text-sm font-semibold text-center text-gray-800">
                  Collaboration
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section
        id="skills"
        className="bg-gradient-to-b from-gray-50/50 to-white">
        <div className="text-center mb-16">
          <SectionTitle className="text-center">{t.skills.title}</SectionTitle>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* ESG Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-10 rounded-3xl shadow-lg border-2 border-gray-100 hover:border-esg-green/40 hover:shadow-2xl transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-br from-esg-green/20 to-esg-green/10 rounded-2xl flex items-center justify-center mb-6 text-esg-green group-hover:scale-110 transition-transform duration-300">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3
              className="text-2xl font-bold text-gray-900 mb-6"
              style={{
                textShadow:
                  "0 1px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
              }}>
              {t.skills.categories.esg.title}
            </h3>
            <ul className="space-y-4">
              {t.skills.categories.esg.items.map((skill, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-700 text-base">
                  <CheckCircle2 className="w-5 h-5 text-esg-green shrink-0 mt-0.5" />
                  <span className="font-medium">{skill}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Project Mgmt Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-10 rounded-3xl shadow-lg border-2 border-gray-100 hover:border-esg-blue/40 hover:shadow-2xl transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-br from-esg-blue/20 to-esg-blue/10 rounded-2xl flex items-center justify-center mb-6 text-esg-blue group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="w-8 h-8" />
            </div>
            <h3
              className="text-2xl font-bold text-gray-900 mb-6"
              style={{
                textShadow:
                  "0 1px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
              }}>
              {t.skills.categories.project.title}
            </h3>
            <ul className="space-y-4">
              {t.skills.categories.project.items.map((skill, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-700 text-base">
                  <CheckCircle2 className="w-5 h-5 text-esg-blue shrink-0 mt-0.5" />
                  <span className="font-medium">{skill}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Research Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-10 rounded-3xl shadow-lg border-2 border-gray-100 hover:border-orange-500/40 hover:shadow-2xl transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mb-6 text-orange-500 group-hover:scale-110 transition-transform duration-300">
              <Search className="w-8 h-8" />
            </div>
            <h3
              className="text-2xl font-bold text-gray-900 mb-6"
              style={{
                textShadow:
                  "0 1px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
              }}>
              {t.skills.categories.research.title}
            </h3>
            <ul className="space-y-4">
              {t.skills.categories.research.items.map((skill, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-700 text-base">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <span className="font-medium">{skill}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* Experience Section */}
      <Section
        id="experience"
        className="bg-gradient-to-b from-white to-gray-50/30">
        <div className="text-center mb-16">
          <SectionTitle className="text-center">
            {t.experience.title}
          </SectionTitle>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="space-y-16 relative before:absolute before:left-0 md:before:left-1/2 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-esg-green/30 before:via-esg-blue/30 before:to-esg-green/30 before:-ml-0.5">
            {t.experience.jobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex flex-col md:flex-row items-start group">
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-6 h-6 bg-white border-4 border-esg-green rounded-full transform -translate-x-2.5 md:-translate-x-3 mt-1 z-10 shadow-lg group-hover:scale-125 transition-transform duration-300"></div>

                {/* Content */}
                <div
                  className={cn(
                    "w-full md:w-1/2 pl-12 md:pl-0 md:pr-16",
                    index % 2 !== 0
                      ? "md:ml-auto md:pl-16 md:pr-0"
                      : "text-left md:text-right"
                  )}>
                  <div className="bg-white p-8 rounded-3xl border-2 border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:border-esg-green/40 group-hover:-translate-y-1">
                    <span className="inline-block px-4 py-2 mb-4 text-xs font-bold tracking-wider text-esg-blue bg-gradient-to-r from-esg-blue/10 to-esg-blue/5 rounded-full border border-esg-blue/20">
                      {job.period}
                    </span>
                    <h3
                      className="text-xl md:text-2xl font-bold text-gray-900 mb-3"
                      style={{ textShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}>
                      {job.role}
                    </h3>
                    <div
                      className={cn(
                        "flex items-center gap-2 text-gray-600 mb-6 text-base font-semibold",
                        index % 2 !== 0 ? "" : "md:justify-end"
                      )}>
                      <Building2 className="w-5 h-5 text-esg-green" />
                      <span>{job.company}</span>
                    </div>
                    <ul
                      className={cn(
                        "space-y-3 text-gray-700 text-base leading-relaxed",
                        index % 2 !== 0
                          ? "list-disc list-inside"
                          : "md:list-none md:text-right"
                      )}>
                      {job.description.map((desc, i) => (
                        <li key={i} className="flex items-start gap-3">
                          {index % 2 === 0 && (
                            <span className="hidden md:block w-2 h-2 rounded-full bg-esg-green mt-2 shrink-0"></span>
                          )}
                          <span>{desc}</span>
                          {index % 2 !== 0 && (
                            <span className="w-2 h-2 rounded-full bg-esg-green mt-2 shrink-0"></span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Core Values Section */}
      <Section id="coreValues" className="bg-white">
        <div className="text-center mb-16">
          <SectionTitle className="text-center">
            {t.coreValues.title}
          </SectionTitle>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {t.coreValues.items.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-white to-gray-50 p-10 rounded-3xl shadow-lg border-2 border-gray-100 hover:border-esg-green/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full group">
              <div className="w-16 h-16 bg-gradient-to-br from-esg-green/20 to-esg-green/10 rounded-2xl flex items-center justify-center mb-6 text-esg-green group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3
                className="text-2xl font-bold text-gray-900 mb-5"
                style={{
                  textShadow:
                    "0 1px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
                }}>
                {value.title}
              </h3>
              <p className="text-gray-700 leading-relaxed flex-grow text-base">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Education & Languages Grid */}
      <Section
        id="education"
        className="bg-gradient-to-b from-white to-gray-50/30">
        <div className="grid md:grid-cols-2 gap-20 max-w-7xl mx-auto">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <SectionTitle className="mb-12">{t.education.title}</SectionTitle>
            <div className="space-y-8">
              {t.education.items.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6 items-start p-6 rounded-2xl hover:bg-white/50 transition-colors duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-esg-blue/20 to-esg-blue/10 rounded-2xl flex items-center justify-center shrink-0 text-esg-blue group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-700 font-medium mb-3">
                      {edu.school}
                    </p>
                    <div className="flex gap-4 mt-3 text-sm">
                      <span className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-gray-700 font-medium">
                        <Calendar className="w-4 h-4" /> {edu.year}
                      </span>
                      <span className="px-3 py-1 bg-esg-green/10 text-esg-green rounded-full font-bold">
                        {edu.gpa}
                      </span>
                    </div>
                    {edu.achievement && (
                      <p className="mt-4 text-m text-gray-600 italic leading-relaxed border-l-2 border-esg-green/30 pl-4">
                        {edu.achievement}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            id="languages"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <SectionTitle className="mb-12">{t.languages.title}</SectionTitle>
            <div className="space-y-10">
              {t.languages.items.map((lang, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-white/50 hover:bg-white transition-colors duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-gray-900">
                      {lang.name}
                    </span>
                    <span className="text-sm font-semibold text-esg-green bg-esg-green/10 px-3 py-1 rounded-full">
                      {lang.level}
                    </span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percent}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.2,
                        delay: 0.3 + index * 0.1,
                        ease: "easeOut",
                      }}
                      className="h-full bg-gradient-to-r from-esg-green to-esg-blue rounded-full shadow-lg"></motion.div>
                  </div>
                  <div className="mt-2 text-right text-xs font-medium text-gray-500">
                    {lang.percent}%
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Certificates Section */}
      {t.certificates && t.certificates.items.length > 0 && (
        <Section id="certificates" className="bg-white">
          <div className="text-center mb-16">
            <SectionTitle className="text-center">
              {t.certificates.title}
            </SectionTitle>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {t.certificates.items.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-4 rounded-3xl shadow-lg border-2 border-gray-100 hover:border-orange-500/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col gap-4 group">
                <div className="relative w-full overflow-hidden rounded-2xl border border-gray-100 shadow-inner bg-gray-50 aspect-[4/3]">
                  {cert.file ? (
                    <LazyPDFPreview
                      file={cert.file}
                      className="w-full h-full"
                      alt={`${cert.name} preview`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                      No preview
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-3 right-3 px-3 py-1.5 bg-white/90 text-esg-green text-xs font-bold rounded-full shadow-lg border border-esg-green/30 backdrop-blur-sm hover:bg-esg-green hover:text-white transition-colors">
                      {language === "vi" ? "Xem chứng chỉ" : "View"}
                    </a>
                  )}
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center text-orange-500 shrink-0 shadow-sm">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">
                      {cert.name}
                    </h3>
                    <p className="text-sm font-semibold text-gray-600">
                      {cert.issuer}
                    </p>
                    {cert.date && (
                      <p className="text-xs text-gray-500 mt-1">{cert.date}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* Contact Section */}
      <Section
        id="contact"
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mb-0 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
              {t.contact.title}
            </h2>
            <p className="text-gray-300 mb-16 text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
              {language === "en"
                ? "Connect with me so we can build sustainable value together!"
                : "Hãy kết nối với tôi để có thể cùng nhau xây dựng giá trị bền vững!"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              href="https://mail.google.com/mail/?view=cm&fs=1&to=vincentnguyentnt@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-white/5 hover:bg-white/10 transition-all duration-300 border-2 border-white/10 hover:border-esg-green/50 hover:shadow-2xl hover:shadow-esg-green/20 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-esg-green/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Mail className="w-8 h-8 text-esg-green" />
              </div>
              <span className="text-base font-semibold">Email</span>
              <span className="text-sm text-gray-400 break-all">
                vincentnguyentnt@gmail.com
              </span>
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              href="tel:+84387542402"
              onClick={handlePhoneClick}
              className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-white/5 hover:bg-white/10 transition-all duration-300 border-2 border-white/10 hover:border-esg-blue/50 hover:shadow-2xl hover:shadow-esg-blue/20 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-esg-blue/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Phone className="w-8 h-8 text-esg-blue" />
              </div>
              <span className="text-base font-semibold">Phone</span>
              <span className="text-sm text-gray-400">+84 387 542 402</span>
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              href="https://www.linkedin.com/in/vinh-nguyen-viet-276490393/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-white/5 hover:bg-white/10 transition-all duration-300 border-2 border-white/10 hover:border-[#0077b5]/50 hover:shadow-2xl hover:shadow-[#0077b5]/20 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-[#0077b5]/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Linkedin className="w-8 h-8 text-[#0077b5]" />
              </div>
              <span className="text-base font-semibold">LinkedIn</span>
              <span className="text-sm text-gray-400 break-all">
                vinh-nguyen-viet
              </span>
            </motion.a>
          </div>
        </div>
      </Section>

      <footer className="bg-gray-950 text-gray-400 py-6 text-center text-sm border-t border-gray-800">
        <div className="container mx-auto px-6">
          <p className="font-medium">
            © 2025 Nguyen Viet Vinh. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
