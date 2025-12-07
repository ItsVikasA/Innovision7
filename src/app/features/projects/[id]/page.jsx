"use client";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Circle, Users, FileText, Send } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { reviewRubric, submitProjectForReview } from "@/lib/projects";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";

export default function ProjectDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (params.id) {
      loadProject();
    }
  }, [params.id]);

  const loadProject = async () => {
    try {
      const projectDoc = await getDoc(doc(db, "projects", params.id));
      if (projectDoc.exists()) {
        setProject({ id: projectDoc.id, ...projectDoc.data() });
      }
    } catch (error) {
      console.error("Failed to load project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitForReview = async () => {
    try {
      await submitProjectForReview(params.id, {
        userId: session.user.email,
        projectTitle: project.title
      });
      toast.success("Project submitted for review!");
      loadProject();
    } catch (error) {
      toast.error("Failed to submit project");
    }
  };

  if (status === "loading" || loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!project) {
    return <div className="p-8">Project not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="mb-6">
          <Link href="/features/projects">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold">{project.title}</h1>
            <p className="text-muted-foreground mt-2">{project.description}</p>
          </div>
          {project.status === "in_progress" && (
            <Button onClick={handleSubmitForReview}>
              <Send className="w-4 h-4 mr-2" />
              Submit for Review
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Milestones */}
            <Card>
              <CardHeader>
                <CardTitle>Project Milestones</CardTitle>
                <CardDescription>Track your progress through each phase</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.milestones?.map((milestone, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="mt-1">
                        {index < project.currentMilestone ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : index === project.currentMilestone ? (
                          <Circle className="w-6 h-6 text-blue-500 fill-blue-500" />
                        ) : (
                          <Circle className="w-6 h-6 text-gray-300" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{milestone.title}</h4>
                        <p className="text-sm text-muted-foreground">{milestone.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Review Rubric */}
            <Card>
              <CardHeader>
                <CardTitle>Review Rubric</CardTitle>
                <CardDescription>How your project will be evaluated</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviewRubric.categories.map((category, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-semibold">{category.name}</h4>
                        <span className="text-sm text-muted-foreground">
                          {(category.weight * 100).toFixed(0)}% weight
                        </span>
                      </div>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {category.criteria.map((criterion, i) => (
                          <li key={i}>• {criterion.name}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Completion</span>
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} />
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Status</p>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm font-medium">
                      {project.status.replace("_", " ").toUpperCase()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Required Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.skills?.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mentor */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Mentor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    No mentor assigned yet
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Find a Mentor
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <a href="#" className="block text-blue-600 hover:underline">
                    Project Guidelines
                  </a>
                  <a href="#" className="block text-blue-600 hover:underline">
                    Code Review Checklist
                  </a>
                  <a href="#" className="block text-blue-600 hover:underline">
                    Submission Template
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
