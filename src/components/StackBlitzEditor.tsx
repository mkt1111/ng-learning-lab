import { useEffect, useRef, useState, useMemo } from "react";
import sdk from "@stackblitz/sdk";
import { Button } from "@/components/ui/button";
import { RotateCcw, ExternalLink } from "lucide-react";

const ANGULAR_DEPENDENCIES = {
  "@angular/core": "latest",
  "@angular/common": "latest",
  "@angular/compiler": "latest",
  "@angular/platform-browser": "latest",
  "@angular/platform-browser-dynamic": "latest",
  "@angular/forms": "latest",
  "rxjs": "latest",
  "zone.js": "latest",
  "tslib": "latest",
};

interface StackBlitzEditorProps {
  code: string;
  title?: string;
}

export const StackBlitzEditor = ({ code, title = "Angular Example" }: StackBlitzEditorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEmbedding, setIsEmbedding] = useState(false);
  const originalCode = useMemo(() => code, []);

  // Extract component class name from the code
  const extractComponentName = (codeStr: string): string => {
    const match = codeStr.match(/export\s+class\s+(\w+)/);
    return match ? match[1] : 'AppComponent';
  };

  // Convert non-standalone component to standalone
  const convertToStandalone = (codeStr: string): string => {
    // Check if already standalone
    if (codeStr.includes('standalone:')) {
      return codeStr;
    }

    // Add standalone: true and imports to the @Component decorator
    const componentMatch = codeStr.match(/@Component\(\{([^}]+)\}\)/s);
    if (componentMatch) {
      const decoratorContent = componentMatch[1];
      const newDecorator = `@Component({\n  standalone: true,\n  imports: [CommonModule, FormsModule],${decoratorContent}})`;
      return codeStr.replace(/@Component\(\{[^}]+\}\)/s, newDecorator);
    }
    return codeStr;
  };

  const componentName = useMemo(() => extractComponentName(code), [code]);

  const projectConfig = useMemo(() => {
    const standaloneCode = convertToStandalone(code);
    const compName = extractComponentName(standaloneCode);
    
    return {
      title: title,
      description: "Angular code example from lesson",
      template: "angular-cli" as const,
      dependencies: ANGULAR_DEPENDENCIES,
      files: {
        "src/index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <app-root></app-root>
</body>
</html>`,
        "src/app/app.component.ts": `import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
${standaloneCode}`,
        "src/main.ts": `import { bootstrapApplication } from '@angular/platform-browser';
import { ${compName} } from './app/app.component';

bootstrapApplication(${compName})
  .catch(err => console.error(err));`,
        "src/styles.css": `body { 
  font-family: Arial, sans-serif; 
  padding: 20px;
  background: #1e1e1e;
  color: #fff;
}`,
      },
    };
  }, [code, title]);

  const embedProject = async (codeContent: string) => {
    if (!containerRef.current) return;
    
    try {
      setIsEmbedding(true);
      containerRef.current.innerHTML = '';
      
      const standaloneCode = convertToStandalone(codeContent);
      const compName = extractComponentName(standaloneCode);
      
      await sdk.embedProject(
        containerRef.current,
        {
          title: title,
          description: "Angular code example from lesson",
          template: "angular-cli" as const,
          dependencies: ANGULAR_DEPENDENCIES,
          files: {
            "src/index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <app-root></app-root>
</body>
</html>`,
            "src/app/app.component.ts": `import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
${standaloneCode}`,
            "src/main.ts": `import { bootstrapApplication } from '@angular/platform-browser';
import { ${compName} } from './app/app.component';

bootstrapApplication(${compName})
  .catch(err => console.error(err));`,
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
          openFile: "src/app/app.component.ts",
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
    const timer = setTimeout(() => {
      embedProject(code);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [code]);

  const handleReset = () => {
    embedProject(originalCode);
  };

  const handleOpenInStackBlitz = async () => {
    await sdk.openProject(projectConfig);
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
