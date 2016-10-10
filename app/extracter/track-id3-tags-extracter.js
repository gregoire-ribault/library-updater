const Promise = require('bluebird');
const mediaInfoParser = Promise.promisifyAll(require('mediainfo-parser'));

function extractAlbumFromFile(filePath) {
    var data = mediaInfoParser.execAsync(filePath).
    then(function(obj) {
      obj.file.track.forEach(function(track) {
        if (track._type === 'General') {
          return {
            "name": track.album
          };
        }
      });
    })
  ;

  console.log(data);
};

// My great function
function extractAlbumFromFile(filePath) {
    return new Promise(function (resolve, reject) {
        var data = mediaInfoParser.execAsync(filePath).
        then(function(obj) {
            for (var i = 0; i < obj.file.track.length; i++) {
                if (obj.file.track[i]._type === 'General') {
                  resolve({
                    "name": obj.file.track[i].album
                  });
                }
            }
          });
        })
      ;
    });

  console.log(data);
};

function extractArtistFromFile(filePath) {

  return mediaInfoParser.execAsync(filePath).
    then(function(obj) {
      obj.file.track.forEach(function(track) {
        if (track._type === 'General') {
          return {
            "name": track.performer
          };
        }
      });
    })
  ;
};

function extractTrackFromFile(filePath) {
  return mediaInfoParser.execAsync(filePath).
    then(function(obj) {
      obj.file.track.forEach(function(track) {
      if (track._type === 'General') {
        return {
          "name": track.title,
          "number": track.trackNamePosition
        };
      }
    });
  });
};

module.exports = {
  extractAlbumFromFile,
  extractArtistFromFile,
  extractTrackFromFile
}
