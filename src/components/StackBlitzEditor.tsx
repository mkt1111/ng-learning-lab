import { useState, useMemo } from "react";
import sdk from "@stackblitz/sdk";
import { Button } from "@/components/ui/button";
import { RotateCcw, ExternalLink } from "lucide-react";

interface StackBlitzEditorProps {
  code: string;
  title?: string;
}

export const StackBlitzEditor = ({ code, title = "Angular Example" }: StackBlitzEditorProps) => {
  const [key, setKey] = useState(0);
  const originalCode = useMemo(() => code, []);

  const projectConfig = useMemo(() => ({
    title: title,
    description: "Angular code example from lesson",
    template: "angular-cli" as const,
    files: {
      "src/app/app.component.ts": code,
      "src/app/app.component.html": "<app-root></app-root>",
      "src/main.ts": `import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent);`,
    },
  }), [code, title]);

  const handleReset = () => {
    setKey(prev => prev + 1);
  };

  const handleOpenInStackBlitz = async () => {
    await sdk.openProject({
      ...projectConfig,
      files: {
        ...projectConfig.files,
        "src/app/app.component.ts": originalCode,
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
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset
        </Button>
      </div>
      <iframe
        key={key}
        src={`https://stackblitz.com/edit/angular-${title?.toLowerCase().replace(/\s+/g, '-') || 'example'}?embed=1&file=src/app/app.component.ts&hideExplorer=1&hideNavigation=1&view=preview&theme=dark`}
        className="w-full h-[500px] rounded-lg border border-border"
        title={title}
        sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      />
    </div>
  );
};
