import React from "react";
import { cn } from "@/lib/utils"; 

const tags = ["Low Speed", "Priority", "Danger", "Needs Attention", "Priorityy", "Dangerr"];

interface TagSelectorProps {
title: string | null;
  selectedTag: string | null;
  onSelect: (tag: string) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({title,  selectedTag, onSelect }) => {
  return (
    <div className="flex flex-col">
    {title && <p className='text-zinc-200 text-sm font-normal'>{title}</p>}
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag) => (
        <button
          key={tag}
          className={cn(
            "px-3 py-1 rounded-full text-xs text-[#D4D4D8] font-medium border",
            selectedTag === tag
              ? "border-2 border-[#2563EB] "
              : " border-[#27272A] hover:border-[#2563EB]"
          )}
          onClick={() => onSelect(tag)}
        >
          #{tag}
        </button>
      ))}
    </div>
    </div>
  );
};

export default TagSelector;
