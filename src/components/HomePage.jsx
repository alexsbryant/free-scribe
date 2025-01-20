import React, { useState, useEffect, useRef } from 'react';

function HomePage(props) {
    const { setAudioStream, setFile } = props;

    const [recStatus, setRecStatus] = useState('inactive');
    const [audioChunks, setAudioChunks] = useState([]);
    const [duration, setDuration] = useState(0);

    const mediaRecorder = useRef(null);

    const mineType = 'audio/webm';

    async function startRecording() {
        let tempStream;
        console.log('Started recording');

        try {
            const streamData = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            });
            tempStream = streamData;
        } catch (err) {
            console.log(err.message)
            return
        };

        setRecStatus('recording');

        // create new media recorder instance using the stream
        const media = new MediaRecorder(tempStream, { type: mineType })

        mediaRecorder.current = media;

        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === 'undefined') { return };
            if (event.data.size === 0) { return };
            localAudioChunks.push(event.data);
        }
        setAudioChunks(localAudioChunks);
        console.log(audioChunks);
    };

    async function stopRecording() {
        setRecStatus('inactive');
        console.log('Stopped recording');

        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: mineType });
            setAudioStream(audioBlob);
            setAudioChunks([]);
            setDuration(0);
        }
    };

    useEffect(() => {
        if (recStatus === 'inactive') { return };

        const interval = setInterval(() => {
            setDuration(curr => curr + 1)
        }, 1000);

        return () => clearInterval(interval);
    })

    useEffect(() => {
        console.log(recStatus)
      }, [recStatus]);

    return (      
        <main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 
        text-center justify-center pb-20'>
                {/* TITLE */}
            <h1 className='font-semibold text-5xl sm:text-6xl 
            md:text-7xl'>Free<span className='text-blue-400 bold'>Scribe</span></h1>
            <h3 className='font-medium md:text-lg'>Record <span
                className='text-blue-400'>&rarr;</span> Transcribe <span
                    className='text-blue-400'>&rarr;</span>Translate</h3>
                {/* RECORD BUTTON */}
            <button onClick={recStatus === 'recording' ? stopRecording : startRecording}
            className='flex specialBtn px-4 py-2 rounded-xl items-center 
            text-base justify-between gap-4 mx-auto w-72 max-w-full my-4'>
                <p className='text-blue-400'>
                    {recStatus === 'inactive' ? 'Record' : `Stop recording`}</p>
                <div className='flex items-center gap-2'>
                    {duration !== 0 && (
                        <p className='text-sm'>{duration}s</p>
                    )}
                    <i className={"fa-solid duration-200 fa-microphone " + 
                        (recStatus === 'recording' ? ' text-rose-300' : ""
                        )}></i>
                </div>
            </button>
                {/* UPLOAD BUTTON */}
            <p className='text-base'>Or <label className='text-blue-400 cursor-pointer 
            hover:text-blue-600 duration-200'>Upload
                <input onChange={(e) => {
                    const tempFile = e.target.files[0];
                    setFile(tempFile);
                }}
                    className='hidden' type='file' accept='.mp3,.wave' />
            </label> an mp3 file</p>
            <p className='italic text-slate-400'>Free now, free forever!</p>
        </main>
    )
};

/*
    NOTES: 
        -Mic diassapearing, not turning 'rose',
        -Seconds showing as 0s before recording begins,
        -duration state did not reset
*/


export default HomePage;