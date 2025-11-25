import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle } from "lucide-react";
import { Quiz } from "@/data/lessons";
import { cn } from "@/lib/utils";

interface QuizCardProps {
  quiz: Quiz;
}

export const QuizCard = ({ quiz }: QuizCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
  }, [quiz]);

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const isCorrect = selectedAnswer === quiz.correctAnswer;

  return (
    <Card className="border-accent/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          {showResult && (
            isCorrect ? (
              <CheckCircle className="w-5 h-5 text-success" />
            ) : (
              <XCircle className="w-5 h-5 text-destructive" />
            )
          )}
          Quick Check
        </CardTitle>
        <CardDescription>{quiz.question}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup value={selectedAnswer?.toString()} onValueChange={(v) => !showResult && setSelectedAnswer(parseInt(v))}>
          {quiz.options.map((option, index) => (
            <div
              key={index}
              onClick={() => !showResult && setSelectedAnswer(index)}
              className={cn(
                "flex items-center space-x-3 p-3 rounded-lg border transition-smooth cursor-pointer",
                showResult && index === quiz.correctAnswer && "border-success bg-success/5",
                showResult && selectedAnswer === index && index !== quiz.correctAnswer && "border-destructive bg-destructive/5",
                !showResult && "hover:bg-muted",
                showResult && "cursor-default"
              )}
            >
              <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={showResult} />
              <Label
                htmlFor={`option-${index}`}
                className="flex-1 cursor-pointer pointer-events-none"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {showResult && (
          <div className={cn(
            "p-4 rounded-lg border",
            isCorrect ? "bg-success/5 border-success/20" : "bg-destructive/5 border-destructive/20"
          )}>
            <p className="font-medium mb-2">
              {isCorrect ? "Correct! 🎉" : "Not quite right."}
            </p>
            <p className="text-sm text-muted-foreground">{quiz.explanation}</p>
          </div>
        )}

        <div className="flex gap-2">
          {!showResult ? (
            <Button onClick={handleSubmit} disabled={selectedAnswer === null} className="w-full">
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleReset} variant="outline" className="w-full">
              Try Again
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
