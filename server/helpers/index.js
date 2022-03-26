import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export const trimMessage = (content = '', maxLength = 60) => {
  if (content.length > maxLength) {
    return `${content.substring(0, maxLength)}...`;
  }
  return content;
};

export const getParsedDate = date => {
  if (!date) {
    return '';
  }

  const parsedDate = format(parseISO(date), 'MMM dd, yyyy');
  return parsedDate;
};
