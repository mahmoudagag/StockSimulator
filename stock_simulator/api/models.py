from typing import AbstractSet
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(models.Model):
    firstname=models.CharField(max_length=300,blank=True)
    lastname=models.CharField(max_length=300,blank=True)
    username=models.CharField(max_length=300)
    email=models.CharField(max_length=300,blank=True)
    password=models.CharField(max_length=300)
    CashInHand=models.IntegerField(default=50000,blank=True)

    def __str__(self):
        return self.username

class UserStocks(models.Model):
    User= models.ForeignKey(User, on_delete=models.CASCADE)
    Stocks = models.CharField(max_length=10)
    amountOfStock=models.IntegerField()

class UserHistory(models.Model):
    User= models.ForeignKey(User, on_delete=models.CASCADE) 
    isBought = models.BooleanField()  
    Stock=models.CharField(max_length=20)
    amountOfStock=models.IntegerField()
    Time = models.DateTimeField(auto_now_add=True)

class UserNetWorth(models.Model):
    User= models.ForeignKey(User, on_delete=models.CASCADE)
    UserNetWorth = models.IntegerField()
    Time=models.DateTimeField(auto_now_add=True)