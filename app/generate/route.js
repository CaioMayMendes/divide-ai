import { JSON_SCHEMA_AI } from "../utils"

export async function POST(req) {
  try {
      // const formData = await req.formData();
      // const audioFile = formData.get("audio");

      // if (!audioFile) {
      //   return new Response(JSON.stringify({ error: "Nenhum arquivo foi retornado"  }), {
      //     status: 400,
      //   });
      // }

      // // Converte o arquivo em um Buffer
      // const arrayBuffer = await audioFile.arrayBuffer();
      // const audioBuffer = Buffer.from(arrayBuffer);

      // // Enviar o áudio para a API de transcrição
      // const response = await fetch(process.env.AI_API_URL_VOICE, {
      //     method: "POST",
      //     headers: {
      //         Authorization: `Bearer ${process.env.AI_API_KEY}`,
      //         "Content-Type": "application/octet-stream",
      //     },
      //     body: audioBuffer,
      // });

      // if (!response.ok) {
      //     throw new Error("Falha ao transcrever audio");
      // }

      // const result = await response.json();
      
      // const text = result.result.text
      const text = "Eu e a Jaqueline saimos para jantar, o total deu 270 reais, a cada um pegou o rodizio de 125 e eu peguei uma agua de 10 reais e a Jaqueline pegou uma coca de 10 reais"

      if (!text) {
        return new Response(JSON.stringify({ error: "Nenhum texto retornou"  }), {
          status: 400,
        });
      }

      const inputs = [
        {
          "role": "system",
          "content": "Extract data making the division of values of a bill among the members of the story"
        },
        {
          "role": "user",
          "content": text
        }
      ];
      const response_ai = await fetch(process.env.AI_API_URL_IA, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.AI_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "messages":inputs,
          "response_format": JSON_SCHEMA_AI
        }),
      });

      const result_ai = await response_ai.json();
      const return_obj = result_ai.result.response
      return new Response(JSON.stringify(return_obj), {
          status: 200,
          headers: { "Content-Type": "application/json" },
      });

  } catch (error) {
      console.log( error.message )
      return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
      });
  }
}
