'use client';

import { useRef, useEffect, useState } from 'react';

interface InlineEditProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  multiline?: boolean;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function InlineEdit({
  value,
  onChange,
  placeholder = 'Clique para editar…',
  className = '',
  multiline = false,
}: InlineEditProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef<HTMLTextAreaElement & HTMLInputElement>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      ref.current.select();
    }
  }, [editing]);

  function commit() {
    setEditing(false);
    if (draft !== value) onChange(draft);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setDraft(value);
      setEditing(false);
    }
    if (!multiline && e.key === 'Enter') {
      commit();
    }
  }

  if (editing) {
    const shared = {
      ref,
      value: draft,
      onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
        setDraft(e.target.value),
      onBlur: commit,
      onKeyDown: handleKey,
      placeholder,
      className: `w-full bg-transparent outline-none border-b border-[#C9B99A] focus:border-[#A8B5A2] ${className}`,
    };
    if (multiline) {
      return (
        <textarea
          {...(shared as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          ref={ref as React.RefObject<HTMLTextAreaElement>}
          rows={3}
          className={`${shared.className} resize-none`}
        />
      );
    }
    return (
      <input
        {...(shared as React.InputHTMLAttributes<HTMLInputElement>)}
        ref={ref as React.RefObject<HTMLInputElement>}
        type="text"
      />
    );
  }

  return (
    <span
      onClick={() => setEditing(true)}
      className={`cursor-text hover:opacity-70 transition-opacity ${!value ? 'opacity-30 italic' : ''} ${className}`}
      title="Clique para editar"
    >
      {value || placeholder}
    </span>
  );
}
