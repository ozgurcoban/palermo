import { useState } from 'react';

export const useChipExpansion = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllActive, setShowAllActive] = useState(false);
  const [justInteracted, setJustInteracted] = useState(false);

  const expandChips = () => setIsExpanded(true);
  const collapseChips = () => setIsExpanded(false);
  
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const setInteracted = () => {
    setJustInteracted(true);
    setTimeout(() => setJustInteracted(false), 1000);
  };

  const activateShowAll = () => {
    setShowAllActive(true);
    setIsExpanded(false);
  };

  const deactivateShowAll = () => {
    setShowAllActive(false);
  };

  return {
    isExpanded,
    showAllActive,
    justInteracted,
    expandChips,
    collapseChips,
    toggleExpanded,
    setInteracted,
    activateShowAll,
    deactivateShowAll
  };
};