/**
 * Utility functions for handling system prompts and language instructions
 */

export function hasLanguageInstruction(text: string): boolean {
  if (!text) return false;
  
  const lowerText = text.toLowerCase();
  
  // Check for various language instruction patterns
  const patterns = [
    'you always respond in english',
    'you always respond in vietnamese', 
    'you always respond in tiếng việt',
    'respond in english',
    'respond in vietnamese',
    'respond in tiếng việt',
    'ngôn ngữ',
    'language:',
    'trả lời bằng',
    'answer in english',
    'answer in vietnamese'
  ];
  
  return patterns.some(pattern => lowerText.includes(pattern));
}

export function buildSystemPrompt(baseInstruction: string, language: string): string {
  const languageInstruction = language === "English" 
    ? `You always respond in English.`
    : `You always respond in Vietnamese.`;
  
  // If base instruction already has language directive, return as-is
  if (hasLanguageInstruction(baseInstruction)) {
    return baseInstruction;
  }
  
  // If no base instruction, return just language instruction
  if (!baseInstruction || baseInstruction.trim() === '') {
    return languageInstruction;
  }
  
  // Combine base instruction with language instruction
  return `${baseInstruction}\n\n${languageInstruction}`;
}
