import { BookOpen, Code, Layout, Settings, TestTube, Zap } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface SidebarProps {
  currentLessonId: string;
}

const categoryIcons: Record<string, any> = {
  "Getting Started": BookOpen,
  "Core Concepts": Layout,
  "Architecture": Settings,
  "Navigation": Zap,
  "Forms": Code,
  "Data Management": Code,
  "Advanced Concepts": Zap,
  "Testing": TestTube,
};

const lessonsByCategory = {
  "Getting Started": [
    { id: "intro", title: "Introduction to Angular", difficulty: "beginner" }
  ],
  "Core Concepts": [
    { id: "components", title: "Components & Templates", difficulty: "beginner" },
    { id: "data-binding", title: "Data Binding", difficulty: "beginner" },
    { id: "directives", title: "Directives", difficulty: "intermediate" }
  ],
  "Architecture": [
    { id: "services-di", title: "Services & DI", difficulty: "intermediate" }
  ],
  "Navigation": [
    { id: "routing", title: "Routing & Navigation", difficulty: "intermediate" }
  ],
  "Forms": [
    { id: "forms", title: "Forms (Template & Reactive)", difficulty: "intermediate" }
  ],
  "Data Management": [
    { id: "http-observables", title: "HTTP Client & Observables", difficulty: "intermediate" }
  ],
  "Advanced Concepts": [
    { id: "lifecycle", title: "Lifecycle Hooks", difficulty: "advanced" },
    { id: "pipes", title: "Pipes & Transformations", difficulty: "intermediate" },
    { id: "state-management", title: "State Management", difficulty: "advanced" },
    { id: "performance", title: "Performance Optimization", difficulty: "advanced" }
  ],
  "Testing": [
    { id: "testing", title: "Testing (Unit & E2E)", difficulty: "advanced" }
  ]
};

const difficultyColors = {
  beginner: "text-success",
  intermediate: "text-accent",
  advanced: "text-destructive",
};

export const Sidebar = ({ currentLessonId }: SidebarProps) => {
  return (
    <div className="w-80 bg-sidebar border-r border-sidebar-border flex flex-col h-screen">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold text-sidebar-foreground flex items-center gap-2">
          <Code className="w-6 h-6 text-sidebar-primary" />
          Angular Lab
        </h1>
        <p className="text-sm text-sidebar-foreground/70 mt-1">Interactive Training Platform</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {Object.entries(lessonsByCategory).map(([category, lessons]) => {
            const Icon = categoryIcons[category] || BookOpen;
            return (
              <div key={category}>
                <div className="flex items-center gap-2 mb-3 px-2">
                  <Icon className="w-4 h-4 text-sidebar-primary" />
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60">
                    {category}
                  </h2>
                </div>
                <div className="space-y-1">
                  {lessons.map((lesson) => (
                    <NavLink
                      key={lesson.id}
                      to={`/lesson/${lesson.id}`}
                      className={cn(
                        "block px-4 py-2.5 rounded-lg text-sm transition-smooth",
                        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        currentLessonId === lesson.id
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground/80"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span>{lesson.title}</span>
                        <span className={cn("text-xs font-mono", difficultyColors[lesson.difficulty as keyof typeof difficultyColors])}>
                          {lesson.difficulty[0].toUpperCase()}
                        </span>
                      </div>
                    </NavLink>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-foreground/60">
          <p>13 lessons • 4 categories</p>
          <p className="mt-1">Master Angular from basics to advanced</p>
        </div>
      </div>
    </div>
  );
};
