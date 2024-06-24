import React, { useState, useEffect } from 'react';
import { Smile, ExternalLink, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Prompt {
  text: string;
  icon: string;
}

const PromptEngineeringForm: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [icon, setIcon] = useState<string>('💡');
  const [savedPrompts, setSavedPrompts] = useState<Prompt[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedPrompts = localStorage.getItem('savedPrompts');
    setSavedPrompts(storedPrompts ? JSON.parse(storedPrompts) : []);
  }, []);

  const savePrompt = (): void => {
    if (prompt.trim()) {
      try {
        const newPrompts = editingIndex !== null
          ? savedPrompts.map((p, i) => i === editingIndex ? { text: prompt, icon } : p)
          : [...savedPrompts, { text: prompt, icon }];

        setSavedPrompts(newPrompts);
        localStorage.setItem('savedPrompts', JSON.stringify(newPrompts));
        setPrompt('');
        setIcon('💡');
        setEditingIndex(null);
        setError(null);
      } catch (err) {
        console.error('Error saving prompt:', err);
        setError('Failed to save prompt. Please try again.');
      }
    }
  };

  const editPrompt = (index: number): void => {
    const promptToEdit = savedPrompts[index];
    setPrompt(promptToEdit.text);
    setIcon(promptToEdit.icon);
    setEditingIndex(index);
  };

  const deletePrompt = (index: number): void => {
    try {
      const newPrompts = savedPrompts.filter((_, i) => i !== index);
      setSavedPrompts(newPrompts);
      localStorage.setItem('savedPrompts', JSON.stringify(newPrompts));
      setError(null);
    } catch (err) {
      console.error('Error deleting prompt:', err);
      setError('Failed to delete prompt. Please try again.');
    }
  };

  const openInChatGPT = (promptText: string): void => {
    const encodedPrompt = encodeURIComponent(promptText);
    window.open(`https://chatgpt.com/?q=${encodedPrompt}`, '_blank');
  };

  const openInPerplexity = (promptText: string): void => {
    const encodedPrompt = encodeURIComponent(promptText);
    window.open(`https://www.perplexity.ai/search?q=${encodedPrompt}`, '_blank');
  };

  const openInPhind = (promptText: string): void => {
    const encodedPrompt = encodeURIComponent(promptText);
    window.open(`https://www.phind.com/search?q=${encodedPrompt}`, '_blank');
  };

  const openInClaude = (promptText: string): void => {
    const encodedPrompt = encodeURIComponent(promptText);
    window.open(`https://claude.ai/chat?q=${encodedPrompt}`, '_blank');
  };

  const copyToClipboard = (index: number, promptText: string): void => {
    navigator.clipboard.writeText(promptText).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const emojis: string[] = ['💡', '🤖', '💬', '📝', '🎨', '🧠', '🔍', '📊', '🚀', '🌟'];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Prompteca</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-10 h-10 p-0">
                {icon}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <div className="grid grid-cols-5 gap-2 p-2">
                {emojis.map((emoji) => (
                  <Button
                    key={emoji}
                    variant="ghost"
                    className="w-10 h-10 p-0"
                    onClick={() => setIcon(emoji)}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Textarea
            placeholder="Enter your prompt here..."
            value={prompt}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value.slice(0, 8000))}
            className="flex-1"
            rows={4}
          />
        </div>
        <div className="text-sm text-gray-500 mb-4">
          {prompt.length}/8000 characters
        </div>
        <Button onClick={savePrompt} className="w-full">
          {editingIndex !== null ? 'Update Prompt' : 'Save Prompt'}
        </Button>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex-col items-stretch">
        <h3 className="text-lg font-semibold mb-2">Saved Prompts</h3>
        {savedPrompts.length === 0 ? (
          <p className="text-gray-500">No saved prompts yet. Create your first prompt above!</p>
        ) : (
          savedPrompts.map((savedPrompt, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
              <span className="mr-2">{savedPrompt.icon}</span>
              <span className="flex-1 truncate">{savedPrompt.text}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={() => openInChatGPT(savedPrompt.text)}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Open in ChatGPT</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={() => openInPhind(savedPrompt.text)}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Open in Phind</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={() => openInPerplexity(savedPrompt.text)}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Open in Perplexity</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(index, savedPrompt.text)}>
                      {copiedIndex === index ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{copiedIndex === index ? 'Copied!' : 'Copy to clipboard'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button variant="ghost" size="sm" onClick={() => editPrompt(index)}>Edit</Button>
              <Button variant="ghost" size="sm" onClick={() => deletePrompt(index)}>Delete</Button>
            </div>
          ))
        )}
      </CardFooter>
    </Card>
  );
};

export default PromptEngineeringForm;