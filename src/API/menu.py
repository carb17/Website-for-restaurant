from flask import Flask, request, jsonify
import json
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def cargar_datos():
    try:
        with open('src/API/api.json', 'r') as file:
            return json.load(file)
    except Exception as e:
        # print(f"Error al cargar datos: {str(e)}") 
        return {"menu": []} 
    return {"menu": []} 

@app.route('/menu', methods=['GET'])
def obtener_menu():
    data = cargar_datos()
    # print("Datos cargados:", data)
    return jsonify(data["menu"]), 200  

@app.route('/menu', methods=['POST'])
def agregar_menu():
    try:
        nuevo_menu = request.json 
        if 'nombre' not in nuevo_menu or 'descripcion' not in nuevo_menu or 'precio' not in nuevo_menu:
            return jsonify({"error": "Faltan campos requeridos: nombre, descripcion, precio"}), 400
        data = cargar_datos()
        nuevo_id = max([item['id'] for item in data["menu"]], default=0) + 1
        nuevo_menu["id"] = nuevo_id
        data["menu"].append(nuevo_menu)
        with open('src/API/api.json', 'w') as file:
            json.dump(data, file, indent=4)
        return jsonify({"mensaje": "Menú agregado exitosamente", "nuevo_menu": nuevo_menu}), 201
    except Exception as e:
        print(f"Error al agregar menú: {str(e)}")
        return jsonify({"error": "Error al agregar menú"}), 500


if __name__ == '__main__':
    app.run(debug=True)