from dotenv import load_dotenv
import json
import os
from pathlib import Path
from pymongo import MongoClient

load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent / ".env")


if __name__ == "__main__":

    # Connects to MongoDB
    try:
        client = MongoClient(host=os.getenv("MONGODBURI"))
        db = client["ktpdatabase"]
        user_collection = db["user-collection"]
        print("Connected to MongoDB")
    except Exception as e:
        print("Failed to connect to MongoDB")
        raise e

    # Loads users
    try:
        with open("./users.json") as f:
            users = json.load(f)
    except Exception as e:
        print("Failed to load users")
        raise e

    # Deletes users in MongoDB
    try:
        user_collection.delete_many({})
        print("Successfully deleted users in MongoDB")
    except Exception as e:
        print("Failed to delete users in MongoDB")
        raise e

    # Inserts users in MongoDB
    try:
        if isinstance(users, list):
            user_collection.insert_many(users)
        else:
            user_collection.insert_one(users)
        print("Successfully inserted users in MongoDB")
    except Exception as e:
        print("Failed to insert users in MongoDB")
        raise e
