const bodyParser = require('body-parser');

export const bodyParserConfig = () => {
  return [
    bodyParser.json({
      limit: process.env.PAYLOAD_LIMIT || '10kb',
    }),
    bodyParser.urlencoded({
      extended: true,
      limit: process.env.PAYLOAD_LIMIT || '10kb',
    }),
  ];
};
