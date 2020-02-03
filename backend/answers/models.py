from django.db import models
from questions.models import Question
from django.conf import settings

# Create your models here.


class Answer(models.Model):
    answer = models.CharField(max_length=10000, null=False, blank=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.answer
