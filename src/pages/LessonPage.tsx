import { useParams, Navigate } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { CodeBlock } from "@/components/CodeBlock";
import { QuizCard } from "@/components/QuizCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { lessons } from "@/data/lessons";

const LessonPage = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const lesson = lessons.find((l) => l.id === lessonId);

  if (!lesson) {
    return <Navigate to="/lesson/intro" replace />;
  }

  const currentIndex = lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  const difficultyColors = {
    beginner: "bg-success/10 text-success border-success/20",
    intermediate: "bg-accent/10 text-accent border-accent/20",
    advanced: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar currentLessonId={lessonId || ""} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-12">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className={difficultyColors[lesson.difficulty]}>
                {lesson.difficulty}
              </Badge>
              <Badge variant="outline">{lesson.category}</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-3">{lesson.title}</h1>
            <p className="text-lg text-muted-foreground">{lesson.description}</p>
          </div>

          <div className="prose prose-slate max-w-none">
            <div className="whitespace-pre-line text-foreground leading-relaxed">
              {lesson.content}
            </div>
          </div>

          {lesson.codeExample && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Code Example</h2>
              <CodeBlock code={lesson.codeExample} />
            </div>
          )}

          {lesson.quiz && (
            <div className="mt-8">
              <QuizCard quiz={lesson.quiz} />
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-border flex justify-between">
            {prevLesson ? (
              <Button variant="outline" asChild>
                <a href={`/lesson/${prevLesson.id}`} className="flex items-center gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  {prevLesson.title}
                </a>
              </Button>
            ) : (
              <div />
            )}

            {nextLesson && (
              <Button asChild className="ml-auto">
                <a href={`/lesson/${nextLesson.id}`} className="flex items-center gap-2">
                  {nextLesson.title}
                  <ChevronRight className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LessonPage;
