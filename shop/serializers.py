from rest_framework import serializers

class ProductSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=255)
    price = serializers.IntegerField()
    weight = serializers.IntegerField()
    compound = serializers.CharField()
    #categories = serializers.ManyToManyField('Category')
    amount = serializers.IntegerField()
    sale = serializers.IntegerField(default=0)
    calories = serializers.FloatField()
    proteins = serializers.FloatField()
    fats = serializers.FloatField()
    carbohydrates = serializers.FloatField()
    img = serializers.ImageField()

class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=255)