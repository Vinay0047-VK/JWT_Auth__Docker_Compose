# from django.db import models

# # Create your models here.

import uuid
from django.conf import settings
from django.db import models


class Task(models.Model):
    class Status(models.TextChoices):
        TODO        = 'todo', 'To do'
        IN_PROGRESS = 'in_progress', 'In progress'
        DONE        = 'done', 'Done'

    id          = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user        = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tasks')
    title       = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status      = models.CharField(max_length=20, choices=Status.choices, default=Status.TODO)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title