"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronLeft, ChevronRight, Home } from "lucide-react";
import { toast } from "sonner";

export default function CourseViewPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  useEffect(() => {
    if (params.id) {
      fetchCourse();
    }
  }, [params.id]);

  const fetchCourse = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/courses/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setCourse(data.course);
      } else {
        toast.error("Course not found");
        router.push("/courses");
      }
    } catch (error) {
      console.error("Failed to fetch course:", error);
      toast.error("Failed to load course");
    }
    setLoading(false);
  };

  const currentChapter = course?.chapters?.[currentChapterIndex];

  const goToNextChapter = () => {
    if (currentChapterIndex < course.chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    }
  };

  const goToPreviousChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-sm text-muted-foreground mt-4">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg text-muted-foreground">Course not found</p>
          <Button onClick={() => router.push("/courses")} className="mt-4">
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/courses")}
              >
                <Home className="h-4 w-4 mr-2" />
                All Courses
              </Button>
              <div>
                <h1 className="text-xl font-bold">{course.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Chapter {currentChapterIndex + 1} of {course.chapters?.length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Chapter List */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Chapters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {course.chapters?.map((chapter, idx) => (
                    <button
                      key={chapter.id}
                      onClick={() => setCurrentChapterIndex(idx)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        idx === currentChapterIndex
                          ? "border-blue-400 bg-blue-50 font-medium"
                          : "hover:bg-accent"
                      }`}
                    >
                      <div className="text-sm">
                        Chapter {idx + 1}
                      </div>
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        {chapter.title}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>{currentChapter?.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: currentChapter?.content || "<p>No content available</p>" }}
                />

                {/* Resources */}
                {currentChapter?.resources && currentChapter.resources.length > 0 && (
                  <div className="mt-8 pt-8 border-t">
                    <h3 className="text-lg font-semibold mb-4">Resources</h3>
                    <div className="space-y-2">
                      {currentChapter.resources.map((resource, idx) => (
                        <a
                          key={idx}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-3 border rounded-lg hover:bg-accent transition-all"
                        >
                          <div className="font-medium">{resource.title}</div>
                          <div className="text-sm text-muted-foreground">{resource.type}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-8 border-t">
                  <Button
                    variant="outline"
                    onClick={goToPreviousChapter}
                    disabled={currentChapterIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <Button
                    onClick={goToNextChapter}
                    disabled={currentChapterIndex === course.chapters.length - 1}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
