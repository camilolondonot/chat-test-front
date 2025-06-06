export const formatDateToLocalString = (date) => {
  const colombiaDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
  
  const year = colombiaDate.getFullYear();
  const month = String(colombiaDate.getMonth() + 1).padStart(2, '0');
  const day = String(colombiaDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const fixTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  date.setHours(date.getHours() - 7);
  return date;
}

export const formatToColombianTime = (timestamp) => {
  const fixedDate = fixTimestamp(timestamp);
  return fixedDate.toLocaleString('es-CO', {
    timeZone: 'America/Bogota',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};




export const getSeparatorText = (date) => {
  const today = new Date();
  const todayColombia = new Date(today.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
  todayColombia.setHours(0, 0, 0, 0);
  
  const msgDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
  const dateMidnight = new Date(msgDate);
  dateMidnight.setHours(0, 0, 0, 0);
  
  const diffTime = todayColombia - dateMidnight;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Hoy";
  if (diffDays === 1) return "Ayer";
  if (diffDays === 2) return "Antier";
  if (diffDays >= 3 && diffDays <= 6) {
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return daysOfWeek[dateMidnight.getDay()];
  }
  
  const day = String(dateMidnight.getDate()).padStart(2, '0');
  const month = String(dateMidnight.getMonth() + 1).padStart(2, '0');
  const year = dateMidnight.getFullYear();
  return `${day}/${month}/${year}`;
};