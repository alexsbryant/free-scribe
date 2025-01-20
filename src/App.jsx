import { useState, useEffect, useRef } from 'react'
import './App.css'
import HomePage from './components/HomePage';
import Header from './components/Header';
import FileDisplay from './components/FileDisplay';
import Information from './components/Information';
import Transcribing from './components/Transcribing';

function App() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [output, setOutput] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finsihed, setFinished] = useState(false);

  const isAudioAvailable = file || audioStream;

  function handleAudioReset() {
    setFile(null);
    setAudioStream(null);
  };

  const worker = useRef(null);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL('./utils/whisper.worker.js', import.meta.url), {
          type: 'module'
        })
    }

    const onMessageReceived = async (e) => {
      switch (e.data.type) {
        case 'DOWNLOADING':
          setDownloading(true);
          console.log('DOWNLOADING');
          break;
        case 'LOADING':
          setLoading(true);
          console.log('LOADING');
          break; 
        case 'RESULT':
          setOutput(e.data.results);
          break;
        case 'INFERENCE_DONE':
          setFinished(true);
          console.log('DONE');
          break;
      }
    }

    worker.current.addEventListener('message', onMessageReceived);

    return () => worker.current.removeEventListener
    ('message', onMessageReceived);

  }, []);

  async function readAudioFrom(file) {
    const samping_rate = 16000;
    const audioCTX = new AudioContext({sampleRate: samping_rate});
    const response = await file.arrayBuffer();
    const decoded = await audioCTX.decodeAudioData(response);
    const audio = decoded.getChannelData(0);
    return audio;

  }
  
/*   useEffect(() => {
    console.log(audioStream)
  }, [audioStream]); */

  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full">
      <section className='min-h-screen flex flex-col'>
        <Header />
        {output ? (
          <Information />
        ) : loading ? (
          <Transcribing />
        ) : isAudioAvailable ? (
          <FileDisplay 
            file={file} 
            audioStream={audioStream} 
            handleAudioReset={handleAudioReset} />
        ) : ( 
          <HomePage 
          setFile={setFile} 
          setAudioStream={setAudioStream} />
        )}
      </section>
      <footer>

      </footer>
    </div>
  )
}

export default App;
