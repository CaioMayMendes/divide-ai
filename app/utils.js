export const JSON_SCHEMA_AI = {
    "type": "json_schema",
    "json_schema": {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "nome": {
                "type": "string"
                },
                "items": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                    "nome_item": {
                        "type": "string"
                    },
                    "valor": {
                        "type": "number"
                    }
                    },
                    "required": [
                    "nome_item",
                    "valor"
                    ]
                }
                }
            },
            "required": [
            "nome",
            "items"
            ]
        }
    } 
}