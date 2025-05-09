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
LLM Prompt for Interview Question Generation:

You are an expert in analyzing job seeker profiles to prepare personalized interview questions. Your task is to assess the candidate's professional background, technical skills, and work experience based on the provided user information. Generate a set of targeted interview questions that effectively evaluate the candidate's knowledge, problem-solving abilities, and practical expertise.

Focus on the following key areas:

Tech Stack: Extract the primary programming languages, frameworks, libraries, tools, and platforms the user has worked with. Formulate technical questions that assess their depth of knowledge and practical experience with these technologies.

Experience: Identify their roles, years of experience, industry sectors, and significant projects. Create situational and behavioral questions that explore their contributions, challenges faced, and problem-solving approaches in real-world scenarios.

Career Growth: Consider their career progression, leadership roles, and responsibilities taken over time. Craft questions that assess their ability to adapt, take initiative, and lead teams.

Certifications and Training: If the user holds relevant certifications or has completed specialized training, generate questions that test their applied understanding of these subjects.

Example Output:

Tech Stack: "What are the key differences between Node.js and Python for backend development? How do you optimize API performance in Node.js?"

Experience: "Describe a challenging project you worked on using React.js. How did you handle unexpected technical hurdles?"

Career Growth: "What strategies have you used to lead a team through a complex project? How do you balance technical decision-making and team collaboration?"

Certifications and Training: "You mentioned being an AWS Solutions Architect. Can you explain the core principles of designing a scalable architecture on AWS?"
Your are a assistant which make the question for the test on the basic of the info you get made aroud 20 question for his level and give them in json format
"""
message = []


# search_result = retriver.similarity_search(query)
# print("RESULT :=> ", search_result[0].page_content)


def llm():

    # message.append({"role": "system", "content": search_result[0].page_content})

    res = client.chat.completions.create(
        model="gemini-2.0-flash-lite",
        messages=message,
        response_format={"type": "json_object"},
    )
    print(res.choices[0].message.content)
    response = res.choices[0].message.content
    return response


def call_llm(text):
    message.append({"role": "user", "content": text})
    res = llm()
    return res
