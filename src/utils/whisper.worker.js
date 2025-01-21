import {pipeline} from '@xenova/transformers'
import { MessageTypes } from './presets'

class MyTranscriptionPipeline {
    static task = 'automatic-speach-recognition'
    static model = 'openai/whisper-tiny.en'
    static instance = null

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = await pipeline(this.task, null, {progress_callback})
        }

        return this.instance
    }
}

self.addEventListener('message', async (event) => {
    const {type, audio} = event.data
    if (type === MessageTypes.INFERENCE_REQUEST) {
        await transcribe(audio)
    }
})

async function transcribe() {
    
}