import { useState, useCallback, useEffect } from 'react';
import { ArrowLeft, ArrowRight, X, Check, Loader2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface Flashcard {
  question: string;
  answer: string;
}

type CardState = 'question' | 'answer';

const CARDS_STORAGE_KEY = 'academy-flashcards';

interface CardsStorage {
  cards: Flashcard[];
  currentIndex: number;
  cardState: CardState;
  wrongCount: number;
  correctCount: number;
  isFinished: boolean;
  answeredCurrent: boolean;
}

function loadCardsState(): CardsStorage | null {
  const saved = localStorage.getItem(CARDS_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse flashcards state', e);
    }
  }
  return null;
}

interface FlashcardsProps {
  documentContent: string;
}

const MAX_DOCUMENT_CHARS = 15000;

export function Flashcards({ documentContent }: FlashcardsProps) {
  const saved = loadCardsState();
  const [cards, setCards] = useState<Flashcard[]>(saved?.cards ?? []);
  const [currentIndex, setCurrentIndex] = useState(saved?.currentIndex ?? 0);
  const [cardState, setCardState] = useState<CardState>(saved?.cardState ?? 'question');
  const [wrongCount, setWrongCount] = useState(saved?.wrongCount ?? 0);
  const [correctCount, setCorrectCount] = useState(saved?.correctCount ?? 0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(saved?.isFinished ?? false);
  const [answeredCurrent, setAnsweredCurrent] = useState(saved?.answeredCurrent ?? false);

  useEffect(() => {
    const data: CardsStorage = { cards, currentIndex, cardState, wrongCount, correctCount, isFinished, answeredCurrent };
    localStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(data));
  }, [cards, currentIndex, cardState, wrongCount, correctCount, isFinished, answeredCurrent]);

  const generateCards = useCallback(async () => {
    if (documentContent.length > MAX_DOCUMENT_CHARS) {
      setError(`Document exceeds ${MAX_DOCUMENT_CHARS.toLocaleString()} characters. Please upload a smaller file.`);
      return;
    }

    setIsLoading(true);
    setError(null);
    setCards([]);
    setCurrentIndex(0);
    setCardState('question');
    setWrongCount(0);
    setCorrectCount(0);
    setIsFinished(false);
    setAnsweredCurrent(false);

    try {
      const res = await fetch('/api/generate-flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: documentContent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate flashcards');
      setCards(data.cards);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [documentContent]);

  const fireConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#6d3bd7', '#d0bcff', '#89f5e7', '#ffb95f', '#ff6b6b'],
    });
  };

  const handleAnswer = (correct: boolean) => {
    if (answeredCurrent) return;
    setAnsweredCurrent(true);

    if (correct) {
      setCorrectCount(prev => prev + 1);
    } else {
      setWrongCount(prev => prev + 1);
    }

    // Check if this is the last card
    if (currentIndex === cards.length - 1) {
      setTimeout(() => {
        fireConfetti();
        setIsFinished(true);
      }, 300);
    }
  };

  const goNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setCardState('question');
      setAnsweredCurrent(false);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setCardState('question');
      setAnsweredCurrent(false);
    }
  };

  // Initial state - no cards generated yet
  if (cards.length === 0 && !isLoading && !error) {
    return (
      <div className="p-md flex flex-col items-center justify-center text-center gap-md h-full">
        <h4 className="text-[16px] font-headline-sm font-semibold text-on-surface">Flashcards</h4>
        <p className="text-[14px] text-on-surface-variant leading-relaxed max-w-[240px]">
          Generate 5 flashcards from the documentation to test your knowledge.
        </p>
        <button
          onClick={generateCards}
          className="bg-tertiary-container hover:bg-tertiary-container/80 text-on-tertiary-container text-[13px] font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Generate Cards
        </button>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="p-md flex flex-col items-center justify-center text-center gap-md h-full">
        <Loader2 className="w-8 h-8 animate-spin text-tertiary" />
        <p className="text-[14px] text-on-surface-variant leading-relaxed max-w-[240px]">
          Generating flashcards from documentation... Please wait a moment.
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-md flex flex-col items-center justify-center text-center gap-md h-full">
        <p className="text-[14px] text-error leading-relaxed max-w-[240px]">{error}</p>
        <button
          onClick={generateCards}
          className="bg-tertiary-container hover:bg-tertiary-container/80 text-on-tertiary-container text-[13px] font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    );
  }

  // Finished state
  if (isFinished) {
    return (
      <div className="p-md flex flex-col items-center justify-center text-center gap-md h-full">
        <h4 className="text-[18px] font-headline-sm font-semibold text-on-surface">🎉 Well done!</h4>
        <div className="flex items-center gap-4 text-[14px]">
          <span className="text-green-500 font-semibold flex items-center gap-1">
            <Check className="w-4 h-4" /> {correctCount}
          </span>
          <span className="text-red-500 font-semibold flex items-center gap-1">
            <X className="w-4 h-4" /> {wrongCount}
          </span>
        </div>
        <p className="text-[14px] text-on-surface-variant leading-relaxed max-w-[240px]">
          You completed all 5 cards! Generate another group to keep practicing.
        </p>
        <button
          onClick={generateCards}
          className="bg-tertiary-container hover:bg-tertiary-container/80 text-on-tertiary-container text-[13px] font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          New Cards
        </button>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="flex flex-col h-full p-sm">
      {/* Card */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 bg-[#2a2a2a] dark:bg-[#1a1a1a] rounded-2xl p-md flex flex-col justify-between shadow-xl min-h-[280px]">
          {/* Card number */}
          <div className="flex justify-between items-center">
            <span className="text-[13px] text-green-400 font-mono">
              {currentIndex + 1} / {cards.length}
            </span>
          </div>

          {/* Card content */}
          <div className="flex-1 flex items-center justify-center px-sm">
            <p className="text-white text-[18px] font-semibold leading-relaxed text-center">
              {cardState === 'question' ? currentCard.question : currentCard.answer}
            </p>
          </div>

          {/* See answer / See question toggle */}
          <div className="text-center">
            <button
              onClick={() => setCardState(cardState === 'question' ? 'answer' : 'question')}
              className="text-[13px] text-gray-400 hover:text-white underline transition-colors"
            >
              {cardState === 'question' ? 'See answer' : 'See question'}
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 pt-sm mt-sm">
        {/* Previous */}
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="w-10 h-10 rounded-full border-2 border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:border-on-surface disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Wrong */}
        <button
          onClick={() => handleAnswer(false)}
          disabled={answeredCurrent}
          className="flex items-center gap-1 px-3 h-10 rounded-full border-2 border-outline-variant text-red-500 hover:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <X className="w-5 h-5" />
          <span className="text-[14px] font-semibold">{wrongCount}</span>
        </button>

        {/* Correct */}
        <button
          onClick={() => handleAnswer(true)}
          disabled={answeredCurrent}
          className="flex items-center gap-1 px-3 h-10 rounded-full border-2 border-outline-variant text-green-500 hover:border-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span className="text-[14px] font-semibold">{correctCount}</span>
          <Check className="w-5 h-5" />
        </button>

        {/* Next */}
        <button
          onClick={goNext}
          disabled={currentIndex === cards.length - 1}
          className="w-10 h-10 rounded-full border-2 border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:border-on-surface disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
