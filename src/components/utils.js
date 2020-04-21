export const displayTemp = (temp, units='imperial') => 
  `${Math.round(temp)}° ${units === 'metric' ? 'C' : 'F' }`;