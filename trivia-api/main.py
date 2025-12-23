from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow your mobile app to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

questions = [
    {"id": 1, "q": "Which planet is known as the Red Planet?", "options": ["Mars", "Venus", "Jupiter", "Saturn"], "a": "Mars"},
    {"id": 2, "q": "What is the capital of France?", "options": ["Paris", "London", "Berlin", "Madrid"], "a": "Paris"},
    {"id": 3, "q": "Which is the largest ocean on Earth?", "options": ["Atlantic", "Indian", "Pacific", "Arctic"], "a": "Pacific"},
    {"id": 4, "q": "What is 15 + 25?", "options": ["30", "35", "40", "45"], "a": "40"},
    {"id": 5, "q": "Who wrote 'Romeo and Juliet'?", "options": ["Dickens", "Shakespeare", "Twain", "Austen"], "a": "Shakespeare"},
    {"id": 6, "q": "Which element has the chemical symbol 'O'?", "options": ["Gold", "Oxygen", "Silver", "Iron"], "a": "Oxygen"},
    {"id": 7, "q": "How many continents are there?", "options": ["5", "6", "7", "8"], "a": "7"},
    {"id": 8, "q": "Which is the tallest animal in the world?", "options": ["Elephant", "Giraffe", "Whale", "Lion"], "a": "Giraffe"},
    {"id": 9, "q": "What is the capital of Japan?", "options": ["Seoul", "Beijing", "Tokyo", "Bangkok"], "a": "Tokyo"},
    {"id": 10, "q": "Which gas do plants absorb from the air?", "options": ["Oxygen", "Nitrogen", "CO2", "Hydrogen"], "a": "CO2"},
    {"id": 11, "q": "What is the square root of 64?", "options": ["6", "7", "8", "9"], "a": "8"},
    {"id": 12, "q": "Which country is famous for the Great Barrier Reef?", "options": ["USA", "Australia", "Brazil", "India"], "a": "Australia"},
    {"id": 13, "q": "What is the smallest prime number?", "options": ["0", "1", "2", "3"], "a": "2"},
    {"id": 14, "q": "Who is known as the 'Father of Computers'?", "options": ["Newton", "Einstein", "Babbage", "Jobs"], "a": "Babbage"},
    {"id": 15, "q": "In which year did the Titanic sink?", "options": ["1910", "1912", "1914", "1916"], "a": "1912"}
]

@app.get("/")
def read_root():
    return {"message": "Python Trivia API is Running"}

@app.get("/api/questions")
def get_questions():
    return questions