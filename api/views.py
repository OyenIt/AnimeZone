from unicodedata import category
from django.shortcuts import render
from .serializer import AzItemAnimeSerializer,AzSubItemAnimeSerializer,AzMovieSerializer
from rest_framework import viewsets,generics    
from .models import AzSubItemAnime,AzItemAnime,AzItemMovie              
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django_filters.rest_framework import DjangoFilterBackend
from datetime import datetime, timedelta


# class admin_page()



class AzItemMovieView(viewsets.ModelViewSet):  
    serializer_class = AzMovieSerializer 
    queryset = AzItemMovie.objects.all().order_by('-release')
    
class AzItemAnimeView(viewsets.ModelViewSet):  
    serializer_class = AzItemAnimeSerializer   
    queryset = AzItemAnime.objects.all()
    
class AzSubItemAnimeView(viewsets.ModelViewSet):  
    serializer_class = AzSubItemAnimeSerializer
    queryset = AzSubItemAnime.objects.all().order_by('-upload_at')

class subSeriesAninme(viewsets.ModelViewSet):
    serializer_class = AzMovieSerializer
    def get_queryset(self):
        series = self.kwargs['series']
        return AzSubItemAnime.objects.filter(series=series)
    
    
class detailMovie(viewsets.ModelViewSet):
    serializer_class = AzMovieSerializer
    def get_queryset(self):
        slug = self.kwargs['slug']
        return AzItemMovie.objects.filter(slug=slug)
    

class searchMovie(generics.ListAPIView):
    serializer_class = AzMovieSerializer
    def get_queryset(self):
        title = self.kwargs['title']
        return AzItemMovie.objects.filter(title__icontains=title)

class searchAnime(generics.ListAPIView):
    serializer_class = AzItemAnimeSerializer
    def get_queryset(self):
        series = self.kwargs['series']
        return AzItemAnime.objects.filter(series__icontains=series)

class byGenre(generics.ListAPIView):
    serializer_class = AzMovieSerializer
    def get_queryset(self):
        # genre = self.kwargs['genre']
        return AzItemMovie.objects.filter(genres__contains=["Adventure","Action"])





    # Show All item 
class itemListMovie(generics.ListAPIView):
    serializer_class = AzMovieSerializer
    def get_queryset(self):
        return AzItemMovie.objects.all()



    # Show item list
# class itemListMovie(generics.ListAPIView):
#     serializer_class = AzMovieSerializer
#     def get_queryset(self):
#         return AzItemMovie.objects.all().order_by('-release')
    
# class itemListAnime(generics.ListAPIView):
#     serializer_class = AzItemAnimeSerializer
#     def get_queryset(self):
#         return AzItemAnime.objects.all().order_by('-release')
    
    # Detail Movie
class DetailMovie(generics.ListAPIView):
    serializer_class = AzMovieSerializer
    def get_queryset(self):
        slug = self.kwargs['slug']
        return AzItemMovie.objects.filter(slug=slug)
    
class DetailAnime(generics.ListAPIView):
    serializer_class = AzItemAnimeSerializer
    def get_queryset(self):
        slug = self.kwargs['slug']
        return AzItemAnime.objects.filter(slug=slug)
    
class DetailSubAnime(generics.ListAPIView):
    serializer_class = AzSubItemAnimeSerializer
    def get_queryset(self):
        id_item = self.kwargs['id_item']
        return AzSubItemAnime.objects.filter(id=id_item)