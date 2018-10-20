const helper = {};

helper.getClipsFromMoments = function(stream, stream_moments) {
    const clips = [];
    let clip_moments = [];
    stream.moments.forEach(function (sm, index) {
        if (!clip_moments.length || sm.time - clip_moments[clip_moments.length - 1].time <= 5) {
            clip_moments.push(sm);
        }
        else {
            let time_in = clip_moments[0].time - 5;
            if (time_in < 0) {
                time_in = 0;
            }

            let time_out = clip_moments[clip_moments.length - 1].time + 2;
            if (time_out > stream.duration) {
                time_out = stream.duration;
            }

            clips.push({
                include: true,
                time_in: time_in,
                time_out: time_out,
                moments: clip_moments,
            });
            clip_moments = [];
        }
    });
    return clips;
};

export default helper;

