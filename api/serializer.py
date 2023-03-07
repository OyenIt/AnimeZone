from rest_framework import serializers
from .models import AzItemAnime,AzSubItemAnime,AzItemMovie

class AzItemAnimeSerializer(serializers.ModelSerializer):
    itemanime = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = AzItemAnime
        fields = "__all__"
        ordering = ['AzSubItemAnime__episode']
class AzSubItemAnimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AzSubItemAnime
        fields = "__all__"

class AzMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = AzItemMovie
        fields = "__all__"
        read_only_fields = ("user",)
# class NjItemTopSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = njTopRecom
#         fields = ('id' ,'title','title1', 'title2')

