import moment from 'moment';

const formatDate = (value, format) => {
  if (value) {
    switch (value) {
      case 'null':
        return null;
      case 'undefined':
      case -Infinity:
        return undefined;
      default:
        return format ? new moment(value).format(format) : new moment(value).format();
    }
  } else {
    return null;
  }
};

formatDate.id = 'formatDate';
formatDate.label = 'formatDate(any, format)';
formatDate.description = 'Converts date argument to formatted string. Works on array children.';
formatDate.tags = ['convert', 'date'];
formatDate.type = 'Identifier';

export default formatDate;
