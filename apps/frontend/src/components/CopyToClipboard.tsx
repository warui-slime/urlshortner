"use client"
import { CopyIcon, CheckIcon } from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";




export const CopyToClipboard = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="hover:text-primary transition-all hover:cursor-pointer"
    >
      {copied ? (
        <CheckIcon className="mt-1" width={15} height={15} />
      ) : (
        <>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <CopyIcon className="mt-1" width={15} height={15} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy</p>
              </TooltipContent>
            </Tooltip>

          </TooltipProvider>
        </>
      )}
    </button>
  );
};
