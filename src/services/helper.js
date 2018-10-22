import uuidv4 from 'uuid/v4'

const helper = {};

helper.createClips = function(stream, stream_moments) {
    const clips = [];
    let clip_moments = [];
    stream_moments.forEach(function(stream_moment) {
        if (!clip_moments.length || stream_moment.time - clip_moments[clip_moments.length - 1].time <= 5) {
            clip_moments.push(stream_moment);
        } else {
            let time_in = clip_moments[0].time - 4;
            if (time_in < 0) {
                time_in = 0;
            }
            let time_out = clip_moments[clip_moments.length - 1].time + 1;
            if (time_out > stream.duration) {
                time_out = stream.duration;
            }
            let time_min = clip_moments[0].time - 10;
            if (time_min < 0) {
                time_min = 0;
            }
            let time_max = clip_moments[clip_moments.length - 1].time + 10;
            if (time_max > stream.duration) {
                time_max = stream.duration;
            }

            clips.push({
                uuid: uuidv4(),
                include: true,
                time_in: parseInt(time_in),
                time_out: parseInt(time_out),
                time_min: parseInt(time_min),
                time_max: parseInt(time_max),
                moments: clip_moments,
            });
            clip_moments = [];
        }
    });

    return clips;
};

export default helper;