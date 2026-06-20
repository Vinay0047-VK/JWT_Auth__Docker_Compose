# JWT_Auth__Docker_Compose

# **Jun 10 2026**

GitHub Connected to local system - Jun 10 2026

- installed django
- pipenv

Commands
> pipenv shell 
to create virtual environment

> pipenv install djangorestframework-simplejwt

> pipenv install djangorestframework

> pipenv install psycopg2-binary

> pipenv install python-decouple

> django-admin startproject config .
to create __config__ folder

> python manage.py runserver
to run server

> python manage.py startapp users
app folder __users__

> python manage.py startapp tasks
app folder __tasks__

Added __users__ , __tasks__ to INSTALLED_APPS in `config/settings.py`

In __users__/models.py 
creating user model

In __config__/settings.py 

- AUTH_USER_MODEL = "users.User"
- Changes in settings.py

Configuring Environment variables

Added __gitignore__ 


# **Jun 11 2026**

Created vite App

> npm create vite@latest . -- --template react

Created Folders
- __api__/
    axiosInstance.js
    auth.js
    tasks.js

- __context__/
    AuthContext.jsx

- __hooks__/
    useAuth.js
    useTasks.js

- __pages__/
    Login.jsx
    Register.jsx
    Dashboard.jsx

- __components__/
    PrivateRoute.jsx
    Navbar.jsx
    TaskCard.jsx
    TaskForm.jsx
    Spinner.jsx

---

# **Jun 15 2026**

{Frontend Phase-2}
---

# **Jun 20 2026**

{Backend Phase-3}

Task App CRUD

Added Docker files in Root and also frontend and backend