from django.contrib import admin
from django.urls import path,include               
from rest_framework import routers                 
from api import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns                            
from django.conf import settings
from django.conf.urls.static import static
from . import views as vs
# router = routers.SimpleRouter()        
router = routers.DefaultRouter()            
router.register(r'AzItemAnime', views.AzItemAnimeView, 'itemview')
router.register(r'AzSubItemAnime', views.AzSubItemAnimeView, 'subitemview')
router.register(r'AzMovie', views.AzItemMovieView, 'itemmovie')
router.register(r'detailMovie/<str:slug>', views.detailMovie, 'detail_item_movie')

urlpatterns = [
    # path('criticalpage/', admin.site.urls),
    path('api/', include(router.urls)),
    # path('movie/',views.itemListMovie.as_view()),
    # path('anime/',views.itemListAnime.as_view()),
    path('Movie/<str:slug>/', views.DetailMovie.as_view()),
    path('Anime/<str:slug>/', views.DetailAnime.as_view()),
    path('Anime/sub/<int:id_item>/', views.DetailSubAnime.as_view()),
    # path('', vs.index, name='index'),
    path('criticalpage/', vs.critical_page, name='criticalpage'),
    # path('film/<str:category>/', views.itemList.as_view()),
    # path('film/subdetail/<str:slug>/', views.itemSubDetail.as_view()),
    # path('film/<str:category>/<str:type>/', views.itemType.as_view()),
    # path('film/<str:category>/genre/<str:genre>/', views.itemGenre.as_view()),
    # path('film/search/item/<str:series>/', views.searchList.as_view()),
    
]
urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)