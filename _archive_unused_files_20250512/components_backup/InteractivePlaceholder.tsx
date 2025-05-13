import React, { useRef, useState, useEffect } from 'react';

interface InteractivePlaceholderProps {
  placeholderKey: string;
  value: string;
  guidance: string;
  examples: string[];
  onUpdate: (value: string) => void;
}

const InteractivePlaceholder: React.FC<InteractivePlaceholderProps> = ({
  placeholderKey,
  value,
  guidance,
  examples,
  onUpdate,
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) setInputValue(value || '');
  }, [open, value]);

  // Close popover on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <span className="relative inline-block align-baseline">
      <button
        type="button"
        className={`px-1 py-0.5 rounded bg-sg-mint-green/40 border border-sg-mint-green text-sg-dark-teal font-semibold underline decoration-dotted cursor-pointer transition hover:bg-sg-mint-green/70 focus:outline-none focus:ring-2 focus:ring-sg-mint-green`}
        onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`Edit ${placeholderKey}`}
      >
        {value ? <span className="font-bold">{value}</span> : `{{${placeholderKey}}}`}
      </button>
      {open && (
        <div
          ref={ref}
          className="z-50 absolute left-1/2 -translate-x-1/2 mt-2 min-w-[320px] max-w-xs bg-white border border-sg-mint-green rounded-xl shadow-xl p-4 animate-fade-in"
          style={{ top: '2.2em' }}
          role="dialog"
          aria-modal="true"
        >
          <div className="mb-2 text-sg-dark-teal font-bold text-base">{placeholderKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
          <div className="mb-2 text-gray-700 text-sm">{guidance}</div>
          <div className="mb-2 text-xs text-gray-500">
            <span className="font-semibold">Examples:</span>
            <ul className="list-disc ml-5 mt-1">
              {examples.map((ex, i) => (
                <li key={i} className="mb-0.5">{ex}</li>
              ))}
            </ul>
          </div>
          <input
            className="w-full border border-sg-mint-green rounded-lg p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sg-mint-green mb-2"
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder={placeholderKey.replace(/_/g, ' ')}
            autoFocus
            onKeyDown={e => { if (e.key === 'Enter') { onUpdate(inputValue); setOpen(false); } }}
          />
          <div className="flex justify-end gap-2">
            <button
              className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-semibold"
              onClick={() => setOpen(false)}
              type="button"
            >Cancel</button>
            <button
              className="px-3 py-1 rounded bg-sg-mint-green text-sg-dark-teal font-bold hover:bg-sg-mint-green/80 text-sm"
              onClick={() => { onUpdate(inputValue); setOpen(false); }}
              type="button"
            >Update</button>
          </div>
        </div>
      )}
    </span>
  );
};

export default InteractivePlaceholder; 