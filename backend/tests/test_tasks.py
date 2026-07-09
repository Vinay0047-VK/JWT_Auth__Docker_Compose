import pytest
from tasks.models import Task

pytestmark = pytest.mark.django_db


@pytest.fixture
def task(auth_client):
    res = auth_client.post(
        "/api/tasks/",
        {
            "title": "Test task",
            "description": "Test description",
            "status": "todo",
        },
        format="json",
    )
    return res.data


class TestTaskCreate:
    def test_create_task_success(self, auth_client):
        res = auth_client.post(
            "/api/tasks/",
            {
                "title": "New task",
                "description": "Some description",
                "status": "todo",
            },
            format="json",
        )
        assert res.status_code == 201
        assert res.data["title"] == "New task"
        assert res.data["status"] == "todo"

    def test_create_task_unauthenticated(self, api_client):
        res = api_client.post(
            "/api/tasks/",
            {
                "title": "Sneaky task",
            },
            format="json",
        )
        assert res.status_code == 401

    def test_create_task_missing_title(self, auth_client):
        res = auth_client.post(
            "/api/tasks/",
            {
                "description": "No title",
            },
            format="json",
        )
        assert res.status_code == 400


class TestTaskList:
    def test_list_own_tasks_only(self, auth_client, second_auth_client):
        # user 1 creates a task
        auth_client.post("/api/tasks/", {"title": "User 1 task"}, format="json")

        # user 2 creates a task
        second_auth_client.post("/api/tasks/", {"title": "User 2 task"}, format="json")

        # user 1 should only see their own task
        res = auth_client.get("/api/tasks/")
        assert res.status_code == 200
        titles = [t["title"] for t in res.data["results"]]
        assert "User 1 task" in titles
        assert "User 2 task" not in titles

    def test_list_unauthenticated(self, api_client):
        res = api_client.get("/api/tasks/")
        assert res.status_code == 401

    def test_list_empty_for_new_user(self, auth_client):
        res = auth_client.get("/api/tasks/")
        assert res.status_code == 200
        assert res.data["count"] == 0


class TestTaskFilter:
    def test_filter_by_status(self, auth_client):
        auth_client.post(
            "/api/tasks/", {"title": "Todo task", "status": "todo"}, format="json"
        )
        auth_client.post(
            "/api/tasks/", {"title": "Done task", "status": "done"}, format="json"
        )
        auth_client.post(
            "/api/tasks/",
            {"title": "Progress task", "status": "in_progress"},
            format="json",
        )

        res = auth_client.get("/api/tasks/?status=done")
        assert res.status_code == 200
        statuses = [t["status"] for t in res.data["results"]]
        assert all(s == "done" for s in statuses)

    def test_filter_returns_empty_for_no_match(self, auth_client):
        auth_client.post(
            "/api/tasks/", {"title": "Todo task", "status": "todo"}, format="json"
        )
        res = auth_client.get("/api/tasks/?status=done")
        assert res.data["count"] == 0


class TestTaskUpdate:
    def test_update_own_task(self, auth_client, task):
        res = auth_client.patch(
            f'/api/tasks/{task["id"]}/', {"status": "done"}, format="json"
        )
        assert res.status_code == 200
        assert res.data["status"] == "done"

    def test_cannot_update_other_users_task(self, second_auth_client, task):
        res = second_auth_client.patch(
            f'/api/tasks/{task["id"]}/', {"status": "done"}, format="json"
        )
        assert res.status_code == 404  # not 403 — we don't even reveal it exists

    def test_update_unauthenticated(self, api_client, auth_client):
        # create task with authenticated user first
        res = auth_client.post(
            "/api/tasks/",
            {
                "title": "Task to update",
                "status": "todo",
            },
            format="json",
        )
        task_id = res.data["id"]

        # now try to update without auth
        res = api_client.patch(
            f"/api/tasks/{task_id}/", {"status": "done"}, format="json"
        )
        assert res.status_code == 401


class TestTaskDelete:
    def test_delete_own_task(self, auth_client, task):
        res = auth_client.delete(f'/api/tasks/{task["id"]}/')
        assert res.status_code == 204

        # confirm it's gone
        get_res = auth_client.get(f'/api/tasks/{task["id"]}/')
        assert get_res.status_code == 404

    def test_cannot_delete_other_users_task(self, second_auth_client, task):
        res = second_auth_client.delete(f'/api/tasks/{task["id"]}/')
        assert res.status_code == 404

    def test_delete_unauthenticated(self, api_client, auth_client):
        # create task with authenticated user first
        res = auth_client.post(
            "/api/tasks/",
            {
                "title": "Task to delete",
                "status": "todo",
            },
            format="json",
        )
        task_id = res.data["id"]

        # now try to delete without auth
        res = api_client.delete(f"/api/tasks/{task_id}/")
        assert res.status_code == 401
