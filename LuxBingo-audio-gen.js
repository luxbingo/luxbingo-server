import { fal } from "@fal-ai/client";
import fs from "fs";

fal.config({ credentials: process.env.FAL_KEY });

async function clonarVoz() {
  // 1. Envia seu áudio pro fal.ai
  const file = fs.readFileSync("./voz_minha.mp3");
  const blob = new Blob([file], { type: "audio/mpeg" });
  const audioUrl = await fal.storage.upload(blob);
  console.log("Áudio enviado:", audioUrl);

  // 2. Clona a voz e já testa com um preview em português
  const result = await fal.subscribe("fal-ai/minimax/voice-clone", {
    input: {
      audio_url: audioUrl,
      noise_reduction: true,
      need_volume_normalization: true,
      text: "Vinte e três. Bingo!",
      model: "speech-02-turbo"
    },
    logs: true
  });

  console.log("SEU VOICE ID (guarda isso!):", result.data.custom_voice_id);
  console.log("Preview:", result.data.audio.url);

  // Salva o voice_id num arquivo pra usar depois
  fs.writeFileSync("./voice_id.txt", result.data.custom_voice_id);
}

clonarVoz();