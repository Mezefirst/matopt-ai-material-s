import { useState, useEffect, useCallback } from 'react';

export function useKV<T>(key: string, defaultValue: T): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [value, setValue] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial value
  useEffect(() => {
    const loadValue = async () => {
      try {
        const storedValue = await spark.kv.get<T>(key);
        if (storedValue !== undefined) {
          setValue(storedValue);
        }
      } catch (error) {
        console.error(`Failed to load KV value for key "${key}":`, error);
      } finally {
        setIsLoading(false);
      }
    };

    loadValue();
  }, [key]);

  // Update function
  const updateValue = useCallback((newValue: T | ((prev: T) => T)) => {
    setValue(prev => {
      const finalValue = typeof newValue === 'function' ? (newValue as (prev: T) => T)(prev) : newValue;
      
      // Persist to KV store
      spark.kv.set(key, finalValue).catch(error => {
        console.error(`Failed to save KV value for key "${key}":`, error);
      });
      
      return finalValue;
    });
  }, [key]);

  // Delete function
  const deleteValue = useCallback(() => {
    setValue(defaultValue);
    spark.kv.delete(key).catch(error => {
      console.error(`Failed to delete KV value for key "${key}":`, error);
    });
  }, [key, defaultValue]);

  return [value, updateValue, deleteValue];
}