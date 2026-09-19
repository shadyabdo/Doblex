import { useLang } from "../i18n";

// أنواع المحتوى المختلفة
export type ContentBlock =
  | { type: "text"; content: string }
  | { type: "highlight"; content: string }
  | { type: "callout"; content: string }
  | { type: "faq"; question: string; answer: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "comparison"; title: string; items: { label: string; left: string; right: string }[] };

/**
 * يحلل المحتوى ويستخرج الأنماط المختلفة
 * ملاحظة: FAQs و Comparisons بتيجي من Firestore مباشرة، مش من الـ parser
 */
export function parseContent(paragraphs: string[]): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  let i = 0;

  while (i < paragraphs.length) {
    const para = paragraphs[i];
    const trimmed = para.trim();

    // 1. جدول Markdown (يبدأ بـ |)
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      const tableBlock = parseMarkdownTable(paragraphs, i);
      if (tableBlock && tableBlock.table.rows.length >= 1) {
        blocks.push(tableBlock.table);
        i = tableBlock.nextIndex;
        continue;
      }
    }

    // 2. Highlight line (يبدأ بـ -)
    if (trimmed.startsWith("-") || trimmed.startsWith("—") || trimmed.startsWith("–")) {
      const content = trimmed.substring(1).trim();
      if (content.length > 0) {
        blocks.push({ type: "highlight", content });
        i++;
        continue;
      }
    }

    // 3. عنوان فرعي (يبدأ برقم ونقطة مثل "1." أو "2.")
    if (/^\d+\./.test(trimmed)) {
      blocks.push({ type: "highlight", content: trimmed });
      i++;
      continue;
    }

    // 4. Callout (نص بين [ ])
    const calloutMatch = trimmed.match(/^\[(.+)\]$/);
    if (calloutMatch) {
      blocks.push({ type: "callout", content: calloutMatch[1] });
      i++;
      continue;
    }

    // 5. نص عادي - الافتراضي
    blocks.push({ type: "text", content: para });
    i++;
  }

  return blocks;
}

/**
 * يحلل جدول Markdown
 */
function parseMarkdownTable(paragraphs: string[], startIndex: number) {
  const lines: string[] = [];
  let i = startIndex;

  // نجمع كل الأسطر اللي بتبدأ بـ |
  while (i < paragraphs.length && paragraphs[i].trim().startsWith("|")) {
    lines.push(paragraphs[i].trim());
    i++;
  }

  if (lines.length < 2) return null;

  // نستخرج الـ headers من أول سطر
  const headers = lines[0]
    .split("|")
    .map((cell) => cell.trim())
    .filter((cell) => cell.length > 0);

  // نتخطى سطر الـ separator (---|---|---)
  const dataStartIndex = lines[1].includes("---") ? 2 : 1;

  // نستخرج الـ rows
  const rows: string[][] = [];
  for (let j = dataStartIndex; j < lines.length; j++) {
    const row = lines[j]
      .split("|")
      .map((cell) => cell.trim())
      .filter((cell) => cell.length > 0);
    
    if (row.length === headers.length) {
      rows.push(row);
    }
  }

  if (rows.length === 0) return null;

  return {
    table: { type: "table" as const, headers, rows },
    nextIndex: i,
  };
}

/**
 * يحلل جدول بسيط (أسطر فيها - أو :)
 */
function parseSimpleTable(paragraphs: string[], startIndex: number) {
  const rows: string[][] = [];
  let i = startIndex;

  // نجمع كل الأسطر اللي فيها - أو :
  while (i < paragraphs.length) {
    const trimmed = paragraphs[i].trim();
    
    if (trimmed.includes(" - ")) {
      const parts = trimmed.split(" - ").map((p) => p.trim());
      if (parts.length >= 2) {
        rows.push(parts);
        i++;
        continue;
      }
    } else if (trimmed.includes(" : ")) {
      const parts = trimmed.split(" : ").map((p) => p.trim());
      if (parts.length >= 2) {
        rows.push(parts);
        i++;
        continue;
      }
    } else {
      break;
    }
  }

  if (rows.length < 2) return null;

  // أول صف هو الـ headers
  const headers = rows[0];
  const dataRows = rows.slice(1);

  return {
    table: { type: "table" as const, headers, rows: dataRows },
    nextIndex: i,
  };
}

