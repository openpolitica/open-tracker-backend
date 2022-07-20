const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const ApiError = require('./ApiError');
dayjs.extend(customParseFormat);

function parseStringWithFormat(dateStr, format) {
  const parsedDate = dayjs(dateStr, format, true);
  if (!parsedDate.isValid()) {
    throw new ApiError('Unsopported Date format', 400);
  }
  return parsedDate.toDate();
}

function parseDateToFormat(date, output_format) {
  return dayjs(date).format(output_format);
}

module.exports = {
  parseStringWithFormat,
  parseDateToFormat,
};
