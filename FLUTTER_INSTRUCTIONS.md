# Flutter Application & Automated APK Build Guide

This workspace has been updated to include the **complete, production-ready Flutter codebase** for your Dental AI Clinic application. Below are the files generated and step-by-step instructions on how to run this on your local machine and set up **GitHub Actions** to automatically build your `.apk` (Android Package) file upon every push.

---

## 📂 Generated Files in your Workspace

1. **`main.dart`**: The complete, single-file Flutter codebase containing all screens (Home, Services, Gallery, Booking, About, Contact), Arabic/English localization, custom design system, and the slide-out menu drawer.
2. **`.github/workflows/build-apk.yml`**: A pre-configured GitHub Actions configuration file. When you push this project to GitHub, GitHub will automatically compile the Flutter project and generate a downloadable release-ready APK.

---

## 🛠️ Step 1: Run Locally or Create a Flutter Project

If you want to run this application on your local machine or an emulator:

1. Install Flutter on your system (follow the official [Flutter installation guide](https://docs.flutter.dev/get-started/install)).
2. Create a new Flutter project in a clean directory:
   ```bash
   flutter create Dr_Mustafa
   cd Dr_Mustafa
   ```
3. Add the required dependencies to your `pubspec.yaml` file under `dependencies:`:
   ```yaml
   dependencies:
     flutter:
       sdk: flutter
     lucide_icons: ^0.1.2 # To match our high-quality Lucide Icons design
     google_fonts: ^6.2.0 # For our elegant "Space Grotesk" and "Inter" fonts
     url_launcher: ^6.3.0 # For the phone, WhatsApp, and Google Maps click events
   ```
4. Run `flutter pub get` in your terminal to fetch the dependencies.
5. Replace the contents of your `lib/main.dart` file with the complete code from the `flutter_main.dart` file in this workspace.
6. **Crucial: Add Internet Permission** (Needed for Supabase connection):
   Open the file `android/app/src/main/AndroidManifest.xml` and insert this tag inside the `<manifest>` tag, just before the `<application ...>` tag:
   ```xml
   <uses-permission android:name="android.permission.INTERNET" />
   ```
7. Run the app:
   ```bash
   flutter run
   ```

---

## 🚀 Step 2: Push to GitHub to Auto-Build APK

To compile your APK automatically using GitHub's secure cloud servers:

1. Create a new, blank repository on your [GitHub](https://github.com) account.
2. Link your local project directory to your GitHub repository and push your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Flutter Dental Clinic app"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
3. Once pushed, navigate to the **Actions** tab on your GitHub repository page.
4. You will see the **"Build & Release Android APK"** workflow running automatically!
5. When the build completes successfully, click on the workflow run, scroll down to the **Artifacts** section, and download your **`dental-clinic-release-apks`**!

   Within the downloaded ZIP, you will find:
   - **`app-release.apk`**: A single "universal" release APK (typically ~12-15MB) containing native code for all CPU architectures.
   - **`app-arm64-v8a-release.apk`**: A highly optimized APK (typically **only ~5-8MB**) targeted specifically for modern 64-bit Android devices.
   - **`app-armeabi-v7a-release.apk`**: A highly optimized APK (typically **only ~5-7MB**) for older 32-bit Android devices.

---

## 🔒 Optional: Signed production APKs
To publish to the Google Play Store, you can sign the APK by adding your Keystore files to GitHub Secrets. Our pre-configured GitHub action builds optimized unsigned release APKs which are immediately installable on most Android phones for testing (make sure "Install from Unknown Sources" is enabled in settings).
