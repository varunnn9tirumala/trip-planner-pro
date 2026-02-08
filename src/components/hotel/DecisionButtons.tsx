import { AIType } from '@/types/hotel';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface Props {
  aiType: AIType;
  onDecision: (decision: 'proceed' | 'discard') => void;
}

const DecisionButtons = ({ aiType, onDecision }: Props) => (
  <div className="flex gap-3">
    <Button
      onClick={() => onDecision('proceed')}
      className="flex-1 py-6 text-base"
      variant="default"
    >
      <ThumbsUp className="h-5 w-5 mr-2" />
      {aiType === 'anthropogenic' ? 'Yes, proceed! 🎉' : 'PROCEED'}
    </Button>
    <Button
      onClick={() => onDecision('discard')}
      className="flex-1 py-6 text-base"
      variant="outline"
    >
      <ThumbsDown className="h-5 w-5 mr-2" />
      {aiType === 'anthropogenic' ? 'No, discard' : 'DISCARD'}
    </Button>
  </div>
);

export default DecisionButtons;
