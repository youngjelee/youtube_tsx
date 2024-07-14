import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";
import { useState ,useRef , useEffect} from "react";

type CategoryPillProps = {
    categories : string[] ,
    selected : string , 
    onSelect : ( category : string ) =>void 
}

const TRANSLATE_AMOUT = 200;


export  function CategoryPills ( 
    { categories  , selected ,  onSelect } : CategoryPillProps){
        
        const [translate , setTranslate ] = useState(0)
        const [isLeftVisible , setIsLeftVisible ] = useState(false);
        const [isRightVisible , setIsRightVisible ] = useState(false);
        const containerRef = useRef<HTMLDivElement>(null)
        

        useEffect(()=>{
            if(containerRef.current == null) return
            
            const observer = new ResizeObserver(entries =>{
                const container = entries[0]?.target
                if (container == null ) return

                setIsLeftVisible(translate > 0)
                setIsRightVisible(translate +container.clientWidth < container.scrollWidth)
            })
            observer.observe(containerRef.current )

            return ()=>{
                observer.disconnect();
            }
        },[categories , translate])

    return <div className="overflow-x-hidden overflow-y-hidden relative "> 

        <div ref ={containerRef}
        className={`flex 
        whitespace-nowrap 
        gap-3 
        transition-transform 
        `}
        style={{ transform: `translateX(-${translate}px)` }}
        >
        {categories.map( category=>  (   
                <Button key = {category}
                        variant={selected === category ? 'dark' : 'default'} 
                        className="py-1 px-3 rounded-lg "
                        onClick={ ()=> onSelect(category) } 
                > 
                {category} 
                </Button>  
                    ) 
            )
        }
        </div>
        { isLeftVisible &&    
        <div className="
            absolute
            left-0
            w-24
            top-1/2 -translate-y-1/2
            bg-gradient-to-r
            from-white 
            from-50%
            to-transparent
            ">
            <Button variant={"ghost"} size={"icon"} 
            className="h-full"
            onClick={( )=>{
                
                if( containerRef.current == null ) {
                    return translate;
                }

                const newTranslate = translate - TRANSLATE_AMOUT
                const edge = containerRef.current.scrollWidth
                const width = containerRef.current.clientWidth
                // console.log( newTranslate , edge , width)
                setTranslate ( () => {
                    if(newTranslate <= 0 ) {
                        setIsLeftVisible(false) 
                        return 0;
                    }else {
                        
                        return newTranslate
                    }
                })
            }}
            >
                <ChevronLeft />
            </Button>
        </div>
        }

        {   isRightVisible && 
          <div className="
                absolute
                right-0
                w-24
                top-1/2 -translate-y-1/2
                bg-gradient-to-l
                from-white 
                from-50%
                ">
            <Button variant={"ghost"} size={"icon"} 
            className="h-full aspect-square w-auto p-1.5"
            onClick={( )=>{

                setTranslate( () => {

                if( containerRef.current == null ) {
                    return translate;
                }
                const newTranslate = translate + TRANSLATE_AMOUT
                const edge = containerRef.current.scrollWidth
                const width = containerRef.current.clientWidth
                // console.log( newTranslate , edge , width )
                if(newTranslate + width >= edge ) {
                    // console.log(edge - width)
                    setIsRightVisible(false)
                    return edge - width
                }
                
                return newTranslate
            })


            }}
            >
                <ChevronRight />
            </Button>
        </div>}
    </div>;
}