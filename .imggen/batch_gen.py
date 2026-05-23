#!/usr/bin/env python3
"""
Batch image generator for Ugly Duckling Houses advertorial images.
Uses Kie.ai GPT Image 2 model (3:2 landscape, editorial documentary style).
Generates all 18 canonical adv-*.jpg filenames into public/images/.
"""

import os
import sys
import json
import time
import requests

# Paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
OUTPUT_DIR = os.path.join(PROJECT_ROOT, "public", "images")
PROMPTS_FILE = os.path.join(SCRIPT_DIR, "prompts.json")
LOG_FILE = os.path.join(SCRIPT_DIR, "gen.log")

# Model (nano-banana-2 = Kie's high-quality image generation model)
MODEL = "nano-banana-2"
ASPECT_RATIO = "3:2"

def get_api_key():
    key = os.environ.get("KIE_API_KEY")
    if key:
        return key
    secrets = os.path.expanduser("~/.secrets")
    if os.path.exists(secrets):
        with open(secrets) as f:
            for line in f:
                if line.startswith("KIE_API_KEY="):
                    return line.strip().split("=", 1)[1].strip('"\'')
    print("ERROR: KIE_API_KEY not found in env or ~/.secrets")
    sys.exit(1)

def create_task(api_key, prompt):
    url = "https://api.kie.ai/api/v1/jobs/createTask"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }
    payload = {
        "model": MODEL,
        "input": {
            "prompt": prompt,
            "aspect_ratio": ASPECT_RATIO,
            "resolution": "1K",
            "output_format": "jpg"
        }
    }
    resp = requests.post(url, headers=headers, json=payload, timeout=30)
    resp.raise_for_status()
    return resp.json()

def poll_task(api_key, task_id, max_attempts=90):
    url = "https://api.kie.ai/api/v1/jobs/recordInfo"
    headers = {"Authorization": f"Bearer {api_key}"}
    for attempt in range(max_attempts):
        time.sleep(5)
        resp = requests.get(url, headers=headers, params={"taskId": task_id}, timeout=15)
        resp.raise_for_status()
        data = resp.json().get("data", {})
        state = data.get("state", "")
        print(f"  Poll {attempt+1}: {state}")
        if state in ("success", "completed"):
            try:
                result_json = json.loads(data.get("resultJson", "{}"))
                urls = result_json.get("resultUrls", [])
                if urls:
                    return urls[0]
            except Exception:
                pass
            return None
        if state in ("failed", "error"):
            print(f"  Task failed: {json.dumps(data)}")
            return None
    print("  Timed out waiting for task")
    return None

def download_image(url, path):
    resp = requests.get(url, timeout=60)
    resp.raise_for_status()
    with open(path, "wb") as f:
        f.write(resp.content)

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    api_key = get_api_key()

    with open(PROMPTS_FILE) as f:
        prompts = json.load(f)

    log_lines = []
    total = len(prompts)
    done = 0
    failed = []

    for name, prompt in prompts.items():
        output_path = os.path.join(OUTPUT_DIR, f"{name}.jpg")
        if os.path.exists(output_path):
            print(f"[{done+1}/{total}] SKIP (exists): {name}.jpg")
            done += 1
            continue

        print(f"[{done+1}/{total}] Generating: {name}.jpg ...")
        try:
            result = create_task(api_key, prompt)
            task_id = result.get("data", {}).get("taskId")
            if not task_id:
                print(f"  ERROR: no taskId. Response: {result}")
                failed.append(name)
                continue

            image_url = poll_task(api_key, task_id)
            if not image_url:
                print(f"  ERROR: could not get image URL for {name}")
                failed.append(name)
                continue

            download_image(image_url, output_path)
            print(f"  Saved: {output_path}")
            log_lines.append(f"OK {name}: {image_url}")
            done += 1

        except Exception as e:
            print(f"  EXCEPTION: {e}")
            failed.append(name)
            log_lines.append(f"FAIL {name}: {e}")

        # Small pause between tasks
        time.sleep(2)

    with open(LOG_FILE, "w") as f:
        f.write("\n".join(log_lines))

    print(f"\nDone: {done}/{total} generated. Failed: {failed}")

if __name__ == "__main__":
    main()
