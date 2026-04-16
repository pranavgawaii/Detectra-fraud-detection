"use client";

import React, { useEffect, useRef } from 'react';

export const TerminalTypewriter = () => {
  const twContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const snippets = [
        "const pipeline = await PredictionModel.init();\nif (pipeline.status === 'ready') {\n  await RiskEngine.scan(pipeline.data);\n}\n> Processing claims... [OK]",
        "const stream = new DataStream('hospital_node');\nstream.on('data', (claim) => {\n  SHAP.explain(claim);\n});\n> Anomalies found: 3"
    ];
    
    let sIdx = 0;
    let cIdx = 0;
    let isDeleting = false;
    let text = "";
    let timeoutId: NodeJS.Timeout;

    function highlight(code: string) {
      return code
        .replace(/(const|await|if|new)\b/g, '<span class="text-neutral-200">$1</span>')
        .replace(/('.*?')/g, '<span class="text-neutral-500">$1</span>')
        .replace(/(>.*)/g, '<span class="text-neutral-500">$1</span>')
        .replace(/  /g, '&nbsp;&nbsp;')
        .replace(/\\n/g, '<br>');
    }

    function type() {
      const currentSnippet = snippets[sIdx];
      
      if (isDeleting) {
          text = currentSnippet.substring(0, cIdx - 1);
          cIdx--;
      } else {
          text = currentSnippet.substring(0, cIdx + 1);
          cIdx++;
      }

      if (twContainerRef.current) {
        twContainerRef.current.innerHTML = highlight(text) + '<span class="inline-block w-[6px] h-3.5 bg-neutral-400 ml-[1px] align-middle animate-pulse"></span>';
      }

      let typeSpeed = isDeleting ? 20 : 50;

      if (!isDeleting && text === currentSnippet) {
          typeSpeed = 2000;
          isDeleting = true;
      } else if (isDeleting && text === "") {
          isDeleting = false;
          sIdx = (sIdx + 1) % snippets.length;
          typeSpeed = 500;
      }

      if (!isDeleting) {
          typeSpeed += Math.random() * 30;
      }

      timeoutId = setTimeout(type, typeSpeed);
    }
    
    timeoutId = setTimeout(type, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return <div ref={twContainerRef} className="text-neutral-400">c<span className="inline-block w-[6px] h-3.5 bg-neutral-400 ml-[1px] align-middle animate-pulse"></span></div>;
};
