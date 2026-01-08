import { useState, useCallback } from 'react';

export const useSearch = (initialValue = '') => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);
  
  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);
  
  return {
    searchQuery,
    handleSearchChange,
    clearSearch
  };
};