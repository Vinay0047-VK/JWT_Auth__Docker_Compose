import pytest
from django.contrib.auth import get_user_model

User = get_user_model()

pytestmark = pytest.mark.django_db


class TestRegister:
    def test_register_success(self, api_client):
        res = api_client.post('/api/auth/register/', {
            'email': 'new@example.com',
            'name': 'New User',
            'password': 'newpass123',
        }, format='json')
        assert res.status_code == 201
        assert res.data['email'] == 'new@example.com'
        assert 'password' not in res.data  # never expose password

    def test_register_duplicate_email(self, api_client, create_user):
        create_user(email='dupe@example.com')
        res = api_client.post('/api/auth/register/', {
            'email': 'dupe@example.com',
            'name': 'Dupe',
            'password': 'dupepass123',
        }, format='json')
        assert res.status_code == 400

    def test_register_weak_password(self, api_client):
        res = api_client.post('/api/auth/register/', {
            'email': 'weak@example.com',
            'name': 'Weak',
            'password': '123',  # too short
        }, format='json')
        assert res.status_code == 400

    def test_register_missing_email(self, api_client):
        res = api_client.post('/api/auth/register/', {
            'name': 'No Email',
            'password': 'testpass123',
        }, format='json')
        assert res.status_code == 400


class TestLogin:
    def test_login_success(self, api_client, create_user):
        create_user(email='login@example.com', password='loginpass123')
        res = api_client.post('/api/auth/login/', {
            'email': 'login@example.com',
            'password': 'loginpass123',
        }, format='json')
        assert res.status_code == 200
        assert 'access' in res.data
        assert 'refresh' in res.data
        assert 'user' in res.data

    def test_login_wrong_password(self, api_client, create_user):
        create_user(email='fail@example.com', password='correctpass123')
        res = api_client.post('/api/auth/login/', {
            'email': 'fail@example.com',
            'password': 'wrongpass123',
        }, format='json')
        assert res.status_code == 401

    def test_login_nonexistent_user(self, api_client):
        res = api_client.post('/api/auth/login/', {
            'email': 'nobody@example.com',
            'password': 'somepass123',
        }, format='json')
        assert res.status_code == 401

    def test_login_missing_fields(self, api_client):
        res = api_client.post('/api/auth/login/', {}, format='json')
        assert res.status_code == 400


class TestMe:
    def test_me_authenticated(self, auth_client):
        res = auth_client.get('/api/auth/me/')
        assert res.status_code == 200
        assert res.data['email'] == 'test@example.com'
        assert 'password' not in res.data

    def test_me_unauthenticated(self, api_client):
        res = api_client.get('/api/auth/me/')
        assert res.status_code == 401


class TestLogout:
    def test_logout_success(self, api_client, create_user):
        create_user(email='logout@example.com', password='logoutpass123')
        login_res = api_client.post('/api/auth/login/', {
            'email': 'logout@example.com',
            'password': 'logoutpass123',
        }, format='json')
        access  = login_res.data['access']
        refresh = login_res.data['refresh']

        api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        res = api_client.post('/api/auth/logout/', {'refresh': refresh}, format='json')
        assert res.status_code == 200

    def test_logout_blacklists_token(self, api_client, create_user):
        create_user(email='blacklist@example.com', password='blackpass123')
        login_res = api_client.post('/api/auth/login/', {
            'email': 'blacklist@example.com',
            'password': 'blackpass123',
        }, format='json')
        access  = login_res.data['access']
        refresh = login_res.data['refresh']

        api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        api_client.post('/api/auth/logout/', {'refresh': refresh}, format='json')

        # try to use the same refresh token again — must fail
        refresh_res = api_client.post('/api/auth/token/refresh/', {
            'refresh': refresh
        }, format='json')
        assert refresh_res.status_code == 401

    def test_logout_unauthenticated(self, api_client):
        res = api_client.post('/api/auth/logout/', {'refresh': 'faketoken'}, format='json')
        assert res.status_code == 401