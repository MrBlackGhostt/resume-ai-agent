from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import fitz
import io

from services import llm, questionLLm

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Message": "Hello World!"}


@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    contents = await file.read()
    print(f"Received file: {file.filename}, size: {len(contents)} bytes")

    pdf = fitz.open(stream=contents, filetype="pdf")
    text = ""

    for page in pdf:
        text += page.get_text()

    ai_message = llm.call_llm(text)

    print("MESSAGE FROM AI", ai_message)
    return ai_message


def main():
    print("Hello from backend!")


@app.post("/get-question")
async def get_question():
    que = questionLLm.call_llm()
    print("QUESTION", que)
    return que


if __name__ == "__main__":
    main()
