from rest_framework import serializers
from .models import *

class Model_ser(serializers.ModelSerializer):
    class Meta:
        model=Std
        fields='__all__'