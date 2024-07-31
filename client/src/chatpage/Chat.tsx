import {GenerateContentRequest, GoogleGenerativeAI, Part } from "@google/generative-ai"
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Chat(){

    const [text , setText] = useState<string>("");
    const [value , setValue] = useState<string >("")
    const [ loading , setLoading ] = useState<boolean>(false);
    const [textArray , setTextArray] = useState<string[]>([]);

    const genAi = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);
    const model = genAi.getGenerativeModel({model: "gemini-1.5-flash"})

     async function generateFromGemini(){
        setValue("");
        setLoading(true);
        const result = await model.generateContent(value);
        const response = await result.response;
        const textAi = response.text();
        setText(textAi)
        setTextArray((prev) => [...prev , value , textAi ]);
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
        <section  className="w-full sm:w-[80%] border-0 border-primary p-4 bg-accent" >
            <div className="h-[90%] text-white flex flex-col">
              {textArray.length < 1 && !loading && "welcome"} 
              {   textArray.map((item,index) => {
                if(index % 2 == 0){
                  return <div className="text-right	p-2  ">{item}</div>
                }
                return <div className="p-2 w-[50%]">{item}</div>
              })}
              {loading && "Loading"}
            </div>

        <div className="flex flex-row w-full  items-center justify-evenly h-[10%] gap-4">
          <Input onChange={(e) => setValue(e.target.value)}  
                  value={value} placeholder="Type Here..." 
                  onKeyDown={handleInputClick}
                  className="bg-secondary rounded-md border-0 text-accent placeholder-tprime" />
          <Button className="rounded-full w-12 h-12 text-black text-2xl " onClick={callGemini} type="submit">+</Button>
        </div>
</section>
        </>
    )
}