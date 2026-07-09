import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def create_user():
    def make_user(email="test@example.com", password="testpass123", u_name="Test User"):
        return User.objects.create_user(email=email, password=password, u_name=u_name)

    return make_user


@pytest.fixture
def auth_client(create_user):
    # creates its OWN APIClient — does not share with api_client fixture
    user = create_user()
    client = APIClient()
    response = client.post(
        "/api/auth/login/",
        {
            "email": "test@example.com",
            "password": "testpass123",
        },
        format="json",
    )
    token = response.data["access"]
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
    client.user = user
    return client


@pytest.fixture
def second_auth_client(create_user):
    user = create_user(
        email="other@example.com", password="otherpass123", u_name="Other User"
    )
    client = APIClient()
    response = client.post(
        "/api/auth/login/",
        {
            "email": "other@example.com",
            "password": "otherpass123",
        },
        format="json",
    )
    token = response.data["access"]
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
    client.user = user
    return client
