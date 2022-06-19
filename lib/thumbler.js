const { exec } = require('child_process');

module.exports = {
  extract: function(path, destPath, time, size, callback) {
    if (time == null) {
      time = '00:00:01';
    }
    if (size == null) {
      size = '320x180';
    }
    return exec('ffmpeg -ss ' + time + ' -i ' + `"${path}"` + ' -y -s ' + size + ' -vframes 1 -f image2 ' + `"${destPath}"`, function( err ) {
      if (callback) {
        return callback( err );
      }
    });
  }
};
