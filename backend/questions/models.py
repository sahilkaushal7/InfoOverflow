from django.db import models
from django.conf import settings
from multiselectfield import MultiSelectField

TAGS_CHOICES = (
    ("1", "Frontend"),
    ("2", "Backend"),
)


class Question(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=250, null=False, blank=False)
    description = models.CharField(max_length=5000, null=False, blank=False)
    tags = MultiSelectField(choices=TAGS_CHOICES, max_choices=2, max_length=3)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
