from django.shortcuts import render
# Create your views here.

def home(request):
    return render(request, 'home.html')

def idktest(request):
    return render(request, 'idktest.html')