import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Document {
  fileName: string;
  title: string;
}

interface Topic {
  id: number;
  folderName: string;
  title: string;
  titleVi: string;
  documents: Document[];
}

interface ESGContentCarouselProps {
  language: "en" | "vi";
}

export function ESGContentCarousel({ language }: ESGContentCarouselProps) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/esg-learning/topics");
        if (!response.ok) throw new Error("Failed to fetch topics");

        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(
            language === "vi"
              ? "API trả về HTML (có thể server chưa chạy). Vui lòng chạy `npm run dev` để bật API."
              : "API returned HTML (server may not be running). Please start the API with `npm run dev`."
          );
        }

        const data = await response.json();
        setTopics(data.topics || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching topics:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const currentTopic = topics[currentTopicIndex];
  const allDocuments: Array<{
    topic: Topic;
    document: Document;
    globalIndex: number;
  }> = [];

  topics.forEach((topic) => {
    topic.documents.forEach((doc, docIndex) => {
      allDocuments.push({
        topic,
        document: doc,
        globalIndex: allDocuments.length,
      });
    });
  });

  const handlePrevious = () => {
    if (allDocuments.length === 0) return;
    setCurrentDocIndex((prev) => {
      const newIndex = (prev - 1 + allDocuments.length) % allDocuments.length;
      const newDoc = allDocuments[newIndex];
      const topicIndex = topics.findIndex((t) => t.id === newDoc.topic.id);
      setCurrentTopicIndex(topicIndex);
      return newIndex;
    });
  };

  const handleNext = () => {
    if (allDocuments.length === 0) return;
    setCurrentDocIndex((prev) => {
      const newIndex = (prev + 1) % allDocuments.length;
      const newDoc = allDocuments[newIndex];
      const topicIndex = topics.findIndex((t) => t.id === newDoc.topic.id);
      setCurrentTopicIndex(topicIndex);
      return newIndex;
    });
  };

  const handleDotClick = (index: number) => {
    setCurrentDocIndex(index);
    const newDoc = allDocuments[index];
    const topicIndex = topics.findIndex((t) => t.id === newDoc.topic.id);
    setCurrentTopicIndex(topicIndex);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-esg-green mx-auto mb-4" />
          <p className="text-gray-600">
            {language === "vi" ? "Đang tải nội dung..." : "Loading content..."}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 mb-2">
            {language === "vi" ? "Lỗi tải nội dung" : "Error loading content"}
          </p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (allDocuments.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-600">
          {language === "vi" ? "Không có nội dung" : "No content available"}
        </p>
      </div>
    );
  }

  const currentDoc = allDocuments[currentDocIndex];

  return (
    <div className="w-full">
      {/* Carousel Container */}
      <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 hover:bg-esg-green hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          aria-label={language === "vi" ? "Trước" : "Previous"}>
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 hover:bg-esg-green hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          aria-label={language === "vi" ? "Sau" : "Next"}>
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Content Area */}
        <div className="p-8 md:p-12 min-h-[500px]">
          {/* Topic Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold text-esg-green bg-esg-green/10 px-3 py-1 rounded-full">
                {language === "vi"
                  ? `Chủ đề ${currentDoc.topic.id}`
                  : `Topic ${currentDoc.topic.id}`}
              </span>
              <span className="text-sm text-gray-500">
                {currentDocIndex + 1} / {allDocuments.length}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {language === "vi"
                ? currentDoc.topic.titleVi
                : currentDoc.topic.title}
            </h2>
            <h3 className="text-lg md:text-xl font-semibold text-esg-green">
              {currentDoc.document.title}
            </h3>
          </div>

          {/* Document Content - Lazy Loaded */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDocIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="prose prose-lg max-w-none">
              <LazyContentCard
                topic={currentDoc.topic.folderName}
                document={currentDoc.document.fileName}
                language={language}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 p-6 bg-gray-50 border-t border-gray-200">
          {allDocuments.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                index === currentDocIndex
                  ? "bg-esg-green w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              )}
              aria-label={`${language === "vi" ? "Đi tới" : "Go to"} ${
                index + 1
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface LazyContentCardProps {
  topic: string;
  document: string;
  language: "en" | "vi";
}

function LazyContentCard({ topic, document, language }: LazyContentCardProps) {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            setHasLoaded(true);
            loadContent();
            observer.disconnect();
          }
        });
      },
      { rootMargin: "100px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [topic, document]);

  const loadContent = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `/api/esg-learning/content?topic=${encodeURIComponent(
          topic
        )}&document=${encodeURIComponent(document)}`
      );

      if (!response.ok) {
        throw new Error("Failed to load content");
      }

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(
          language === "vi"
            ? "API trả về HTML (có thể server chưa chạy). Vui lòng chạy `npm run dev` để bật API."
            : "API returned HTML (server may not be running). Please start the API with `npm run dev`."
        );
      }

      const data = await response.json();
      setContent(data.html);
    } catch (err) {
      console.error("Error loading content:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div
        ref={containerRef}
        className="flex justify-center items-center min-h-[300px]">
        <div className="text-center">
          <Loader2 className="w-6 h-6 animate-spin text-esg-green mx-auto mb-2" />
          <p className="text-gray-600 text-sm">
            {language === "vi" ? "Đang tải..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-2">
          {language === "vi" ? "Lỗi tải nội dung" : "Error loading content"}
        </p>
        <p className="text-gray-600 text-sm">{error}</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div ref={containerRef} className="text-center py-8 text-gray-500">
        {language === "vi" ? "Không có nội dung" : "No content available"}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="content-wrapper"
      dangerouslySetInnerHTML={{ __html: content }}
      style={{
        lineHeight: "1.8",
        color: "#374151",
      }}
    />
  );
}
