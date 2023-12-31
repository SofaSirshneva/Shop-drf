# Generated by Django 4.2.4 on 2023-08-05 13:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('price', models.IntegerField()),
                ('weight', models.IntegerField()),
                ('compound', models.TextField()),
                ('amount', models.IntegerField()),
                ('sale', models.IntegerField(default=0)),
                ('calories', models.FloatField()),
                ('proteins', models.FloatField()),
                ('fats', models.FloatField()),
                ('carbohydrates', models.FloatField()),
                ('categories', models.ManyToManyField(to='shop.category')),
            ],
        ),
    ]
