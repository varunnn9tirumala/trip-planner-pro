import { CriteriaMatch, AIType } from '@/types/hotel';
import { Card, CardContent } from '@/components/ui/card';
import { Check, X } from 'lucide-react';

interface Props {
  criteria: CriteriaMatch[];
  aiType: AIType;
}

const CriteriaChecklist = ({ criteria, aiType }: Props) => {
  const matchedCount = criteria.filter((c) => c.matched).length;

  return (
    <Card className={`border ${aiType === 'anthropogenic' ? 'border-accent/20' : 'border-primary/20'}`}>
      <CardContent className="pt-5">
        <h3 className={`font-semibold text-base mb-3 ${aiType === 'robotic' ? 'font-mono tracking-wider' : ''}`}>
          {aiType === 'anthropogenic' ? '📋 Requirements Checklist' : 'CRITERIA ANALYSIS REPORT'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {criteria.map((c, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 p-2.5 rounded-lg text-sm ${
                c.matched
                  ? 'bg-success/10 border border-success/20'
                  : 'bg-destructive/10 border border-destructive/20'
              }`}
            >
              {c.matched ? (
                <Check className="h-4 w-4 text-success shrink-0" />
              ) : (
                <X className="h-4 w-4 text-destructive shrink-0" />
              )}
              <span className={`capitalize ${c.matched ? 'text-foreground' : 'text-destructive'}`}>
                {c.label}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-2 border-t border-border text-xs text-muted-foreground">
          {matchedCount}/{criteria.length} criteria satisfied (
          {Math.round((matchedCount / criteria.length) * 100)}%)
        </div>
      </CardContent>
    </Card>
  );
};

export default CriteriaChecklist;
