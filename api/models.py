from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User


class Company(models.Model):
    name = models.CharField(max_length=200)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, related_name="user_company")


class Channel(models.Model):
    company = models.ForeignKey(Company, related_name="channel_company")
    name = models.CharField(max_length=200)

admin.site.register(Channel)
admin.site.register(Company)
admin.site.register(UserProfile)