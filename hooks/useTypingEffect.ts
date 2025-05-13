import { useState, useEffect } from 'react';

/**
 * A custom hook that creates a typing effect for text.
 * @param text - The text to be typed out character by character
 * @param speed - The typing speed in milliseconds per character (default: 30)
 * @returns The text that has been typed out so far
 */
export function useTypingEffect(text: string | undefined | null, speed: number = 30) {
  // --- Restore Original Logic ---
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Handle empty or null text
    if (!text) {
      setDisplayedText('');
      setIsComplete(true);
      return;
    }

    // Start immediately with the first character
    setDisplayedText(text.charAt(0));
    setIsComplete(text.length <= 1); // Mark complete if text has only 1 char

    // If there are more characters, set up timeouts for the rest
    let i = 1; // Start index from the second character
    let timeoutId: NodeJS.Timeout | undefined;

    const typeRestOfCharacters = () => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
        timeoutId = setTimeout(typeRestOfCharacters, speed);
      } else {
        setIsComplete(true);
      }
    };

    if (text.length > 1) {
       // Schedule the typing for the rest of the string
       timeoutId = setTimeout(typeRestOfCharacters, speed);
    }

    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [text, speed]);
  // --- End Original Logic ---

  return { displayedText, isComplete };
} 