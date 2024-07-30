import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

import {Button} from '@/components/ui/button'
import { useEffect, useState } from "react"



export default function ChatHeader(){
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (
        <section className="w-screen h-[10%] flex  items-center justify-center text-2xl bg-secondary text-center justify-center ">
            <div className="absolute left-2 block sm:hidden">
                <Sheet>
                    <SheetTrigger>+</SheetTrigger>
                    <SheetContent side={"left"}>
                        <SheetHeader>
                            <SheetTitle>History</SheetTitle>
                            <SheetDescription>
                                Display history from DB
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
         
            <h1 >CHATTY</h1>
        </section>
    )
}