import uuidv4 from 'uuid/v4'

const helper = {};

helper.toHHMMSS = function(value) {
    const sec_num = parseInt(value, 10);
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = `0${hours}` }
    if (minutes < 10) { minutes = `0${minutes}` }
    if (seconds < 10) { seconds = `0${seconds}` }
    return `${hours}:${minutes}:${seconds}`;
};

helper.createClips = function(stream, streamMoments) {
    const clips = [];
    let include = 0;
    let clipMoments = [];
    streamMoments.forEach(function(stream_moment, index) {
        if (!clipMoments.length || stream_moment.time - clipMoments[clipMoments.length - 1].time <= 5) {
            clipMoments.push(stream_moment);
            if (index !== streamMoments.length - 1) {
                return
            }
        }
        let time_in = clipMoments[0].time - 4;
        if (time_in < 0) {
            time_in = 0;
        }
        let time_out = clipMoments[clipMoments.length - 1].time + 1;
        if (time_out > stream.duration) {
            time_out = stream.duration;
        }
        let time_min = clipMoments[0].time - 10;
        if (time_min < 0) {
            time_min = 0;
        }
        let time_max = clipMoments[clipMoments.length - 1].time + 10;
        if (time_max > stream.duration) {
            time_max = stream.duration;
        }

        clips.push({
            uuid: uuidv4(),
            include: include++ < 50,
            time_in: parseInt(time_in),
            time_out: parseInt(time_out),
            time_min: parseInt(time_min),
            time_max: parseInt(time_max),
            moments: clipMoments,
        });
        clipMoments = [stream_moment];
    });

    return clips;
};

helper.setCookie = function (cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

helper.getCookie = function(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export default helper;
