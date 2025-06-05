export const formatDateToLocalString = (date) => {
  // Convertir a hora de Colombia antes de formatear
  const colombiaDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
  
  const year = colombiaDate.getFullYear();
  const month = String(colombiaDate.getMonth() + 1).padStart(2, '0');
  const day = String(colombiaDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const fixTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  // Restar 7 horas para corregir (ajustá según necesidad)
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
  // Fecha actual en Colombia
  const today = new Date();
  const todayColombia = new Date(today.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
  todayColombia.setHours(0, 0, 0, 0);
  
  // Fecha del mensaje en Colombia
  const msgDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
  const dateMidnight = new Date(msgDate);
  dateMidnight.setHours(0, 0, 0, 0);
  
  // Calcular diferencia en días (según hora colombiana)
  const diffTime = todayColombia - dateMidnight;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "hoy";
  if (diffDays === 1) return "ayer";
  if (diffDays === 2) return "antier";
  if (diffDays >= 3 && diffDays <= 6) {
    const daysOfWeek = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    return daysOfWeek[dateMidnight.getDay()];
  }
  
  // Formatear fecha en formato colombiano (DD/MM/YYYY)
  const day = String(dateMidnight.getDate()).padStart(2, '0');
  const month = String(dateMidnight.getMonth() + 1).padStart(2, '0');
  const year = dateMidnight.getFullYear();
  return `${day}/${month}/${year}`;
};