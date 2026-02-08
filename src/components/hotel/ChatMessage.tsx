import { ChatMessage as ChatMessageType, AIType } from '@/types/hotel';
import { motion } from 'framer-motion';
import humanAssistant from '@/assets/human-assistant.png';
import robotAssistant from '@/assets/robot-assistant.png';

interface Props {
  message: ChatMessageType;
  aiType: AIType;
  onOptionSelect?: (value: string) => void;
}

const ChatMessageComponent = ({ message, aiType, onOptionSelect }: Props) => {
  const isAI = message.sender === 'ai';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      {isAI && (
        <div className="shrink-0 mt-1">
          <img
            src={aiType === 'anthropogenic' ? humanAssistant : robotAssistant}
            alt={aiType === 'anthropogenic' ? 'Sara' : 'AI-X7'}
            className="w-10 h-10 rounded-full object-cover border-2 border-card shadow"
          />
        </div>
      )}

      <div className={`max-w-[75%] space-y-2`}>
        {isAI && (
          <span className={`text-xs font-semibold ${
            aiType === 'anthropogenic' ? 'text-accent' : 'text-primary'
          }`}>
            {aiType === 'anthropogenic' ? 'Sara' : 'AI-X7'}
          </span>
        )}

        <div
          className={`rounded-2xl px-4 py-3 ${
            isAI
              ? aiType === 'anthropogenic'
                ? 'bg-accent/10 text-foreground rounded-tl-sm'
                : 'bg-primary/10 text-foreground rounded-tl-sm font-mono text-sm tracking-wide'
              : 'bg-primary text-primary-foreground rounded-tr-sm'
          }`}
        >
          <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
        </div>

        {/* Option buttons */}
        {message.options && message.options.length > 0 && onOptionSelect && (
          <div className="flex flex-wrap gap-2 pt-1">
            {message.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onOptionSelect(opt.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all hover:scale-105 ${
                  aiType === 'anthropogenic'
                    ? 'border-accent/40 text-accent hover:bg-accent hover:text-accent-foreground'
                    : 'border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground font-mono'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessageComponent;
