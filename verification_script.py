from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 1920, "height": 1080})

        # Navigate to the dashboard
        print("Navigating to dashboard...")
        page.goto("http://localhost:5173/")

        # Wait for map to load (give it some time)
        time.sleep(3)

        # Click on the first alert in the Sidebar
        print("Clicking on first alert...")
        # The alert card has text "ALERT #"
        page.click("text=ALERT #")

        # Wait for RightPanel to appear
        print("Waiting for RightPanel...")
        page.wait_for_selector("text=TARGET ANALYSIS")

        # Take screenshot
        print("Taking screenshot...")
        page.screenshot(path="dashboard_verification.png")

        browser.close()

if __name__ == "__main__":
    run()
