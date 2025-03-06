"use client";
import React, { useState, useRef, useEffect } from "react";
import { Bebas_Neue } from "next/font/google";
import { Mic, StopCircle, Send, LoaderPinwheel } from "lucide-react";
import List from "@/components/List";


const fugaz = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

export default function Hero() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isListing, setIsListing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [listData, setListData] = useState([]);
  // Verifica se a API de mídia está disponível no navegador
  useEffect(() => {
    if (typeof window !== "undefined" && navigator.mediaDevices?.getUserMedia) {
      setIsSupported(true);
    }
  }, []);

  const startRecording = async () => {
    if (!isSupported) {
      alert("Seu navegador não suporta gravação de áudio.");
      return;
    }

    if(audioUrl){
      setAudioUrl(null)
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob_root = new Blob(audioChunksRef.current, { type: "audio/webm" });

        const url = URL.createObjectURL(audioBlob_root);
        setAudioBlob(audioBlob_root)
        setAudioUrl(url);
        console.log(audioUrl)
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Erro ao acessar o microfone:", error);
      alert("Erro ao acessar o microfone. Verifique as permissões.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendAudioToApi = async () => {
    if (!audioBlob) {
      alert("Nenhum áudio disponível para envio.");
      return;
    }
  
    setIsSending(true);
  
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");
  
      const response = await fetch("/generate", {
        method: "POST",
        body: formData, 
      });
  
      const data = await response.json();
      setListData(data);
      console.log(typeof listData);
      setIsListing(true)
    } catch (error) {
      console.error("Erro ao enviar áudio:", error);
      alert("Erro ao processar áudio.");
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <div className="py-4 md:py-10 flex flex-col gap-8 sm:gap-10 md:gap-14 items-center">
      {isListing ? (
        <div className="flex justify-center items-center h-full">
          <List data={listData}/>
        </div>
      ) : (
        <>
        {isSending ? (
          <div className="flex justify-center items-center h-full">
            <LoaderPinwheel size={40} className="animate-spin text-black" />
          </div>
        ) : (
          <>
          <h1 className={"text-5xl sm:text-6xl md:text-7xl text-center " + fugaz.className}>
            <span className="textGradient">Divide-AI</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[600px]">
            Conte sua história ai abaixo dizendo o que cada um consumiu e quanto foi cada item que a IA vai dividir a sua conta.
          </p>

          {isSupported ? (
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2 transition hover:bg-slate-700"
            >
              {isRecording ? <StopCircle size={20} /> : <Mic size={20} />}
              {isRecording ? "Parar Gravação" : "Gravar Áudio"}
            </button>
          ) : (
            <p className="text-red-500">Seu navegador não suporta gravação de áudio.</p>
          )}

          {audioUrl && (
            <audio controls className="mt-4">
              <source src={audioUrl} type="audio/webm" />
              Seu navegador não suporta a reprodução de áudio.
            </audio>
          )}
          {audioUrl && (
              <button
              onClick={sendAudioToApi}
              className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2 transition hover:bg-slate-700"
            > {<Send size={20} />}
              {"Enviar"}
            </button>
          )}
          </>
        )}
        </>
      )}
    </div>
  );
}
