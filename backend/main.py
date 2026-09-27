import uvicorn
from fastapi import FastAPI


app = FastAPI()


@app.get("/")
def main():
    return {"status": "ok"}

@app.get("/extract")
def extract_doc():
    ...
    



if __name__ == "__main__":
    uvicorn.run(app, port=4444)