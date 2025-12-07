"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Video, BookOpen, Code, Lightbulb } from "lucide-react";

const TEMPLATES = [
  {
    id: "lesson",
    name: "Standard Lesson",
    icon: BookOpen,
    description: "Traditional lesson structure with intro, content, and summary",
    content: `# Lesson Title

## Introduction
Brief overview of what students will learn in this lesson.

## Learning Objectives
- Objective 1
- Objective 2
- Objective 3

## Main Content

### Topic 1
Detailed explanation of the first topic...

### Topic 2
Detailed explanation of the second topic...

## Key Takeaways
- Key point 1
- Key point 2
- Key point 3

## Practice Exercises
1. Exercise 1
2. Exercise 2

## Summary
Recap of what was covered in this lesson.`
  },
  {
    id: "tutorial",
    name: "Step-by-Step Tutorial",
    icon: Code,
    description: "Hands-on tutorial with code examples",
    content: `# Tutorial: [Topic Name]

## What You'll Build
Description of the final outcome...

## Prerequisites
- Prerequisite 1
- Prerequisite 2

## Step 1: Setup
Instructions for setting up...

\`\`\`
// Code example
\`\`\`

## Step 2: Implementation
Detailed implementation steps...

## Step 3: Testing
How to test your work...

## Next Steps
What to learn next...`
  },
  {
    id: "concept",
    name: "Concept Explanation",
    icon: Lightbulb,
    description: "Deep dive into a specific concept",
    content: `# Understanding [Concept Name]

## What is it?
Clear definition of the concept...

## Why is it Important?
Real-world applications and relevance...

## How Does it Work?
Detailed explanation with examples...

## Common Misconceptions
- Misconception 1
- Misconception 2

## Examples
### Example 1
Detailed example...

### Example 2
Another example...

## Practice Problems
1. Problem 1
2. Problem 2`
  },
  {
    id: "video",
    name: "Video Lesson",
    icon: Video,
    description: "Video-based lesson with timestamps",
    content: `# Video Lesson: [Topic]

## Video Overview
Brief description of what the video covers...

## Timestamps
- 0:00 - Introduction
- 2:30 - Topic 1
- 5:45 - Topic 2
- 8:20 - Examples
- 12:00 - Summary

## Key Points from Video
- Point 1
- Point 2
- Point 3

## Additional Resources
- Resource 1
- Resource 2

## Discussion Questions
1. Question 1
2. Question 2`
  },
  {
    id: "assessment",
    name: "Assessment/Quiz",
    icon: FileText,
    description: "Quiz or assessment template",
    content: `# Assessment: [Topic Name]

## Instructions
- Time limit: 30 minutes
- Total questions: 10
- Passing score: 70%

## Multiple Choice Questions

### Question 1
What is...?
a) Option A
b) Option B
c) Option C
d) Option D

### Question 2
Which of the following...?
a) Option A
b) Option B
c) Option C
d) Option D

## Short Answer Questions

### Question 3
Explain...

### Question 4
Describe...

## Practical Exercise
Complete the following task...`
  }
];

export default function TemplateSelector({ onSelect }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Templates</CardTitle>
        <CardDescription>Choose a template to get started quickly</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TEMPLATES.map((template) => {
            const Icon = template.icon;
            return (
              <Card 
                key={template.id}
                className="cursor-pointer hover:border-blue-400 transition-all"
                onClick={() => onSelect(template)}
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
