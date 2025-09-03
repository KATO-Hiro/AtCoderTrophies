import os
import subprocess

if os.getenv("GITHUB_ACTIONS"):
    print("run tests with --vcr-record=none in GitHub Actions.")
    subprocess.run(["pytest", "tests/", "--vcr-record=none"], check=True)
else:
    print("run tests in local.")
    subprocess.run(["pytest", "tests/"], check=True)
