from unicodedata import category
from django.shortcuts import render
from .serializer import AzItemAnimeSerializer,AzSubItemAnimeSerializer,AzMovieSerializer
from rest_framework import viewsets,generics    
from .models import AzSubItemAnime,AzItemAnime,AzItemMovie              
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django_filters.rest_framework import DjangoFilterBackend
from datetime import datetime, timedelta

class AzItemMovieView(viewsets.ModelViewSet):  
    serializer_class = AzMovieSerializer 
    queryset = AzItemMovie.objects.all()
    
class AzItemAnimeView(viewsets.ModelViewSet):  
    serializer_class = AzItemAnimeSerializer   
    queryset = AzItemAnime.objects.all()
    
class AzSubItemAnimeView(viewsets.ModelViewSet):  
    serializer_class = AzSubItemAnimeSerializer
    queryset = AzSubItemAnime.objects.all()


    # Show item list
class itemListMovie(generics.ListAPIView):
    serializer_class = AzMovieSerializer
    def get_queryset(self):
        return AzItemMovie.objects.all().order_by('-release')
    
class itemListAnime(generics.ListAPIView):
    serializer_class = AzItemAnimeSerializer
    def get_queryset(self):
        return AzItemAnime.objects.all().order_by('-release')
    
    # Detail Movie
class itemDetailMovie(generics.ListAPIView):
    serializer_class = AzMovieSerializer
    def get_queryset(self):
        slug = self.kwargs['slug']
        return AzItemMovie.objects.filter(slug=slug)
    
class itemDetailAnime(generics.ListAPIView):
    serializer_class = AzItemAnimeSerializer
    def get_queryset(self):
        slug = self.kwargs['slug']
        return AzItemAnime.objects.filter(slug=slug)