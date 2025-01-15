from flask import Flask, jsonify, request
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/middlend/menu', methods=['GET', 'POST'])
def obtener_menu():
    if request.method == 'GET':
        try:
            response = requests.get('https://apimenu-3.onrender.com/api/menu')
            # print("Respuesta de la API de menú:", response.status_code, response.json())
            if response.status_code == 200:
                return jsonify(response.json()), 200
            else:
                return jsonify({"error": "No se pudo obtener el menú"}), 500
        except Exception as e:
            return jsonify({"error": f"Error al obtener el menú: {str(e)}"}), 500
    elif request.method == 'POST':
        try:
            nuevo_menu = request.json
            response = requests.post('https://apimenu-3.onrender.com/api/insertar_comida', json=nuevo_menu)
            if response.status_code == 201:
                return jsonify(response.json()), 201
            else:
                return jsonify({"error": "No se pudo agregar el menú"}), response.status_code
        except Exception as e:
            return jsonify({"error": f"Error al agregar el menú: {str(e)}"}), 500

@app.route('/middlend/pedido', methods=['GET', 'POST'])
def manejar_pedidos():
    if request.method == 'GET':
        try:
            response = requests.get('https://api-pedidos-zzu2.onrender.com/pedido')  
            print("Respuesta de la API de pedidos:", response.status_code, response.json())
            if response.status_code == 200:
                return jsonify(response.json()), 200
            else:
                return jsonify({"error": "No se pudo obtener los pedidos"}), 500
        except Exception as e:
            return jsonify({"error": f"Error al obtener los pedidos: {str(e)}"}), 500
    elif request.method == 'POST':
        try:
            pedido_data = request.json
            print("Datos recibidos del pedido:", pedido_data)
            response = requests.post('https://api-pedidos-zzu2.onrender.com/pedido', json=pedido_data)
            if response.status_code == 201:
                return jsonify(response.json()), 201
            else:
                return jsonify({"error": "No se pudo registrar el pedido"}), 500
        except Exception as e:
            return jsonify({"error": f"Error al agregar el pedido: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)
