import { useEffect, useRef, useState } from "react";
import sdk from "@stackblitz/sdk";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface StackBlitzEditorProps {
  code: string;
  title?: string;
}

export const StackBlitzEditor = ({ code, title = "Angular Example" }: StackBlitzEditorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isResetting, setIsResetting] = useState(false);
  const originalCode = useRef(code);

  const embedProject = (container: HTMLDivElement, codeContent: string) => {
    // Clear container
    container.innerHTML = '';
    
    sdk.embedProject(
      container,
      {
        title: title,
        description: "Angular code example from lesson",
        template: "angular-cli",
        files: {
          "src/app/app.component.ts": codeContent,
          "src/app/app.component.html": "<app-root></app-root>",
          "src/main.ts": `import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent);`,
        },
      },
      {
        height: 500,
        openFile: "src/app/app.component.ts",
        view: "preview",
        theme: "dark",
      }
    );
  };

  useEffect(() => {
    if (containerRef.current) {
      embedProject(containerRef.current, code);
    }
  }, [code, title]);

  const handleReset = () => {
    if (containerRef.current) {
      setIsResetting(true);
      embedProject(containerRef.current, originalCode.current);
      setTimeout(() => setIsResetting(false), 500);
    }
  };

  return (
    <div className="relative group">
      <div className="absolute top-2 right-2 z-10">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleReset}
          disabled={isResetting}
          className="shadow-lg"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          {isResetting ? "Resetting..." : "Reset"}
        </Button>
      </div>
      <div ref={containerRef} className="rounded-lg overflow-hidden border border-border" />
    </div>
  );
};
