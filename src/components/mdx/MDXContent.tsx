"use client";

import * as runtime from "react/jsx-runtime";
import { useMemo } from "react";

const sharedComponents = {
  // Custom components can be added here
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
