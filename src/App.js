import React from "react";
import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { useCopyClipboard } from "./hooks/useCopyClipboard";
import ClientProvider from "./components/ClientProvider";

function App() {
  const [isCopied, copyClipboard] = useCopyClipboard({ timeout: 2500 });
  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return null;
  }
  return (
    <div className="container items-center mx-auto flex flex-col">
      <div className=""></div>
      <ClientProvider></ClientProvider>

      <h1 className=" text-lg ">speech to text</h1>
      <br></br>

      <div className=" main-content">
        <div className="absolute top-0 right-0 justify-end">
          <button onClick={resetTranscript}
            class="text-indigo-500 rounded-lg  border-red-500 background-transparent transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 font-medium uppercase px-8 py-3 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            🧻 clear
          </button>
        </div>
        <div className=" mt-5">{transcript}</div>
      </div>
      <div className="space-x-4 m-4">
        <button
          onClick={startListening}
          className="rounded-xl border-2  border-red-500 px-5 py-3 text-base mb-3 font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5"
        >
          start listening
        </button>
        <button
          onClick={SpeechRecognition.stopListening}
          className="rounded-xl border-2  border-red-500 px-5 py-3 text-base mb-3 font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5"
        >
          stop listening
        </button>
        <button
          disabled={isCopied}
          onClick={() => copyClipboard(transcript)}
          className="rounded-xl bg-gradient-to-br from-[#6025F5] to-[#FF5555] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50"
        >
          {isCopied ? "copied" : "copy to clipboard"}
        </button>
      </div>
    </div>
  );
}

export default App;
