from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["hotel_db"]
admin_collection = db["admins"]
rooms_collection = db["rooms"]
bookings_collection = db["bookings"]

# ✅ User: Create booking (Only one active booking per CNIC)
@app.route('/bookings', methods=['POST'])
def create_booking():
    data = request.json
    cnic = data.get('cnic')

    existing = bookings_collection.find_one({
        'cnic': cnic,
        'status': {'$in': ['pending', 'confirmed']}
    })

    if existing:
        return jsonify({"message": "You have already booked a room with this CNIC."}), 400

    data['status'] = 'pending'
    bookings_collection.insert_one(data)
    return jsonify({"message": "Booking request sent!"})

# ✅ Admin: Get all bookings (used by Admin Dashboard)
@app.route('/bookings', methods=['GET'])
def get_all_bookings():
    bookings = list(bookings_collection.find({}, {'_id': 0}))
    return jsonify(bookings)

# ✅ Admin: Confirm Booking
@app.route('/bookings/confirm', methods=['POST'])
def confirm_booking():
    data = request.json
    room_number = data.get('room_number')
    user = data.get('user')

    result = bookings_collection.update_one(
        {'room_number': room_number, 'user': user},
        {'$set': {'status': 'confirmed'}}
    )

    if result.modified_count:
        rooms_collection.update_one(
            {'room_number': room_number},
            {'$set': {'availability': False}}
        )
        return jsonify({"message": "Booking confirmed and room marked unavailable!"})

    return jsonify({"message": "Booking not found."}), 404

# ✅ User: Get own bookings using CNIC
@app.route('/bookings/<cnic>', methods=['GET'])
def get_user_bookings(cnic):
    bookings = list(bookings_collection.find({'cnic': cnic}, {'_id': 0}))
    return jsonify(bookings)

# ✅ Admin: Toggle room availability
@app.route('/rooms/toggle', methods=['PUT'])
def toggle_room_availability():
    data = request.get_json()
    room_number = data.get('room_number')

    room = rooms_collection.find_one({'room_number': room_number})
    if not room:
        return jsonify({"message": "Room not found"}), 404

    new_status = not room.get('availability', True)

    rooms_collection.update_one(
        {'room_number': room_number},
        {'$set': {'availability': new_status}}
    )

    return jsonify({"message": f"Room marked as {'available' if new_status else 'booked'}."})

# ✅ Home route
@app.route('/')
def home():
    return jsonify({"message": "Welcome to Hotel Management API"})

# ✅ Admin: Register
@app.route('/admin/register', methods=['POST'])
def register_admin():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if admin_collection.find_one({'username': username}):
        return jsonify({"message": "Username already exists"}), 409

    hashed_password = generate_password_hash(password)
    admin_collection.insert_one({
        'username': username,
        'password': hashed_password
    })

    return jsonify({"message": "Admin registered successfully"}), 201

# ✅ Admin: Login
@app.route('/admin/login', methods=['POST'])
def login_admin():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    admin = admin_collection.find_one({'username': username})

    if not admin or not check_password_hash(admin['password'], password):
        return jsonify({"message": "Invalid username or password"}), 401

    return jsonify({"message": f"Welcome, {username}!"})

# ✅ Admin: Delete a room
@app.route('/rooms/<room_number>', methods=['DELETE'])
def delete_room(room_number):
    result = rooms_collection.delete_one({'room_number': room_number})
    if result.deleted_count == 0:
        return jsonify({'message': 'Room not found'}), 404
    return jsonify({'message': 'Room deleted successfully'}), 200

# ✅ Get all rooms
@app.route('/rooms', methods=['GET'])
def get_rooms():
    rooms = list(rooms_collection.find({}, {'_id': 0}))
    return jsonify(rooms)

# ✅ Add a new room
@app.route('/rooms', methods=['POST'])
def add_room():
    data = request.json
    rooms_collection.insert_one(data)
    return jsonify({"message": "Room added successfully!"})

# ✅ Delete booking
@app.route('/bookings', methods=['DELETE'])
def delete_booking():
    data = request.get_json()
    room_number = data.get('room_number')
    user = data.get('user')

    result = bookings_collection.delete_one({
        'room_number': room_number,
        'user': user
    })

    if result.deleted_count:
        return jsonify({"message": "Booking deleted successfully!"})
    else:
        return jsonify({"message": "Booking not found!"}), 404
    

# ✅ Run the app
if __name__ == '__main__':
    app.run(debug=True)
