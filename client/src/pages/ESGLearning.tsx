import React, { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Section, SectionTitle } from "@/components/Section";
import { LazyBackgroundImage } from "@/components/LazyBackgroundImage";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  BookOpen,
  ArrowLeft,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";

interface FlashCard {
  question: string;
  answer: string;
}

interface Topic {
  id: number;
  fileName: string;
  title: string;
  titleVi: string;
}

const topics: Topic[] = [
  {
    id: 1,
    fileName:
      "FlashCards/1. ESG Essentials for Sustainable Business_Flashcards.csv",
    title: "ESG Essentials for Sustainable Business",
    titleVi: "Kiến thức cơ bản về ESG cho Doanh nghiệp Bền vững",
  },
  {
    id: 2,
    fileName:
      "FlashCards/2. ESG Communication for Inclusive Dialogue_Flashcards.csv",
    title: "ESG Communication for Inclusive Dialogue",
    titleVi: "Giao tiếp ESG cho Đối thoại Hòa nhập",
  },
  {
    id: 3,
    fileName:
      "FlashCards/3. ESG Value Creation for Business Impact_Flashcards.csv",
    title: "ESG Value Creation for Business Impact",
    titleVi: "Tạo giá trị ESG cho Tác động Kinh doanh",
  },
  {
    id: 4,
    fileName:
      "FlashCards/4. ESG Challenges and Solutions for Business_Flashcards.csv",
    title: "ESG Challenges and Solutions for Business",
    titleVi: "Thách thức và Giải pháp ESG cho Doanh nghiệp",
  },
  {
    id: 5,
    fileName:
      "FlashCards/5. ESG Mindsets for Business Transformation_Flashcards.csv",
    title: "ESG Mindsets for Business Transformation",
    titleVi: "Tư duy ESG cho Chuyển đổi Kinh doanh",
  },
  {
    id: 6,
    fileName: "FlashCards/6. How to Prioritize ESG Initiatives_Flashcards.csv",
    title: "How to Prioritize ESG Initiatives",
    titleVi: "Cách Ưu tiên các Sáng kiến ESG",
  },
];

