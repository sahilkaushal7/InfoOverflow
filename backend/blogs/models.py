from django.db import models
from django.conf import settings

class Blog(models.Model):
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  image = models.ImageField(upload_to='images/', null=True, blank=True)
  title = models.CharField(max_length=255)
  description = models.CharField(max_length=1000)

  def __str__(self):
      return self.title
  
