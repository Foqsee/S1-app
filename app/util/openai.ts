import { getConfig } from "./settings";

const openaiCall = async (endpoint: string, method: string, data: FormData): Promise<Response> => {
    const openaiApiKey = await getConfig('openaiApiKey');

    const response = await fetch(`https://api.openai.com/v1/${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiApiKey}`
        },
        body: data
    });

    return response;
}

const oaTranscribeRecording = async (file: Blob): Promise<Response> => {
    let formData = new FormData();

    formData.append('file', file);
    formData.append('model', 'whisper-1');
    formData.append('response_format', 'text');

    return openaiCall('audio/transcriptions', 'POST', formData);
}

export { openaiCall, oaTranscribeRecording };