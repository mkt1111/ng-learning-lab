import { useEffect, useRef, useState, useMemo } from "react";
import sdk from "@stackblitz/sdk";
import { Button } from "@/components/ui/button";
import { RotateCcw, ExternalLink } from "lucide-react";

interface StackBlitzEditorProps {
  code: string;
  title?: string;
}

export const StackBlitzEditor = ({ code, title = "Angular Example" }: StackBlitzEditorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEmbedding, setIsEmbedding] = useState(false);
  const originalCode = useMemo(() => code, []);

  const projectConfig = useMemo(() => ({
    title: title,
    description: "Angular code example from lesson",
    template: "angular-cli" as const,
    files: {
      "src/main.ts": `import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';

${code}

bootstrapApplication(AppComponent).catch(err => console.error(err));`,
      "src/styles.css": `body { 
  font-family: Arial, sans-serif; 
  padding: 20px;
  background: #1e1e1e;
  color: #fff;
}`,
    },
  }), [code, title]);

  const embedProject = async (codeContent: string) => {
    if (!containerRef.current) return;
    
    try {
      setIsEmbedding(true);
      // Clear the container first
      containerRef.current.innerHTML = '';
      
      await sdk.embedProject(
        containerRef.current,
        {
          ...projectConfig,
          files: {
            "src/main.ts": `import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';

${codeContent}

bootstrapApplication(AppComponent).catch(err => console.error(err));`,
            "src/styles.css": `body { 
  font-family: Arial, sans-serif; 
  padding: 20px;
  background: #1e1e1e;
  color: #fff;
}`,
          }
        },
        {
          height: 500,
          openFile: "src/main.ts",
          view: "preview",
          theme: "dark",
          hideExplorer: true,
          hideNavigation: true,
        }
      );
    } catch (error) {
      console.error("Failed to embed StackBlitz project:", error);
    } finally {
      setIsEmbedding(false);
    }
  };

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      embedProject(code);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [code]);

  const handleReset = () => {
    embedProject(originalCode);
  };

  const handleOpenInStackBlitz = async () => {
    await sdk.openProject({
      ...projectConfig,
      files: {
        "src/main.ts": `import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';

${originalCode}

bootstrapApplication(AppComponent).catch(err => console.error(err));`,
        "src/styles.css": `body { 
  font-family: Arial, sans-serif; 
  padding: 20px;
  background: #1e1e1e;
  color: #fff;
}`,
      }
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2 justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handleOpenInStackBlitz}
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          Open in StackBlitz
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleReset}
          disabled={isEmbedding}
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          {isEmbedding ? "Resetting..." : "Reset"}
        </Button>
      </div>
      <div 
        ref={containerRef} 
        className="w-full min-h-[500px] rounded-lg border border-border bg-muted/30"
      >
        {isEmbedding && (
          <div className="flex items-center justify-center h-[500px]">
            <p className="text-muted-foreground">Loading editor...</p>
          </div>
        )}
      </div>
    </div>
  );
};
