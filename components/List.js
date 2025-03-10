import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

export default function List(props) {
    const { data } = props;
    console.log(data)
    return (
        <div className="space-y-4 w-full">
            {data.map((item, index) => (
                <Accordion key={index} type="single" collapsible className={"w-full border border-black rounded-lg shadow-md bg-grey"}>
                    <AccordionItem value={item.nome} >
                        <AccordionTrigger className={"p-4"}>{item.nome}</AccordionTrigger>
                        {item.items.map((subItem, subIndex) => (
                            <>
                            <AccordionContent key={subIndex} className={"w-full pl-2"}>
                            {subItem.nome_item}/{subItem.valor}
                            </AccordionContent>
                            </>
                        ))}
                    </AccordionItem>
                </Accordion>
            ))}
        </div>
    );
}
