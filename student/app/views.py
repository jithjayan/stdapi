from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets
# Create your views here.
class Std_view(viewsets.ModelViewSet):
    queryset=Std.objects.all()
    serializer_class=Model_ser