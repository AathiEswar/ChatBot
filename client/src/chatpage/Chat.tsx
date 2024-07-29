import {GenerateContentRequest, GoogleGenerativeAI, Part } from "@google/generative-ai"
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Chat(){

    const [text , setText] = useState<string>("");
    const [value , setValue] = useState<string[] | string >("")
    const [ loading , setLoading ] = useState<boolean>(false);

    const genAi = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);
    const model = genAi.getGenerativeModel({model: "gemini-1.5-flash"})

     async function generateFromGemini(){
        setValue("");
        setLoading(true);
        const result = await model.generateContent(value);
        const response = await result.response;
        const textAi = response.text();
        setText(textAi)
        setLoading(false);

      }

      const callGemini = (event : React.MouseEvent<HTMLButtonElement> )=> {
        generateFromGemini();
      }

      const handleInputClick = (event: React.KeyboardEvent<HTMLInputElement> ) => {
        if(event.key === 'Enter'){
          generateFromGemini();
        }
      }

    return (
        <>
        <section  className="w-full sm:w-[80%] border border-2 border-black p-4">
            <div className="h-[90%]"> 
              {loading ?"Loading" :  text }
            </div>

        <div className="flex flex-row w-full  items-center justify-evenly h-[10%] gap-4">
          <Input onChange={(e) => setValue(e.target.value)}  value={value} placeholder="Type Here..."  onKeyDown={handleInputClick} />
          <Button onClick={callGemini} type="submit">Generate</Button>
        </div>
</section>
        </>
    )
}