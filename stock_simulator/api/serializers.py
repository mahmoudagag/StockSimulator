from rest_framework import serializers
from .models import User,UserStocks,UserHistory, UserNetWorth

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserStocksSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserStocks
        fields = '__all__'

class UserHistorySerializers(serializers.ModelSerializer):
    class Meta:
        model = UserHistory
        fields = '__all__'

class UserNetWorthSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserNetWorth
        fields = '__all__'