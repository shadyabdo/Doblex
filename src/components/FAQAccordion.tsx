import { useState } from "react";
import { useLang } from "../i18n";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  color?: string;
}

export function FAQAccordion({ items, color = "#0B7C74" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { lang } = useLang();

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border border-line bg-surface transition-all duration-300 hover:shadow-md"
        >
          <button
            onClick={() => toggleItem(index)}
            className="flex w-full items-center justify-between gap-4 p-4 text-start sm:p-5"
          >
            <span className="font-display text-sm font-bold text-ink sm:text-base md:text-lg">
              {item.question}
            </span>
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                openIndex === index ? "rotate-45" : ""
              }`}
              style={{ background: openIndex === index ? color : `${color}20`, color: openIndex === index ? "#fff" : color }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="h-4 w-4"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </button>
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="border-t border-line px-4 py-4 sm:px-5 sm:py-5">
                <p className="text-sm leading-[1.8] text-ink-soft sm:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * يحلل المحتوى ويستخرج الأسئلة والأجوبة
 * يتعرف على الأنماط التالية:
 * - سطر ينتهي بـ ؟ أو ? (سؤال)
 * - السطر اللي بعده يكون الإجابة
 */
export function extractFAQs(paragraphs: string[]): { content: string[]; faqs: FAQItem[] } {
  const content: string[] = [];
  const faqs: FAQItem[] = [];
  
  let i = 0;
  while (i < paragraphs.length) {
    const para = paragraphs[i];
    const trimmed = para.trim();
    
    // نتحقق لو السؤال ينتهي بعلامة استفهام
    const isQuestion = trimmed.endsWith("؟") || trimmed.endsWith("?");
    
    if (isQuestion && i + 1 < paragraphs.length) {
      // لو في سطر بعده، نعتبره إجابة
      const answer = paragraphs[i + 1].trim();
      
      // نتأكد إن الإجابة مش سؤال تاني
      const isAnswerQuestion = answer.endsWith("؟") || answer.endsWith("?");
      
      if (!isAnswerQuestion && answer.length > 0) {
        faqs.push({
          question: trimmed,
          answer: answer,
        });
        i += 2; // نتخطى السؤال والإجابة
        continue;
      }
    }
    
    // لو مش سؤال، نضيفه للمحتوى العادي
    content.push(para);
    i++;
  }
  
  return { content, faqs };
}
