import os

app_env = os.environ.get('APP_ENV', 'development')
print(f"Current environment: {app_env}")
print(f"Application is running in '{app_env}' mode.")
