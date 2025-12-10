import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/components/LanguageContext";
import { useEffect, Suspense, lazy } from "react";

// Lazy load pages for code splitting
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const ESGLearning = lazy(() => import("@/pages/ESGLearning"));
const NotFound = lazy(() => import("@/pages/not-found"));

function ScrollToAnchor() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Check if URL has an anchor (e.g., /#about)
    const hash = window.location.hash;
    if (hash && location === "/") {
      // Wait for page to render, then scroll to anchor
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  }, [location]);

  return null;
}

// Loading component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-esg-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <>
      <ScrollToAnchor />
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={Portfolio} />
          <Route path="/esg-learning" component={ESGLearning} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router />
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
