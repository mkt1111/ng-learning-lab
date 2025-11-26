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
  "@angular/common/http": "latest",
  "@angular/router": "latest",
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

  const extractSelector = (codeStr: string): string => {
    const match = codeStr.match(/selector\s*:\s*['"`](.*?)['"`]/);
    return match ? match[1] : 'app-root';
  };

  // Detect what imports are needed based on the code content
  const detectRequiredImports = (codeStr: string): string[] => {
    const imports = ['CommonModule'];
    
    if (codeStr.includes('ngModel') || codeStr.includes('FormsModule')) {
      imports.push('FormsModule');
    }
    if (codeStr.includes('formGroup') || codeStr.includes('FormBuilder') || codeStr.includes('ReactiveFormsModule')) {
      imports.push('ReactiveFormsModule');
    }
    if (codeStr.includes('HttpClient') || codeStr.includes('HttpClientModule')) {
      imports.push('HttpClientModule');
    }
    if (codeStr.includes('RouterModule') || codeStr.includes('Router')) {
      imports.push('RouterModule');
    }
    
    return imports;
  };

  // Add missing type definitions and imports
  const addMissingDefinitions = (codeStr: string): string => {
    let result = codeStr;
    
    // Add User interface if referenced but not defined
    if ((codeStr.includes('User') || codeStr.includes('user:')) && !codeStr.includes('interface User')) {
      result = `interface User {
  id: number;
  name: string;
  email: string;
}\n\n` + result;
    }
    
    // Add Notification interface if referenced but not defined
    if (codeStr.includes('Notification') && !codeStr.includes('interface Notification')) {
      result = `interface Notification {
  id: number;
  message: string;
  type: string;
}\n\n` + result;
    }
    
    // Add missing RxJS imports
    if (codeStr.includes(' of(') && !codeStr.includes("import { of }") && !codeStr.includes("import {of}")) {
      result = `import { of } from 'rxjs';\n` + result;
    }
    
    if (codeStr.includes(' map(') && !codeStr.includes("import { map }")) {
      result = `import { map } from 'rxjs/operators';\n` + result;
    }
    
    return result;
  };

  // Convert non-standalone component to standalone
  const convertToStandalone = (codeStr: string): string => {
    // Check if already standalone
    if (codeStr.includes('standalone:')) {
      return codeStr;
    }

    const requiredImports = detectRequiredImports(codeStr);
    const importsStr = requiredImports.join(', ');

    // Add standalone: true and imports to the @Component decorator
    const componentMatch = codeStr.match(/@Component\(\{([^}]+)\}\)/s);
    if (componentMatch) {
      const decoratorContent = componentMatch[1];
      const newDecorator = `@Component({\n  standalone: true,\n  imports: [${importsStr}],${decoratorContent}})`;
      return codeStr.replace(/@Component\(\{[^}]+\}\)/s, newDecorator);
    }
    return codeStr;
  };

  const componentName = useMemo(() => extractComponentName(code), [code]);

  const projectConfig = useMemo(() => {
    const codeWithDefinitions = addMissingDefinitions(code);
    const standaloneCode = convertToStandalone(codeWithDefinitions);
    const compName = extractComponentName(standaloneCode);
    const selector = extractSelector(standaloneCode);
    const requiredImports = detectRequiredImports(code);
    
    // Build import statements
    const importStatements = [];
    if (requiredImports.includes('CommonModule')) {
      importStatements.push("import { CommonModule } from '@angular/common';");
    }
    if (requiredImports.includes('FormsModule')) {
      importStatements.push("import { FormsModule } from '@angular/forms';");
    }
    if (requiredImports.includes('ReactiveFormsModule')) {
      importStatements.push("import { ReactiveFormsModule } from '@angular/forms';");
    }
    if (requiredImports.includes('HttpClientModule')) {
      importStatements.push("import { HttpClientModule } from '@angular/common/http';");
    }
    if (requiredImports.includes('RouterModule')) {
      importStatements.push("import { RouterModule } from '@angular/router';");
    }
    
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
  <${selector}></${selector}>
</body>
</html>`,
        "src/app/app.component.ts": `${importStatements.join('\n')}
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
}

button {
  background: #3f51b5;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin: 4px;
}

button:hover {
  background: #303f9f;
}

input {
  padding: 8px;
  border: 1px solid #555;
  border-radius: 4px;
  background: #2a2a2a;
  color: white;
  margin: 4px;
}`,
      },
    };
  }, [code, title]);

  const embedProject = async (codeContent: string) => {
    const container = containerRef.current;
    if (!container) return;
    
    try {
      setIsEmbedding(true);
      
      // Clear any existing content
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      
      const codeWithDefinitions = addMissingDefinitions(codeContent);
      const standaloneCode = convertToStandalone(codeWithDefinitions);
      const compName = extractComponentName(standaloneCode);
      const selector = extractSelector(standaloneCode);
      const requiredImports = detectRequiredImports(codeContent);
      
      // Build import statements
      const importStatements = [];
      if (requiredImports.includes('CommonModule')) {
        importStatements.push("import { CommonModule } from '@angular/common';");
      }
      if (requiredImports.includes('FormsModule')) {
        importStatements.push("import { FormsModule } from '@angular/forms';");
      }
      if (requiredImports.includes('ReactiveFormsModule')) {
        importStatements.push("import { ReactiveFormsModule } from '@angular/forms';");
      }
      if (requiredImports.includes('HttpClientModule')) {
        importStatements.push("import { HttpClientModule } from '@angular/common/http';");
      }
      if (requiredImports.includes('RouterModule')) {
        importStatements.push("import { RouterModule } from '@angular/router';");
      }
      
      await sdk.embedProject(
        container,
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
  <${selector}></${selector}>
</body>
</html>`,
            "src/app/app.component.ts": `${importStatements.join('\n')}
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
}

button {
  background: #3f51b5;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin: 4px;
}

button:hover {
  background: #303f9f;
}

input {
  padding: 8px;
  border: 1px solid #555;
  border-radius: 4px;
  background: #2a2a2a;
  color: white;
  margin: 4px;
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
