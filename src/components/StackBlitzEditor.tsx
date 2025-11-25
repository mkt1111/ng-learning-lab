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

  // Extract component class name from the code
  const extractComponentName = (codeStr: string): string => {
    const match = codeStr.match(/export\s+class\s+(\w+)/);
    return match ? match[1] : 'AppComponent';
  };

  const componentName = useMemo(() => extractComponentName(code), [code]);

  const projectConfig = useMemo(() => ({
    title: title,
    description: "Angular code example from lesson",
    template: "angular-cli" as const,
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
      "src/app/app.component.ts": code,
      "src/app/app.module.ts": `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ${componentName} } from './app.component';

@NgModule({
  declarations: [${componentName}],
  imports: [BrowserModule, FormsModule],
  bootstrap: [${componentName}]
})
export class AppModule { }`,
      "src/main.ts": `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));`,
      "src/styles.css": `body { 
  font-family: Arial, sans-serif; 
  padding: 20px;
  background: #1e1e1e;
  color: #fff;
}`,
    },
  }), [code, title, componentName]);

  const embedProject = async (codeContent: string) => {
    if (!containerRef.current) return;
    
    try {
      setIsEmbedding(true);
      containerRef.current.innerHTML = '';
      
      const compName = extractComponentName(codeContent);
      
      await sdk.embedProject(
        containerRef.current,
        {
          title: title,
          description: "Angular code example from lesson",
          template: "angular-cli" as const,
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
            "src/app/app.component.ts": codeContent,
            "src/app/app.module.ts": `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ${compName} } from './app.component';

@NgModule({
  declarations: [${compName}],
  imports: [BrowserModule, FormsModule],
  bootstrap: [${compName}]
})
export class AppModule { }`,
            "src/main.ts": `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
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
