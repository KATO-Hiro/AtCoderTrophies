from fastapi import FastAPI
import json
import requests
import uvicorn


app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello, AtCoder Trophies!"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8000)
