import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from '@phosphor-icons/react';
import { useI18n, Language } from '@/i18n';
import { toast } from 'sonner';

interface LanguageSelectorProps {
  className?: string;
}

export function LanguageSelector({ className }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useI18n();
  const [isChanging, setIsChanging] = useState(false);

  const languages = [
    { code: 'en' as Language, name: t.english, flag: '🇺🇸', nativeName: 'English' },
    { code: 'sv' as Language, name: t.swedish, flag: '🇸🇪', nativeName: 'Svenska' },
    { code: 'de' as Language, name: t.german, flag: '🇩🇪', nativeName: 'Deutsch' },
    { code: 'fr' as Language, name: t.french, flag: '🇫🇷', nativeName: 'Français' },
    { code: 'am' as Language, name: t.amharic, flag: '🇪🇹', nativeName: 'አማርኛ' }
  ];

  const handleLanguageChange = (newLanguage: Language) => {
    setIsChanging(true);
    setLanguage(newLanguage);
    
    // Show toast notification in the new language
    setTimeout(() => {
      if (newLanguage === 'en') {
        toast.success(`Language changed to English`);
      } else if (newLanguage === 'sv') {
        toast.success(`Språk ändrat till Svenska`);
      } else if (newLanguage === 'de') {
        toast.success(`Sprache geändert zu Deutsch`);
      } else if (newLanguage === 'fr') {
        toast.success(`Langue changée en Français`);
      } else if (newLanguage === 'am') {
        toast.success(`ቋንቋ ወደ አማርኛ ተቀይሯል`);
      }
      setIsChanging(false);
    }, 100);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Globe 
        size={16} 
        className={`text-muted-foreground transition-transform duration-300 ${
          isChanging ? 'rotate-180' : ''
        }`} 
      />
      <Select value={language} onValueChange={handleLanguageChange}>
        <SelectTrigger className={`w-[160px] h-8 transition-all duration-300 ${
          isChanging ? 'scale-105 border-primary/50' : ''
        }`}>
          <SelectValue>
            <span className="flex items-center gap-2">
              {languages.find(lang => lang.code === language)?.flag}
              <span className="hidden sm:inline">
                {languages.find(lang => lang.code === language)?.name}
              </span>
              <span className="sm:hidden">
                {languages.find(lang => lang.code === language)?.nativeName}
              </span>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              <div className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <div className="flex flex-col">
                  <span className="font-medium">{lang.nativeName}</span>
                  <span className="text-xs text-muted-foreground">{lang.name}</span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}