from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.IntegerField()
    weight = models.IntegerField()
    compound = models.TextField()
    categories = models.ManyToManyField('Category')
    amount = models.IntegerField()
    sale = models.IntegerField(default=0)
    calories = models.FloatField()
    proteins = models.FloatField()
    fats = models.FloatField()
    carbohydrates = models.FloatField()
    img = models.ImageField(upload_to='imgs/', default='default.png')

    def __str__(self) -> str:
        return self.name


class Category(models.Model):
    name=models.CharField(max_length=255, unique=True)
    
    def __str__(self) -> str:
        return self.name
