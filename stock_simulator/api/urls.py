from django.urls import path
from . import views

urlpatterns = [
    path('',views.apiOverview,name='api-overview'),
    path('user-list/',views.userList,name='user-list'),
    path('user-detail/<str:username>/',views.userDetail,name='user-Detail'),
    path('user-verify/<str:username>/',views.userVerify,name='user-Verify'),
    path('user-create/',views.userCreate,name='user-Create'),
    path('user-update/<str:pk>/',views.userUpdate,name='user-Update'),  
    path('user-delete/<str:pk>/',views.userDelete,name='user-Delete'),    
    path('user-networth/<str:username>/',views.NetworthGet,name='user-Networth'),   
    path('user-stocks/<str:username>/',views.UserStocksGet,name='user-Networth'),  
    path('user-history/<str:username>/',views.UserHistroyGet,name='user-Networth'), 
    path('networth-create/<str:username>/',views.NetworthUpdate,name='user-Networth'),   
    path('stocks-create/<str:username>/',views.UserStocksUpdate,name='user-Networth'),  
    path('history-create/<str:username>/',views.UserHistoryUpdate,name='user-Networth'), 
    path('cash-update/<str:username>/',views.cashUpdate,name='cash-update'),  
    ]