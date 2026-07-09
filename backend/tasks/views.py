# # from django.shortcuts import render

# # # Create your views here.

# from rest_framework import viewsets, permissions
# from .models import Task
# from .serializers import TaskSerializer
# from .filters import TaskFilter


# class TaskViewSet(viewsets.ModelViewSet):
#     serializer_class   = TaskSerializer
#     permission_classes = [permissions.IsAuthenticated]
#     filterset_class    = TaskFilter
#     ordering_fields    = ['created_at', 'updated_at', 'title']

#     def get_queryset(self):
#         return Task.objects.filter(user=self.request.user)

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)

from rest_framework import viewsets, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Task
from .serializers import TaskSerializer
from .filters import TaskFilter


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    filterset_class = TaskFilter
    ordering_fields = ["created_at", "updated_at", "title"]

    def get_queryset(self):
        if not self.request.user or not self.request.user.is_authenticated:
            return Task.objects.none()
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
