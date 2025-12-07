"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  BookOpen, Plus, Save, Eye, Upload, FileText, 
  Link as LinkIcon, Trash2 
} from "lucide-react";
import { toast } from "sonner";
import WYSIWYGEditor from "@/components/studio/WYSIWYGEditor";
import TemplateSelector from "@/components/studio/TemplateSelector";
import ResourceManager from "@/components/studio/ResourceManager";

export default function StudioPage() {
  const { data: session } = useSession();
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [chapters, setChapters] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [activeTab, setActiveTab] = useState("editor");
  const [publishedCourses, setPublishedCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const handleSaveDraft = async () => {
    if (!courseTitle) {
      toast.error("Please enter a course title");
      return;
    }

    const courseData = {
      title: courseTitle,
      description: courseDescription,
      chapters,
      status: "draft",
      createdBy: session?.user?.email,
      createdAt: new Date().toISOString()
    };

    // Save to Firebase
    try {
      const res = await fetch("/api/studio/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData)
      });

      if (res.ok) {
        toast.success("Draft saved successfully!");
      }
    } catch (error) {
      toast.error("Failed to save draft");
    }
  };

  const handlePublish = async () => {
    if (chapters.length === 0) {
      toast.error("Add at least one chapter before publishing");
      return;
    }

    const courseData = {
      title: courseTitle,
      description: courseDescription,
      chapters,
      status: "published",
      createdBy: session?.user?.email,
      publishedAt: new Date().toISOString()
    };

    try {
      const res = await fetch("/api/studio/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData)
      });

      if (res.ok) {
        toast.success("Course published successfully!");
        // Refresh the courses list
        await fetchPublishedCourses();
        // Switch to courses tab to show the published course
        setActiveTab("courses");
      }
    } catch (error) {
      toast.error("Failed to publish course");
    }
  };

  const addChapter = () => {
    const newChapter = {
      id: Date.now(),
      title: `Chapter ${chapters.length + 1}`,
      content: "",
      resources: []
    };
    setChapters([...chapters, newChapter]);
    setCurrentChapter(newChapter);
  };

  const fetchPublishedCourses = async () => {
    setLoadingCourses(true);
    try {
      const res = await fetch("/api/studio/courses");
      if (res.ok) {
        const data = await res.json();
        setPublishedCourses(data.courses || []);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
    setLoadingCourses(false);
  };

  const loadCourse = (course) => {
    setCourseTitle(course.title);
    setCourseDescription(course.description);
    setChapters(course.chapters || []);
    setActiveTab("editor");
    toast.success("Course loaded successfully!");
  };

  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!courseToDelete) return;

    try {
      const res = await fetch(`/api/studio/courses/${courseToDelete.id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        toast.success("Course deleted successfully!");
        await fetchPublishedCourses();
      } else {
        toast.error("Failed to delete course");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete course");
    } finally {
      setDeleteDialogOpen(false);
      setCourseToDelete(null);
    }
  };

  useEffect(() => {
    if (session && activeTab === "courses") {
      fetchPublishedCourses();
    }
  }, [session, activeTab]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Instructor Authoring Studio</h1>
          <p className="text-muted-foreground">Create and edit courses with AI assistance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Course Info */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Course Title</label>
                  <Input
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    placeholder="Enter course title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    placeholder="Course description"
                    className="w-full min-h-[100px] p-2 border rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <Button onClick={addChapter} className="w-full" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Chapter
                  </Button>
                  <Button onClick={handleSaveDraft} className="w-full" variant="secondary">
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button onClick={handlePublish} className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Publish Course
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Chapters List */}
            <Card>
              <CardHeader>
                <CardTitle>Chapters ({chapters.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {chapters.map((chapter, idx) => (
                    <div
                      key={chapter.id}
                      onClick={() => setCurrentChapter(chapter)}
                      className={`p-3 border rounded cursor-pointer transition-all ${
                        currentChapter?.id === chapter.id
                          ? "border-blue-400 bg-blue-50"
                          : "hover:bg-accent"
                      }`}
                    >
                      <div className="font-medium">{chapter.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {chapter.resources?.length || 0} resources
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Editor Area */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="editor">
                  <FileText className="h-4 w-4 mr-2" />
                  Editor
                </TabsTrigger>
                <TabsTrigger value="templates">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Templates
                </TabsTrigger>
                <TabsTrigger value="resources">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Resources
                </TabsTrigger>
                <TabsTrigger value="courses">
                  <Eye className="h-4 w-4 mr-2" />
                  My Courses
                </TabsTrigger>
              </TabsList>

              <TabsContent value="editor">
                {currentChapter ? (
                  <WYSIWYGEditor
                    chapter={currentChapter}
                    onUpdate={(updatedChapter) => {
                      setChapters(chapters.map(ch => 
                        ch.id === updatedChapter.id ? updatedChapter : ch
                      ));
                    }}
                  />
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center h-64">
                      <div className="text-center text-muted-foreground">
                        <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Select a chapter or add a new one to start editing</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="templates">
                <TemplateSelector
                  onSelect={(template) => {
                    if (!currentChapter) {
                      toast.error("Please select or create a chapter first");
                      return;
                    }
                    setSelectedTemplate(template);
                    const updated = { ...currentChapter, content: template.content };
                    setChapters(chapters.map(ch => 
                      ch.id === updated.id ? updated : ch
                    ));
                    setCurrentChapter(updated);
                    toast.success(`Template "${template.name}" applied successfully!`);
                    // Switch to editor tab to see the changes
                    setActiveTab("editor");
                  }}
                />
              </TabsContent>

              <TabsContent value="resources">
                <ResourceManager
                  chapter={currentChapter}
                  onUpdate={(resources) => {
                    if (currentChapter) {
                      const updated = { ...currentChapter, resources };
                      setChapters(chapters.map(ch => 
                        ch.id === updated.id ? updated : ch
                      ));
                    }
                  }}
                />
              </TabsContent>

              <TabsContent value="courses">
                <Card>
                  <CardHeader>
                    <CardTitle>My Published Courses</CardTitle>
                    <CardDescription>View and manage your published courses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loadingCourses ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="text-sm text-muted-foreground mt-4">Loading courses...</p>
                      </div>
                    ) : publishedCourses.length > 0 ? (
                      <div className="space-y-4">
                        {publishedCourses.map((course) => (
                          <Card key={course.id} className="hover:border-blue-400 transition-all">
                            <CardHeader>
                              <CardTitle className="text-lg">{course.title}</CardTitle>
                              <CardDescription>{course.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">
                                  {course.chapters?.length || 0} chapters • Published {new Date(course.publishedAt).toLocaleDateString()}
                                </div>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => loadCourse(course)}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View/Edit
                                  </Button>
                                  <Button 
                                    variant="destructive" 
                                    size="sm"
                                    onClick={() => handleDeleteClick(course)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground py-8">
                        <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No published courses yet</p>
                        <p className="text-sm mt-2">Publish your first course to see it listed here</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Course</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete "{courseToDelete?.title}"? All course content and chapters will be removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
