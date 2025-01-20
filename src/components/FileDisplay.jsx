import React from 'react'

function FileDisplay(props) {
    const { file, audioStream, handleAudioReset } = props;

    return (
        <main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 
        text-center justify-center pb-20'>
            <h1 className='font-semibold text-4xl sm:text-5xl 
            md:text-6xl'>Your 
            <span className='text-blue-400 bold'>File</span></h1>
        </main>
    )
}

export default FileDisplay;