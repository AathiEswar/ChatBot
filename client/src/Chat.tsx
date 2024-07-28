import {GenerateContentRequest, GoogleGenerativeAI, Part } from "@google/generative-ai"
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export default function Chat(){
    const [text , setText] = useState<string>("");
    const [value , setValue] = useState<string | GenerateContentRequest | (string | Part)[]>("")
    const [ loading , setLoading ] = useState<boolean>(false);

    const genAi = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);

    const model = genAi.getGenerativeModel({model: "gemini-1.5-flash"})

     async function generateFromGemini(){
        setLoading(true);
        const result = await model.generateContent(value);
        const response = await result.response;
        const textAi = response.text();
        setText(textAi)
        setLoading(false);

      }

      const callGemini = ()=> {
        generateFromGemini();
      }

    return (
        <>
            <div>{loading ?"Loading" :  text }</div>

        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input onChange={(e) => setValue(e.target.value)}  placeholder="Type Here..." />
          <Button onClick={callGemini} type="submit">Generate</Button>
        </div>
        </>
    )
}