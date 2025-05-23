import os

import google.generativeai as genai
from django.conf import settings
from django.shortcuts import render
from django.views import View

# Configure Gemini API (ensure your API key is set)
genai.configure(api_key=settings.GEMINI_API_KEY)

class ChatbotView(View):
    def get(self, request):
        return render(request, 'ai_agent_app/chatbot.html')

    def post(self, request):
        user_input = request.POST.get('user_input')
        if user_input:
            model = genai.GenerativeModel('gemini-2.0-flash')  # Or another Gemini model
            try:
                response = model.generate_content(user_input)
                ai_response = response.text
            except Exception as e:
                ai_response = f"An error occurred: {e}"
        else:
            ai_response = "Please enter your message."
        return render(request, 'ai_agent_app/chatbot.html', {'user_input': user_input, 'ai_response': ai_response})