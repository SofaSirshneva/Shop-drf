from rest_framework import serializers


class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=255)


class ProductSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=255)
    price = serializers.IntegerField()
    weight = serializers.IntegerField()
    compound = serializers.CharField()
    categories = CategorySerializer(read_only=True, many=True)
    amount = serializers.IntegerField()
    sale = serializers.IntegerField(default=0)
    calories = serializers.FloatField()
    proteins = serializers.FloatField()
    fats = serializers.FloatField()
    carbohydrates = serializers.FloatField()
    img = serializers.ImageField()