export default function ESGLearning() {
  const { language } = useLanguage();
  const [location, setLocation] = useLocation();
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [flashcards, setFlashcards] = useState<FlashCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if we're viewing a specific topic
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const topicId = params.get("topic");
    if (topicId) {
      const topic = topics.find((t) => t.id === parseInt(topicId));
      if (topic) {
        setSelectedTopic(topic);
        loadFlashcards(topic.fileName);
      }
    }
  }, []);

  const loadFlashcards = async (fileName: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/Documentation/ESGLearning/${fileName}`);
      const text = await response.text();
      const lines = text.split("\n").filter((line) => line.trim());

      const cards: FlashCard[] = [];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Parse CSV line with proper quote handling
        const parseCSVLine = (line: string): string[] => {
          const result: string[] = [];
          let current = "";
          let inQuotes = false;

          for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (char === '"') {
              if (inQuotes && line[i + 1] === '"') {
                // Escaped quote
                current += '"';
                i++;
              } else {
                // Toggle quote state
                inQuotes = !inQuotes;
              }
            } else if (char === "," && !inQuotes) {
              // Field separator
              result.push(current);
              current = "";
            } else {
              current += char;
            }
          }
          result.push(current); // Add last field
          return result;
        };

        const fields = parseCSVLine(line);
        if (fields.length >= 2) {
          cards.push({
            question: fields[0].trim(),
            answer: fields.slice(1).join(",").trim(),
          });
        }
      }
      setFlashcards(cards);
      setCurrentIndex(0);
      setIsFlipped(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading flashcards:", error);
      setIsLoading(false);
    }
  };

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setLocation(`/esg-learning?topic=${topic.id}`);
    loadFlashcards(topic.fileName);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setLocation("/esg-learning");
    setFlashcards([]);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex(
      (prev) => (prev - 1 + flashcards.length) % flashcards.length
    );
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleReset = () => {
    setIsFlipped(false);
    setCurrentIndex(0);
  };

  const currentCard = flashcards[currentIndex];

  return (
    <div className="min-h-screen flex flex-col text-gray-800 font-sans selection:bg-esg-green/20 relative">
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
        className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-24 pb-8">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-esg-green/5 blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-esg-blue/5 blur-3xl rounded-full transform -translate-x-1/4 translate-y-1/4"></div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block px-4 py-2 mb-4 text-xs font-bold tracking-widest text-esg-green bg-esg-green/10 rounded-full uppercase border border-esg-green/20">
              <BookOpen className="w-4 h-4 inline-block mr-2" />
              {language === "vi" ? "Học tập ESG" : "ESG Learning"}
            </motion.span>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-[1.1] tracking-tight"
              style={{
                textShadow:
                  "0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)",
              }}>
              {language === "vi" ? "Học tập ESG của tôi" : "My ESG Learning"}
            </h1>
            <p
              className="text-xl md:text-2xl text-gray-700 mb-8 font-medium leading-relaxed"
              style={{
                textShadow:
                  "0 1px 4px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)",
              }}>
              {language === "vi"
                ? "Học và ôn tập kiến thức ESG thông qua FlashCard"
                : "Learn and review ESG knowledge through FlashCards"}
            </p>
          </motion.div>
        </div>
      </section>

      {!selectedTopic ? (
        /* Topics Selection Section */
        <Section id="topics" className="bg-white !py-12 md:!py-16">
          <div className="text-center mb-16">
            <SectionTitle className="text-center">
              {language === "vi"
                ? "Chọn chủ đề học tập"
                : "Select Learning Topic"}
            </SectionTitle>
            <p className="text-gray-600 mt-4">
              {language === "vi"
                ? "Chọn một chủ đề để bắt đầu học với FlashCard"
                : "Choose a topic to start learning with FlashCards"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {topics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleTopicSelect(topic)}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-lg border-2 border-gray-100 hover:border-esg-green/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                <div className="w-16 h-16 bg-gradient-to-br from-esg-green/20 to-esg-green/10 rounded-2xl flex items-center justify-center mb-6 text-esg-green group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div className="mb-4">
                  <span className="text-xs font-bold text-esg-green bg-esg-green/10 px-3 py-1 rounded-full">
                    {language === "vi"
                      ? `Chủ đề ${topic.id}`
                      : `Topic ${topic.id}`}
                  </span>
                </div>
                <h3
                  className="text-xl font-bold text-gray-900 mb-3 leading-tight"
                  style={{
                    textShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  }}>
                  {language === "vi" ? topic.titleVi : topic.title}
                </h3>
                <div className="flex items-center gap-2 text-esg-green font-semibold mt-6 group-hover:gap-3 transition-all">
                  <Play className="w-5 h-5" />
                  <span>
                    {language === "vi" ? "Bắt đầu học" : "Start Learning"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      ) : (
        /* FlashCard Section */
        <Section id="flashcards" className="bg-white !py-12 md:!py-16">
          <div className="text-center mb-8">
            <button
              onClick={handleBackToTopics}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-esg-green transition-colors mb-4">
              <ArrowLeft className="w-5 h-5" />
              <span>
                {language === "vi" ? "Quay lại chủ đề" : "Back to Topics"}
              </span>
            </button>
            <SectionTitle className="text-center">
              {language === "vi" ? selectedTopic.titleVi : selectedTopic.title}
            </SectionTitle>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[500px]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-esg-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">
                  {language === "vi"
                    ? "Đang tải FlashCard..."
                    : "Loading FlashCards..."}
                </p>
              </div>
            </div>
          ) : flashcards.length === 0 ? (
            <div className="text-center min-h-[500px] flex items-center justify-center">
              <p className="text-gray-600 text-lg">
                {language === "vi"
                  ? "Không tìm thấy FlashCard"
                  : "No FlashCards found"}
              </p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* Card Counter */}
              <div className="text-center mb-8">
                <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                  {currentIndex + 1} / {flashcards.length}
                </span>
              </div>

              {/* FlashCard */}
              <div className="relative mb-8" style={{ perspective: "1000px" }}>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, rotateY: -90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: 90 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full"
                  style={{ transformStyle: "preserve-3d" }}>
                  <div
                    className="relative w-full h-[400px] cursor-pointer"
                    onClick={handleFlip}
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped
                        ? "rotateY(180deg)"
                        : "rotateY(0deg)",
                      transition: "transform 0.6s",
                    }}>
                    {/* Front of card (Question) */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-3xl shadow-2xl p-8 flex items-center justify-center bg-gradient-to-br from-esg-green to-esg-blue text-white"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(0deg)",
                      }}>
                      <div className="text-center">
                        <div className="mb-4">
                          <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                            {language === "vi" ? "Câu hỏi" : "Question"}
                          </span>
                        </div>
                        <h3
                          className="text-2xl md:text-3xl font-bold leading-relaxed"
                          style={{
                            textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                          }}>
                          {currentCard?.question}
                        </h3>
                        <p className="mt-6 text-white/80 text-sm">
                          {language === "vi"
                            ? "Nhấp để xem câu trả lời"
                            : "Click to see answer"}
                        </p>
                      </div>
                    </div>

                    {/* Back of card (Answer) */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-3xl shadow-2xl p-8 flex items-center justify-center bg-gradient-to-br from-white to-gray-50 text-gray-900 border-2 border-esg-green"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}>
                      <div className="text-center">
                        <div className="mb-4">
                          <span className="text-sm font-semibold bg-esg-green text-white px-3 py-1 rounded-full">
                            {language === "vi" ? "Câu trả lời" : "Answer"}
                          </span>
                        </div>
                        <p
                          className="text-xl md:text-2xl leading-relaxed"
                          style={{
                            textShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                          }}>
                          {currentCard?.answer}
                        </p>
                        <p className="mt-6 text-gray-500 text-sm">
                          {language === "vi"
                            ? "Nhấp để xem câu hỏi"
                            : "Click to see question"}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handlePrevious}
                  className="p-3 rounded-full bg-gray-100 hover:bg-esg-green hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-full bg-gray-100 hover:bg-esg-blue hover:text-white transition-all duration-300 shadow-md hover:shadow-lg font-semibold flex items-center gap-2">
                  <RotateCcw className="w-5 h-5" />
                  <span>{language === "vi" ? "Bắt đầu lại" : "Reset"}</span>
                </button>

                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-gray-100 hover:bg-esg-green hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}
        </Section>
      )}

      <footer className="bg-gray-950 text-gray-400 py-6 text-center text-sm border-t border-gray-800 mt-auto">
        <div className="container mx-auto px-6">
          <p className="font-medium">
            © 2025 Nguyen Viet Vinh. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
