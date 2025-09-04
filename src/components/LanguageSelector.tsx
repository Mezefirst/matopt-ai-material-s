import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from '@phosphor-icons/react';
import { useI18n, Language } from '@/i18n';

interface LanguageSelectorProps {
  className?: string;
}

export function LanguageSelector({ className }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useI18n();

  const languages = [
    { code: 'en' as Language, name: t.english, flag: '🇺🇸' },
    { code: 'sv' as Language, name: t.swedish, flag: '🇸🇪' },
    { code: 'de' as Language, name: t.german, flag: '🇩🇪' },
    { code: 'fr' as Language, name: t.french, flag: '🇫🇷' }
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Globe size={16} className="text-muted-foreground" />
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger className="w-[160px] h-8">
          <SelectValue>
            <span className="flex items-center gap-2">
              {languages.find(lang => lang.code === language)?.flag}
              {languages.find(lang => lang.code === language)?.name}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              <span className="flex items-center gap-2">
                {lang.flag}
                {lang.name}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}