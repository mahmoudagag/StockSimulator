from django.db.models.query_utils import InvalidQuery
from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from rest_framework import serializers
from rest_framework import status

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializers,UserStocksSerializers,UserHistorySerializers,UserNetWorthSerializers

from .models import User,UserStocks,UserHistory,UserNetWorth
# Create your views here.

@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'List':'/user-list/',
		'Detail View':'/task-detail/<str:pk>/',
		'Create':'/task-create/',
		'Update':'/task-update/<str:pk>/',
		'Delete':'/task-delete/<str:pk>/',
		}

	return Response(api_urls)

@api_view(['GET'])
def userList(request):
    users = User.objects.all()
    serializer = UserSerializers(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def userDetail(request,username):
    users = User.objects.get(username=username)
    serializer = UserSerializers(users, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def userVerify(request,username):
    if not User.objects.filter(username=username).exists():
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    users = User.objects.get(username=username)
    serializer = UserSerializers(users, many=False)
    sentdata = UserSerializers(data=request.data)
    if sentdata.is_valid():
        if serializer.data["password"] != sentdata.data["password"]:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    return Response(serializer.data)


@api_view(['POST'])
def userCreate(request):
    serializer= UserSerializers(data=request.data)
    if serializer.is_valid():

        usernames = User.objects.filter(username=serializer.validated_data["username"])
        if usernames.exists():
            return Response("Username Already Used")
        emails = User.objects.filter(email=serializer.validated_data["email"])
        if emails.exists():
            return Response("Email Already uUsed")

        serializer.save()

        User1 ={}
        User1['User'] =serializer.data['id']
        User1['UserNetWorth'] =50000    
        networthSerializer = UserNetWorthSerializers(data=User1)
        if networthSerializer.is_valid():
            networthSerializer.save()

        return Response(serializer.data)
    else:
        return Response("Please Fill All Information")
        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['POST'])
def userUpdate(request,pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializers(instance=user,data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def userDelete(request, pk):
	user = User.objects.get(id=pk)
	user.delete()

	return Response('Item succsesfully delete!')


@api_view(['GET'])
def NetworthGet(request,username):
    users = User.objects.get(username=username)
    Serialized_user = UserSerializers(users)
    Networth = UserNetWorth.objects.filter(User=Serialized_user.data['id'])
    serializer = UserNetWorthSerializers(Networth, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def UserStocksGet(request,username):
    users = User.objects.get(username=username)
    Serialized_user = UserSerializers(users)
    userStocks = UserStocks.objects.filter(User=Serialized_user.data['id'])
    serializer = UserStocksSerializers(userStocks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def UserHistroyGet(request,username):
    users = User.objects.get(username=username)
    Serialized_user = UserSerializers(users)
    userHistory = UserHistory.objects.filter(User=Serialized_user.data['id'])
    serializer = UserHistorySerializers(userHistory, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def NetworthUpdate(request,username):
    user = User.objects.get(username=username)
    Serialized_user = UserSerializers(user)
    request.data['User']=Serialized_user.data['id']
    serializer = UserNetWorthSerializers(data=request.data)
    print(serializer)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def UserHistoryUpdate(request,username):
    user = User.objects.get(username=username)
    Serialized_user = UserSerializers(user)
    request.data['User']=Serialized_user.data['id']
    serializer = UserHistorySerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def UserStocksUpdate(request,username):
    user = User.objects.get(username=username)
    Serialized_user = UserSerializers(user)
    request.data['User']=Serialized_user.data['id']
    if UserStocks.objects.filter(User=user,Stocks=request.data['Stocks']):
        instance = UserStocks.objects.get(User=user,Stocks=request.data['Stocks'])
        serialized_instance = UserStocksSerializers(instance)
        request.data['amountOfStock']+= serialized_instance.data['amountOfStock'] 
        if request.data['amountOfStock'] <= 0:
            instance.delete()
            return Response('Item succsesfully delete!')
        serializer= UserStocksSerializers(instance=instance,data=request.data)
    else:
        serializer = UserStocksSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()     
    return Response(serializer.data)

@api_view(['POST'])
def cashUpdate(request,username):
    user = User.objects.get(username=username)
    serializer = UserSerializers(instance=user,data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)