"use client";

import * as runtime from "react/jsx-runtime";
import { useMemo, useRef, useState, ComponentPropsWithoutRef } from "react";
import { Check, Copy } from "lucide-react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      data-copy
      onClick={handleCopy}
      aria-label="코드 복사"
      className="absolute right-2 top-2 rounded-md border border-slate-200 bg-white/80 p-1.5 text-slate-500 opacity-0 backdrop-blur-sm transition-opacity hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:text-slate-100"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

function Pre({ children, ...props }: ComponentPropsWithoutRef<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [text, setText] = useState("");

  const handleMouseEnter = () => {
    if (preRef.current) {
      setText(preRef.current.textContent ?? "");
    }
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter}>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
      <CopyButton text={text} />
    </div>
  );
}

const sharedComponents = {
  pre: Pre,
};

const useMDXComponent = (code: string) => {
  return useMemo(() => {
    const fn = new Function(code);
    return fn({ ...runtime }).default;
  }, [code]);
};

interface MDXContentProps {
  code: string;
}

export default function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-pre:bg-transparent prose-pre:p-0">
      <Component components={sharedComponents} />
    </div>
  );
}
