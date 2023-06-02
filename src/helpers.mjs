import * as fs from 'node:fs';
import * as path from 'node:path';

const helpers = {};

helpers.getTemplate = function (templateName, data, callback) {
  templateName =
    typeof templateName == 'string' && templateName.length > 0
      ? templateName
      : false;
  data = typeof data == 'object' && data !== null ? data : {};
  if (templateName) {
    const templatesDir = path.join(__dirname, '/../templates/');
    fs.readFile(
      templatesDir + templateName + '.html',
      'utf8',
      function (err, str) {
        if (!err && str && str.length > 0) {
          // Do interpolation on the string
          const finalString = helpers.interpolate(str, data);
          callback(false, finalString);
        } else {
          callback('No template could be found');
        }
      },
    );
  } else {
    callback('A valid template name was not specified');
  }
};

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = (str) => {
  try {
    var obj = JSON.parse(str);
    return obj;
  } catch (e) {
    return {};
  }
};

export { helpers };
