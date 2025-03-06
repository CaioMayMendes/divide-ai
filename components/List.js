import React from "react";

export default function List(props) {
    const { data } = props;
  
    return (
      <div className="py-4 md:py-10 flex flex-col gap-8 sm:gap-10 md:gap-14 items-center">
        {data.map((item, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-md">
            {item.nome}
          </div>
        ))}
      </div>
    );
}
