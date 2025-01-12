import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');  // Connect to the backend server

const Chat = ({ username }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);  // Track selected room
    const [rooms, setRooms] = useState(['General', 'Sports', username]);  // Example rooms

    useEffect(() => {
        // Listen for incoming messages
        socket.on('receive_message', (data) => {
            console.log('Received message:', data);  // Log the received message
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off('receive_message');  // Clean up the listener on unmount
        };
    }, []);

    const handleJoinRoom = (room) => {
        setSelectedRoom(room);
        socket.emit('join_room', { username, room });  // Emit join_room event to server
        setMessages([]);  // Clear previous messages when switching rooms
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && selectedRoom) {
            const chatMessage = {
                room: selectedRoom,
                sender: username,
                text: message
            };

            socket.emit('send_message', chatMessage);  
            setMessage('');  
        }
    };

    return (
        <div className="md:flex h-screen">
            {/* Left Sidebar: Room List */}
            <div className="md:w-1/3 border-r-2 pt-20 md:p-4">
                <h2 className="text-xl font-semibold mb-4 md:pt-12 p-3">Rooms</h2>
                {rooms.map((room, index) => (
                    <div
                        key={index}
                        className={`p-2 mb-2 cursor-pointer ${
                            selectedRoom === room ? 'bg-blue-100' : ''
                        }`}
                        onClick={() => handleJoinRoom(room)}
                    >
                        <span className="font-medium">{room}</span>
                    </div>
                ))}
            </div>

            {/* Right Chat Area */}
            <div className="md:w-2/3 md:pt-16 p-4">
                {selectedRoom ? (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">
                            Chat in Room: {selectedRoom}
                        </h2>
                        <div className="border p-4 h-64 overflow-y-auto">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`mb-4 ${
                                        msg.sender === username ? 'text-right' : 'text-left'
                                    }`}
                                >
                                    <p className="font-bold mb-1">{msg.sender}</p>
                                    <div
                                        className={`inline-block p-2 rounded-lg ${
                                            msg.sender === username ? 'bg-blue-100' : 'bg-gray-200'
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="flex-1 p-2 border rounded"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500">Select a room to start chatting.</p>
                )}
            </div>
        </div>
    );
};

export default Chat;