/**
 * يتحقق لو السطر بداية مقارنة
 */
function isComparison(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes("قبل") ||
    lower.includes("بعد") ||
    lower.includes("vs") ||
    lower.includes("مقارنة") ||
    lower.includes("الفرق بين")
  );
}

/**
 * يحلل مقارنة
 */
function parseComparison(paragraphs: string[], startIndex: number) {
  const title = paragraphs[startIndex].trim();
  const items: { label: string; left: string; right: string }[] = [];
  let i = startIndex + 1;

  // نجمع كل أسطر المقارنة
  while (i < paragraphs.length) {
    const trimmed = paragraphs[i].trim();
    
    // نمط: "العنوان: القيمة الأولى | القيمة الثانية"
    if (trimmed.includes(":") && trimmed.includes("|")) {
      const [label, values] = trimmed.split(":").map((p) => p.trim());
      const [left, right] = values.split("|").map((p) => p.trim());
      
      if (label && left && right) {
        items.push({ label, left, right });
        i++;
        continue;
      }
    }
    
    // نمط: "العنوان - القيمة الأولى - القيمة الثانية"
    const parts = trimmed.split(" - ");
    if (parts.length === 3) {
      items.push({
        label: parts[0].trim(),
        left: parts[1].trim(),
        right: parts[2].trim(),
      });
      i++;
      continue;
    }
    
    break;
  }

  if (items.length === 0) return null;

  return {
    comparison: { type: "comparison" as const, title, items },
    nextIndex: i,
  };
}

/**
 * مكون عرض الجدول
 */
export function DataTable({ headers, rows, color = "#0B7C74" }: { 
  headers: string[]; 
  rows: string[][];
  color?: string;
}) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border-2" style={{ borderColor: color }}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: color }}>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-right text-sm font-bold text-white sm:px-6 sm:text-base"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-t transition-colors hover:bg-gray-50"
                style={{ borderColor: `${color}30` }}
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="px-4 py-3 text-right text-sm text-ink sm:px-6 sm:text-base"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * مكون عرض المقارنة
 */
export function ComparisonTable({ 
  title, 
  items, 
  color = "#0B7C74" 
}: { 
  title: string; 
  items: { label: string; left: string; right: string }[];
  color?: string;
}) {
  const { lang } = useLang();
  
  return (
    <div className="my-6 overflow-hidden rounded-xl border-2" style={{ borderColor: color }}>
      <div className="px-4 py-3 sm:px-6" style={{ backgroundColor: `${color}15` }}>
        <h3 className="text-lg font-bold sm:text-xl" style={{ color }}>
          {title}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: color }}>
              <th className="px-4 py-3 text-right text-sm font-bold text-white sm:px-6 sm:text-base">
                {lang === "ar" ? "البند" : "Item"}
              </th>
              <th className="px-4 py-3 text-right text-sm font-bold text-white sm:px-6 sm:text-base">
                {lang === "ar" ? "قبل" : "Before"}
              </th>
              <th className="px-4 py-3 text-right text-sm font-bold text-white sm:px-6 sm:text-base">
                {lang === "ar" ? "بعد" : "After"}
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr
                key={i}
                className="border-t transition-colors hover:bg-gray-50"
                style={{ borderColor: `${color}30` }}
              >
                <td className="px-4 py-3 text-right text-sm font-semibold text-ink sm:px-6 sm:text-base">
                  {item.label}
                </td>
                <td className="px-4 py-3 text-right text-sm text-red-600 sm:px-6 sm:text-base">
                  {item.left}
                </td>
                <td className="px-4 py-3 text-right text-sm text-green-600 sm:px-6 sm:text-base">
                  {item.right}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
