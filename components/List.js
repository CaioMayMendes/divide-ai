import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

import {
    Table,
    TableBody,
    TableFooter,
    TableCell,
    TableRow,
  } from "@/components/ui/table"
  

export default function List(props) {
    const { data , resetProcess} = props;
    console.log(data)
    const totalGeral = data.reduce((acc, item) => {
        const totalGrupo = item.items.reduce((sum, subItem) => sum + parseFloat(subItem.valor), 0);
        return acc + totalGrupo;
    }, 0);

    return (
        
        <div className="space-y-4 w-full items-center">

            {data.map((item, index) => {
                const totalGrupo = item.items.reduce((sum, subItem) => sum + parseFloat(subItem.valor), 0);
                return (
                <Accordion key={index} type="single" collapsible className={"w-full border border-gray-300 rounded-lg shadow-md bg-black"}>
                    <AccordionItem className={"text-white"}value={item.nome} >
                        <AccordionTrigger className={"p-4"}>{item.nome}</AccordionTrigger>
                        <AccordionContent className={"w-full pl-2"}>
                            <Table>
                        {item.items.map((subItem, subIndex) => (
                            <TableBody key={subIndex}>
                                <TableRow>
                                <TableCell className="font-medium">{subItem.nome_item}</TableCell>
                                <TableCell className="text-right">R${subItem.valor}</TableCell>
                                </TableRow>
                            </TableBody>  
                        ))}
                        </Table>
                            <TableFooter>
                                <TableRow>
                                    <TableCell >Total: R${totalGrupo.toFixed(2)}</TableCell>
                                </TableRow>
                            </TableFooter>
                         </AccordionContent>
                    </AccordionItem>
                </Accordion>
            )})}
            <div className="w-full bg-gray-800 text-white p-4 rounded-lg shadow-md mt-4 text-lg font-bold text-center">
                Total Geral: R$ {totalGeral.toFixed(2)}
            </div>
            <div className="flex flex-col gap-2 items-center">
                <p>Não bateu as contas?</p>
                <button
                   onClick={resetProcess}
                className="bg-red-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition hover:bg-slate-700"
                >
                {"Tenta de Novo"}
                </button>
            </div>
        </div>
    );
}
