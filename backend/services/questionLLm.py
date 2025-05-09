import json
from openai import OpenAI
import os
from dotenv import load_dotenv


load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
print(api_key)
client = OpenAI(
    api_key=api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
)

prompt_for_data_extraction = """
Your are a assistant which make the question for the test on the basic of the info you get made aroud 20 question for his level and give them in json format
"""


# search_result = retriver.similarity_search(query)
# print("RESULT :=> ", search_result[0].page_content)


def llm():

    # message.append({"role": "system", "content": search_result[0].page_content})

    res = client.chat.completions.create(
        model="gemini-2.0-flash-lite",
        messages=messages,
        # response_format={"type": "json_object"},
    )
    print(res.choices[0].message.content)
    response = res.choices[0].message.content
    return response


messages = [
    {
        "role": "system",
        "content": """
Skills:
- Languages: Typescript, Javascript, HTML5, CSS3, Tailwind, Shadcn, Python
- Frontend: Next.js, React, Redux, Material UI, Shadcn
- Backend: Node.js, FastAPI
- Databases: MongoDB, Redis, PostgreSQL
- Others: Docker, Amazon EC2, Figma, Git
""",
    }
]


def call_llm():

    res = llm()
    return res
