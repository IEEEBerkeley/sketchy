from django.shortcuts import render
# Create your views here.

def home(request):
    return render(request, 'home.html')

def rules(request):
    print("working!")
    return render(request, 'rules.html')