import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:hive_flutter/hive_flutter.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Hive.initFlutter();
  await Hive.openBox('settingsBox');
  await Hive.openBox('doctorsBox');
  await Hive.openBox('servicesBox');
  await Hive.openBox('galleryBox');

  await Supabase.initialize(
    url: 'https://dkofobocffyzlpmqrrwo.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrb2ZvYm9jZmZ5emxwbXFycndvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NDY0NTIsImV4cCI6MjA5NjQyMjQ1Mn0.JmQWvPhsMjobIAWM1EuRtHOsomBJ8U5FiY20ml8dRSo',
  );
  runApp(const DentalClinicApp());
}

final supabase = Supabase.instance.client;

Widget buildSlowDownloadImage({
  required String url,
  double? width,
  double? height,
  BoxFit fit = BoxFit.cover,
}) {
  if (url.isEmpty) {
    return Container(color: const Color(0xFF161D1F));
  }
  return Image.network(
    url,
    width: width,
    height: height,
    fit: fit,
    frameBuilder: (context, child, frame, wasSynchronouslyLoaded) {
      if (wasSynchronouslyLoaded) {
        return child;
      }
      return AnimatedOpacity(
        opacity: frame != null ? 1.0 : 0.0,
        duration: const Duration(milliseconds: 700),
        curve: Curves.easeOut,
        child: frame != null
            ? child
            : Container(
                width: width,
                height: height,
                color: const Color(0xFF161D1F),
                child: const Center(
                  child: SizedBox(
                    width: 20,
                    height: 20,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      color: Color(0xFF14D8FF),
                    ),
                  ),
                ),
              ),
      );
    },
    errorBuilder: (context, error, stackTrace) => Container(
      width: width,
      height: height,
      color: const Color(0xFF161D1F),
      child: const Icon(Icons.image_not_supported_outlined, color: Colors.white24, size: 24),
    ),
  );
}

Widget _buildProfileImage({required String imageUrl, required double size, double borderWidth = 2}) {
  return Container(
    width: size,
    height: size,
    decoration: BoxDecoration(
      shape: BoxShape.circle,
      border: Border.all(color: const Color(0xFF14D8FF), width: borderWidth),
      boxShadow: [
        BoxShadow(
          color: const Color(0xFF14D8FF).withOpacity(0.3),
          blurRadius: 15,
          spreadRadius: 2,
        )
      ],
    ),
    child: ClipOval(
      child: Image.asset(
        'src/assets/images/doctor_mustafa_uploaded.png',
        fit: BoxFit.cover,
        errorBuilder: (context, error, stackTrace) {
          return Container(color: Colors.black26);
        },
      ),
    ),
  );
}

class DentalClinicApp extends StatelessWidget {
  const DentalClinicApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Dr. Mustafa Al-Rifaie',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF0E1417),
        primaryColor: const Color(0xFF14D8FF),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF14D8FF),
          secondary: Color(0xFF03D4ED),
          surface: Color(0xFF161D1F),
          background: Color(0xFF0E1417),
        ),
        fontFamily: 'Inter',
      ),
      home: const MainLayoutScreen(),
    );
  }
}

class MainLayoutScreen extends StatefulWidget {
  const MainLayoutScreen({super.key});

  @override
  State<MainLayoutScreen> createState() => _MainLayoutScreenState();
}

class _MainLayoutScreenState extends State<MainLayoutScreen> {
  String _activeTab = 'home';
  String _locale = 'ar';
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  bool _isLoading = true;
  String? _error;

  Map<String, dynamic>? _settings;
  List<Map<String, dynamic>> _doctors = [];
  List<Map<String, dynamic>> _services = [];
  List<Map<String, dynamic>> _gallery = [];

  bool get isAr => _locale == 'ar';

  @override
  void initState() {
    super.initState();
    _fetchSupabaseData();
  }

  Future<void> _fetchSupabaseData() async {
    final settingsBox = Hive.box('settingsBox');
    final doctorsBox = Hive.box('doctorsBox');
    final servicesBox = Hive.box('servicesBox');
    final galleryBox = Hive.box('galleryBox');

    final cachedSettings = settingsBox.get('data');
    final cachedDoctors = doctorsBox.get('list');
    final cachedServices = servicesBox.get('list');
    final cachedGallery = galleryBox.get('list');

    if (cachedSettings != null && cachedDoctors != null && cachedServices != null && cachedGallery != null) {
      setState(() {
        _settings = Map<String, dynamic>.from(cachedSettings);
        _doctors = List<Map<String, dynamic>>.from((cachedDoctors as List).map((e) => Map<String, dynamic>.from(e)));
        _services = List<Map<String, dynamic>>.from((cachedServices as List).map((e) => Map<String, dynamic>.from(e)));
        _gallery = List<Map<String, dynamic>>.from((cachedGallery as List).map((e) => Map<String, dynamic>.from(e)));
        _isLoading = false;
        _error = null;
      });
    } else {
      setState(() {
        _isLoading = true;
        _error = null;
      });
    }

    try {
      final settingsData = await supabase.from('settings').select().maybeSingle();
      final doctorsData = await supabase.from('doctors').select().order('created_at', ascending: true);
      final servicesData = await supabase.from('services').select().eq('active', true).order('sort_order', ascending: true);
      final galleryData = await supabase.from('gallery').select().order('created_at', ascending: false);

      if (settingsData != null) {
        await settingsBox.put('data', Map<String, dynamic>.from(settingsData));
      }
      if (doctorsData != null) {
        await doctorsBox.put('list', doctorsData);
      }
      if (servicesData != null) {
        await servicesBox.put('list', servicesData);
      }
      if (galleryData != null) {
        await galleryBox.put('list', galleryData);
      }

      setState(() {
        _settings = settingsData;
        _doctors = List<Map<String, dynamic>>.from(doctorsData ?? []);
        _services = List<Map<String, dynamic>>.from(servicesData ?? []);
        _gallery = List<Map<String, dynamic>>.from(galleryData ?? []);
        _isLoading = false;
        _error = null;
      });
    } catch (e) {
      debugPrint('Error in _fetchSupabaseData: $e');
      if (_settings == null) {
        setState(() {
          _isLoading = false;
          _error = e.toString();
        });
      }
    }
  }

  void _onNavigate(String tab) {
    setState(() {
      _activeTab = tab;
    });
  }

  Map<String, String> getTranslation(String key) {
    final Map<String, Map<String, String>> translations = {
      'title': {
        'ar': _settings?['clinic_name_ar'] ?? 'د. مصطفى الرفاعي',
        'en': _settings?['clinic_name_en'] ?? 'Dr. Mustafa Al-Rifaie'
      },
      'subtitle': {
        'ar': _settings?['slogan_ar'] ?? 'طب وتجميل الأسنان',
        'en': _settings?['slogan_en'] ?? 'Dental Care & Aesthetics'
      },
      'home': {'ar': 'الرئيسية', 'en': 'Home'},
      'services': {'ar': 'الخدمات المميزة', 'en': 'Services'},
      'gallery': {'ar': 'معرض نجاحاتنا', 'en': 'Gallery'},
      'booking': {'ar': 'احجز موعدك', 'en': 'Booking'},
      'about': {'ar': 'عن الدكتور', 'en': 'About'},
      'contact': {'ar': 'تواصل معنا', 'en': 'Contact'},
      'philosophy_title': {'ar': 'فلسفة العيادة الذكية', 'en': 'Smart Clinical Philosophy'},
      'philosophy_text': {
        'ar': 'عيادة تجميل وزراعة الأسنان المتخصصة والمجهزة بأرقى تقنيات المسح الضوئي الرقمية والنمذجة لتصميم الابتسامة الأنسب لملامحك وبدون أي ألم.',
        'en': 'Specialized dental care clinic outfitted with digital imaging & modeling systems to craft your perfect smile, pain-free.'
      },
      'help_desk': {'ar': 'اتصال وحجز سريع', 'en': 'Instant Help Desk'},
      'telephone': {'ar': 'رقم العيادة', 'en': 'Clinic Telephone'},
      'whatsapp': {'ar': 'الواتساب الطبي', 'en': 'Clinical WhatsApp'},
      'address': {'ar': 'عنوان العيادة', 'en': 'Our Address'},
      'address_val': {
        'ar': _settings?['address_ar'] ?? 'جميرا، دبي',
        'en': _settings?['address_en'] ?? 'Jumeirah, Dubai'
      },
      'schedule': {'ar': 'ساعات العمل', 'en': 'Clinical Schedule'},
      'schedule_days': {
        'ar': (_settings?['working_hours_ar'] ?? 'الأحد - الخميس: 09:00 - 20:00\nالجمعة: 10:00 - 18:00\nالسبت: مغلق').toString().replaceAll('|', '\n'),
        'en': (_settings?['working_hours_en'] ?? 'Sun - Thu: 09:00 - 20:00\nFriday: 10:00 - 18:00\nSaturday: Closed').toString().replaceAll('|', '\n')
      },
      'back_home': {'ar': 'العودة للرئيسية', 'en': 'Back to Home'},
    };
    return {
      'text': translations[key]?[_locale] ?? key,
    };
  }

  Widget _renderContent() {
    final doctor = _doctors.isNotEmpty ? _doctors.first : null;
    switch (_activeTab) {
      case 'home':
        return HomeScreen(
          locale: _locale, 
          onNavigate: _onNavigate, 
          settings: _settings,
          doctor: doctor,
        );
      case 'services':
        return ServicesScreen(locale: _locale, onNavigate: _onNavigate, services: _services);
      case 'gallery':
        return GalleryScreen(locale: _locale, galleryItems: _gallery);
      case 'booking':
        return BookingScreen(locale: _locale, services: _services);
      case 'about':
        return AboutScreen(locale: _locale, doctors: _doctors);
      case 'contact':
        return ContactScreen(locale: _locale, settings: _settings);
      default:
        return HomeScreen(
          locale: _locale, 
          onNavigate: _onNavigate, 
          settings: _settings,
          doctor: doctor,
        );
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: ThemeData.dark(),
        home: Scaffold(
          backgroundColor: const Color(0xFF0E1417),
          body: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                CustomPaint(size: const Size(64, 64), painter: ToothPainter()),
                const SizedBox(height: 24),
                const CircularProgressIndicator(color: Color(0xFF14D8FF)),
                const SizedBox(height: 16),
                const Text('Loading clinic details directly from Supabase...', style: TextStyle(color: Colors.white54, fontSize: 13)),
              ],
            ),
          ),
        ),
      );
    }

    if (_error != null) {
      return MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: ThemeData.dark(),
        home: Scaffold(
          backgroundColor: const Color(0xFF0E1417),
          body: Padding(
            padding: const EdgeInsets.all(32.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.cloud_off, color: Colors.redAccent, size: 64),
                const SizedBox(height: 16),
                const Text('Supabase Connection Error', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
                const SizedBox(height: 8),
                Text(_error!, style: const TextStyle(fontSize: 12, color: Colors.white38), textAlign: TextAlign.center),
                const SizedBox(height: 24),
                ElevatedButton(
                  onPressed: _fetchSupabaseData,
                  style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF14D8FF)),
                  child: const Text('Retry Connection', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
                )
              ],
            ),
          ),
        ),
      );
    }

    final titleText = _activeTab == 'home' ? getTranslation('title')['text']! : getTranslation(_activeTab)['text']!;

    return Directionality(
      textDirection: isAr ? TextDirection.rtl : TextDirection.ltr,
      child: Scaffold(
        key: _scaffoldKey,
        drawer: _buildDrawer(),
        appBar: AppBar(
          backgroundColor: const Color(0xFF0E1417),
          elevation: 0,
          leading: _activeTab == 'home'
              ? IconButton(
                  icon: const Icon(Icons.menu, color: Colors.white, size: 28),
                  onPressed: () => _scaffoldKey.currentState?.openDrawer(),
                )
              : IconButton(
                  icon: Icon(isAr ? Icons.chevron_right : Icons.chevron_left, color: const Color(0xFF14D8FF), size: 28),
                  onPressed: () => setState(() => _activeTab = 'home'),
                ),
          title: _activeTab == 'home'
              ? Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(titleText, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
                    Text(getTranslation('subtitle')['text']!, style: const TextStyle(fontSize: 10, color: Color(0xFF859398), letterSpacing: 1)),
                  ],
                )
              : Text(
                  titleText,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF14D8FF),
                    shadows: [Shadow(color: Color(0x6614D8FF), blurRadius: 10)],
                  ),
                ),
          actions: [
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              padding: const EdgeInsets.all(2),
              decoration: BoxDecoration(
                color: const Color(0xFF161D1F),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: Colors.white.withOpacity(0.05)),
              ),
              child: Row(
                children: [
                  _buildLanguageButton('ar', 'عربي'),
                  _buildLanguageButton('en', 'EN'),
                ],
              ),
            )
          ],
        ),
        body: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [Color(0xFF0E1417), Color(0xFF080D0E)],
            ),
          ),
          child: _renderContent(),
        ),
      ),
    );
  }

  Widget _buildLanguageButton(String langCode, String label) {
    final isSelected = _locale == langCode;
    return GestureDetector(
      onTap: () => setState(() => _locale = langCode),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(15),
          gradient: isSelected ? const LinearGradient(colors: [Color(0xFF03D4ED), Color(0xFF14D8FF)]) : null,
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 10,
            fontWeight: FontWeight.w900,
            color: isSelected ? const Color(0xFF001F27) : const Color(0xFF859398),
          ),
        ),
      ),
    );
  }

  Widget _buildDrawer() {
    final doctor = _doctors.isNotEmpty ? _doctors.first : null;
    final doctorImage = doctor?['image_url'] ?? '';

    return Drawer(
      backgroundColor: const Color(0xFF0B0F11),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      _buildProfileImage(
                        imageUrl: doctorImage,
                        size: 44,
                        borderWidth: 1.5,
                      ),
                      const SizedBox(width: 12),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            isAr ? (doctor?['full_name_ar'] ?? 'د. مصطفى الرفاعي') : (doctor?['full_name_en'] ?? 'Dr. Mustafa Al-Rifaie'),
                            style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white),
                          ),
                          Text(
                            isAr ? (doctor?['title_ar'] ?? 'طب وتجميل الأسنان') : (doctor?['title_en'] ?? 'Dental Aesthetics'),
                            style: const TextStyle(fontSize: 9, color: Color(0xFF14D8FF), fontWeight: FontWeight.bold),
                          ),
                        ],
                      )
                    ],
                  ),
                  IconButton(
                    icon: const Icon(Icons.close, color: Color(0xFF859398), size: 20),
                    onPressed: () => Navigator.of(context).pop(),
                  )
                ],
              ),
              const SizedBox(height: 24),
              Text(getTranslation('philosophy_title')['text']!.toUpperCase(), style: const TextStyle(fontSize: 10, color: Color(0xFF14D8FF), fontWeight: FontWeight.bold, letterSpacing: 1)),
              const SizedBox(height: 8),
              Text(getTranslation('philosophy_text')['text']!, style: const TextStyle(fontSize: 11, color: Color(0xFF859398), height: 1.5), textAlign: TextAlign.justify),
              const SizedBox(height: 24),
              Text(isAr ? 'تصفح عيادتنا' : 'CLINICAL NAVIGATION', style: const TextStyle(fontSize: 10, color: Color(0xFF859398), fontWeight: FontWeight.bold, letterSpacing: 1)),
              const SizedBox(height: 12),
              Expanded(
                child: ListView(
                  children: [
                    _buildDrawerNavItem('home', Icons.home_outlined),
                    _buildDrawerNavItem('services', Icons.bolt),
                    _buildDrawerNavItem('gallery', Icons.image_outlined),
                    _buildDrawerNavItem('booking', Icons.calendar_today_outlined),
                    _buildDrawerNavItem('about', Icons.person_outline),
                    _buildDrawerNavItem('contact', Icons.mail_outline),
                  ],
                ),
              ),
              const Divider(color: Colors.white10),
              const SizedBox(height: 12),
              Text(getTranslation('help_desk')['text']!, style: const TextStyle(fontSize: 10, color: Color(0xFF859398), fontWeight: FontWeight.bold)),
              const SizedBox(height: 12),
              _buildDrawerActionCard(
                icon: Icons.phone_outlined,
                color: const Color(0xFF14D8FF),
                title: getTranslation('telephone')['text']!,
                subtitle: _settings?['phone'] ?? '+971 4 555 1234',
                onTap: () => launchUrl(Uri.parse('tel:${(_settings?['phone'] ?? '97145551234').replaceAll(' ', '')}')),
              ),
              const SizedBox(height: 8),
              _buildDrawerActionCard(
                icon: Icons.chat_bubble_outline,
                color: Colors.green,
                title: getTranslation('whatsapp')['text']!,
                subtitle: _settings?['whatsapp'] ?? '+971 50 987 6543',
                onTap: () => launchUrl(Uri.parse('https://wa.me/${(_settings?['whatsapp'] ?? '971509876543').replaceAll(' ', '').replaceAll('+', '')}')),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDrawerNavItem(String tab, IconData icon) {
    final isSelected = _activeTab == tab;
    return GestureDetector(
      onTap: () {
        Navigator.of(context).pop();
        _onNavigate(tab);
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 8),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: isSelected ? const Color(0xFF14D8FF).withOpacity(0.3) : Colors.transparent),
          color: isSelected ? const Color(0xFF14D8FF).withOpacity(0.05) : Colors.white.withOpacity(0.01),
        ),
        child: Row(
          children: [
            Icon(icon, color: isSelected ? const Color(0xFF14D8FF) : const Color(0xFF859398), size: 18),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                getTranslation(tab)['text']!,
                style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: isSelected ? const Color(0xFF14D8FF) : const Color(0xFFDDE4E6)),
              ),
            ),
            Icon(isAr ? Icons.chevron_left : Icons.chevron_right, size: 14, color: Colors.white24),
          ],
        ),
      ),
    );
  }

  Widget _buildDrawerActionCard({
    required IconData icon,
    required Color color,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.03),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.white.withOpacity(0.05)),
        ),
        child: Row(
          children: [
            Icon(icon, color: color, size: 16),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontSize: 10, color: Color(0xFF859398))),
                  Text(subtitle, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}

class ToothPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = const Color(0xFF14D8FF)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3.5
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round;

    final path = Path();
    path.moveTo(size.width * 0.5, size.height * 0.15);
    path.cubicTo(size.width * 0.32, size.height * 0.15, size.width * 0.23, size.height * 0.20, size.width * 0.23, size.height * 0.35);
    path.cubicTo(size.width * 0.23, size.height * 0.48, size.width * 0.30, size.height * 0.55, size.width * 0.33, size.height * 0.74);
    path.cubicTo(size.width * 0.34, size.height * 0.81, size.width * 0.41, size.height * 0.83, size.width * 0.45, size.height * 0.80);
    path.cubicTo(size.width * 0.47, size.height * 0.78, size.width * 0.50, size.height * 0.76, size.width * 0.50, size.height * 0.70);
    path.cubicTo(size.width * 0.50, size.height * 0.76, size.width * 0.53, size.height * 0.78, size.width * 0.55, size.height * 0.80);
    path.cubicTo(size.width * 0.59, size.height * 0.83, size.width * 0.66, size.height * 0.81, size.width * 0.67, size.height * 0.74);
    path.cubicTo(size.width * 0.70, size.height * 0.55, size.width * 0.77, size.height * 0.48, size.width * 0.77, size.height * 0.35);
    path.cubicTo(size.width * 0.77, size.height * 0.20, size.width * 0.68, size.height * 0.15, size.width * 0.5, size.height * 0.15);
    path.close();

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}

class HomeScreen extends StatelessWidget {
  final String locale;
  final ValueChanged<String> onNavigate;
  final Map<String, dynamic>? settings;
  final Map<String, dynamic>? doctor;

  const HomeScreen({
    super.key, 
    required this.locale, 
    required this.onNavigate, 
    this.settings,
    this.doctor,
  });

  bool get isAr => locale == 'ar';

  @override
  Widget build(BuildContext context) {
    final name = isAr
        ? (settings?['clinic_name_ar'] ?? 'د. مصطفى الرفاعي')
        : (settings?['clinic_name_en'] ?? 'Dr. Mustafa Al-Rifaie');
    final slogan = isAr
        ? (settings?['slogan_ar'] ?? 'طب وتجميل الأسنان')
        : (settings?['slogan_en'] ?? 'Dental Care & Aesthetics');

    final docImage = doctor?['image_url'] ?? settings?['hero_image_url'] ?? '';

    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Center(child: CustomPaint(size: const Size(70, 70), painter: ToothPainter())),
          const SizedBox(height: 12),
          Text(
            name,
            style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w900, color: Colors.white, letterSpacing: 0.5),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 4),
          Text(
            slogan,
            style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Color(0xFF14D8FF)),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 16),
          SizedBox(
            height: 260,
            child: Stack(
              alignment: Alignment.center,
              children: [
                Container(
                  width: 200,
                  height: 200,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(color: const Color(0xFF14D8FF).withOpacity(0.3), width: 1.5),
                    boxShadow: [BoxShadow(color: const Color(0xFF14D8FF).withOpacity(0.08), blurRadius: 30)],
                  ),
                ),
                Center(
                  child: _buildProfileImage(
                    imageUrl: docImage,
                    size: 150,
                    borderWidth: 3,
                  ),
                ),
                _buildOrbitNode(top: 40, left: 10, icon: Icons.favorite_border, onTap: () => onNavigate('services')),
                _buildOrbitNode(bottom: 40, left: 10, icon: Icons.bolt_outlined, onTap: () => onNavigate('services')),
                _buildOrbitNode(top: 30, right: 10, icon: Icons.search_outlined, onTap: () => onNavigate('services')),
                _buildOrbitNode(bottom: 50, right: 10, icon: Icons.star_border_outlined, onTap: () => onNavigate('services')),
              ],
            ),
          ),
          const SizedBox(height: 12),
          Text(
            isAr ? 'إبتسامة صحية.. مظهر أجمل.. حياة أفضل' : 'Healthy smile.. Beautiful look.. Better life',
            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 24),
          Row(
            children: [
              _buildServiceCard(arLabel: 'تبييض الأسنان', enLabel: 'Teeth Whitening', icon: Icons.auto_awesome),
              _buildServiceCard(arLabel: 'الفينير', enLabel: 'Veneers', icon: Icons.shield_outlined),
              _buildServiceCard(arLabel: 'زراعة الأسنان', enLabel: 'Dental Implants', icon: Icons.dns_outlined),
              _buildServiceCard(arLabel: 'تقويم الأسنان', enLabel: 'Orthodontics', icon: Icons.grid_on_outlined),
            ],
          ),
          const SizedBox(height: 28),
          GestureDetector(
            onTap: () => onNavigate('booking'),
            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 20),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                boxShadow: [BoxShadow(color: const Color(0xFF14D8FF).withOpacity(0.35), blurRadius: 15, offset: const Offset(0, 4))],
                gradient: const LinearGradient(colors: [Color(0xFF03D4ED), Color(0xFF14D8FF)]),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(isAr ? 'احجز موعدك الآن' : 'Book Your Appointment Now', style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w900, color: Color(0xFF001F27))),
                      const SizedBox(height: 2),
                      Text(isAr ? 'اضغط لتأكيد الحجز المباشر' : 'Tap to confirm dynamic slot', style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: Color(0xFF001F27))),
                    ],
                  ),
                  Container(
                    width: 40,
                    height: 40,
                    decoration: BoxDecoration(color: Colors.white.withOpacity(0.15), borderRadius: BorderRadius.circular(10)),
                    child: const Center(child: Icon(Icons.calendar_month, color: Color(0xFF001F27), size: 24)),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text('✦', style: TextStyle(color: Color(0xFF14D8FF), fontSize: 14)),
              const SizedBox(width: 8),
              Text(isAr ? 'نهتم بابتسامتك' : 'We care about your smile', style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white)),
              const SizedBox(width: 8),
              const Text('✦', style: TextStyle(color: Color(0xFF14D8FF), fontSize: 14)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildOrbitNode({double? top, double? left, double? right, double? bottom, required IconData icon, required VoidCallback onTap}) {
    return Positioned(
      top: top, left: left, right: right, bottom: bottom,
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          width: 48,
          height: 48,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: const Color(0xFF09151C).withOpacity(0.9),
            border: Border.all(color: const Color(0xFF14D8FF).withOpacity(0.55), width: 1.5),
          ),
          child: Center(child: Icon(icon, color: const Color(0xFF14D8FF), size: 20)),
        ),
      ),
    );
  }

  Widget _buildServiceCard({required String arLabel, required String enLabel, required IconData icon}) {
    return Expanded(
      child: GestureDetector(
        onTap: () => onNavigate('services'),
        child: Container(
          margin: const EdgeInsets.symmetric(horizontal: 4),
          padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 4),
          decoration: BoxDecoration(
            color: const Color(0xFF09151C).withOpacity(0.7),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFF14D8FF).withOpacity(0.15)),
          ),
          child: Column(
            children: [
              Icon(icon, color: const Color(0xFF14D8FF), size: 28),
              const SizedBox(height: 8),
              Text(isAr ? arLabel : enLabel, style: const TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: Colors.white), textAlign: TextAlign.center),
            ],
          ),
        ),
      ),
    );
  }
}

class ServicesScreen extends StatelessWidget {
  final String locale;
  final ValueChanged<String> onNavigate;
  final List<Map<String, dynamic>> services;

  const ServicesScreen({super.key, required this.locale, required this.onNavigate, required this.services});

  bool get isAr => locale == 'ar';

  @override
  Widget build(BuildContext context) {
    if (services.isEmpty) {
      return Center(child: Text(isAr ? 'لا توجد خدمات حالية.' : 'No active services.', style: const TextStyle(color: Colors.white38)));
    }

    return ListView.builder(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.all(20),
      itemCount: services.length,
      itemBuilder: (context, index) {
        final item = services[index];
        final title = isAr ? (item['name_ar'] ?? '') : (item['name_en'] ?? '');
        final desc = isAr ? (item['short_desc_ar'] ?? '') : (item['short_desc_en'] ?? '');
        final image = item['image_url'] ?? '';

        return Container(
          margin: const EdgeInsets.only(bottom: 16),
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.02),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.white.withOpacity(0.05)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (image.toString().isNotEmpty)
                ClipRRect(
                  borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
                  child: Image.network(image, height: 120, width: double.infinity, fit: BoxFit.cover, errorBuilder: (_, __, ___) => const SizedBox()),
                ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(title, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Color(0xFF14D8FF))),
                    const SizedBox(height: 8),
                    Text(desc, style: const TextStyle(fontSize: 11, color: Color(0xFF859398), height: 1.5)),
                    const SizedBox(height: 12),
                    GestureDetector(
                      onTap: () => onNavigate('booking'),
                      child: Row(
                        children: [
                          Text(isAr ? 'احجز استشارة مجانية' : 'Book consultation slot', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white)),
                          const SizedBox(width: 4),
                          Icon(isAr ? Icons.arrow_back : Icons.arrow_forward, color: const Color(0xFF14D8FF), size: 14),
                        ],
                      ),
                    )
                  ],
                ),
              )
            ],
          ),
        );
      },
    );
  }
}

class GalleryScreen extends StatefulWidget {
  final String locale;
  final List<Map<String, dynamic>> galleryItems;

  const GalleryScreen({super.key, required this.locale, required this.galleryItems});

  @override
  State<GalleryScreen> createState() => _GalleryScreenState();
}

class _GalleryScreenState extends State<GalleryScreen> {
  String _activeCategory = 'all';

  bool get isAr => widget.locale == 'ar';

  @override
  Widget build(BuildContext context) {
    final uniqueCats = widget.galleryItems.map((e) => e['category']?.toString() ?? '').where((c) => c.isNotEmpty).toSet().toList();
    final categories = [{'id': 'all', 'label': isAr ? 'الكل' : 'All'}];

    for (var cat in uniqueCats) {
      String label = cat == 'before_after' ? (isAr ? 'حالات ناجحة' : 'Cases') : (cat == 'clinic' ? (isAr ? 'العيادة' : 'Clinic') : cat);
      categories.add({'id': cat, 'label': label});
    }

    final filtered = _activeCategory == 'all'
        ? widget.galleryItems
        : widget.galleryItems.where((element) => element['category'] == _activeCategory).toList();

    if (widget.galleryItems.isEmpty) {
      return Center(child: Text(isAr ? 'لا توجد صور.' : 'No photos.', style: const TextStyle(color: Colors.white38)));
    }

    return Column(
      children: [
        SizedBox(
          height: 50,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            physics: const BouncingScrollPhysics(),
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            itemCount: categories.length,
            itemBuilder: (context, index) {
              final cat = categories[index];
              final isSelected = _activeCategory == cat['id'];
              return GestureDetector(
                onTap: () => setState(() => _activeCategory = cat['id']!),
                child: Container(
                  margin: const EdgeInsets.only(right: 8),
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  decoration: BoxDecoration(
                    color: isSelected ? const Color(0xFF14D8FF).withOpacity(0.1) : Colors.white.withOpacity(0.02),
                    borderRadius: BorderRadius.circular(15),
                    border: Border.all(color: isSelected ? const Color(0xFF14D8FF) : Colors.white.withOpacity(0.05)),
                  ),
                  child: Center(child: Text(cat['label']!, style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: isSelected ? const Color(0xFF14D8FF) : Colors.white54))),
                ),
              );
            },
          ),
        ),
        Expanded(
          child: GridView.builder(
            padding: const EdgeInsets.all(16),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 1, mainAxisSpacing: 12, childAspectRatio: 1.6),
            itemCount: filtered.length,
            itemBuilder: (context, index) {
              final item = filtered[index];
              final title = isAr ? (item['title_ar'] ?? '') : (item['title_en'] ?? '');
              final image = item['image_url'] ?? '';

              return Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.white.withOpacity(0.05)),
                  image: image.toString().isNotEmpty ? DecorationImage(image: NetworkImage(image), fit: BoxFit.cover) : null,
                ),
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(16),
                    gradient: LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter, colors: [Colors.transparent, Colors.black.withOpacity(0.85)]),
                  ),
                  padding: const EdgeInsets.all(16),
                  alignment: Alignment.bottomLeft,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(child: Text(title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white))),
                      const Icon(Icons.verified, color: Color(0xFF14D8FF), size: 16),
                    ],
                  ),
                ),
              );
            },
          ),
        )
      ],
    );
  }
}

class BookingScreen extends StatefulWidget {
  final String locale;
  final List<Map<String, dynamic>> services;

  const BookingScreen({super.key, required this.locale, required this.services});

  @override
  State<BookingScreen> createState() => _BookingScreenState();
}

class _BookingScreenState extends State<BookingScreen> {
  final _formKey = GlobalKey<FormState>();
  String _name = '';
  String _phone = '';
  String _notes = '';
  String? _selectedServiceId;
  DateTime? _selectedDate;
  String? _selectedTime;

  bool _isLoading = false;
  bool _booked = false;
  String? _error;

  String? _activeBookingId;
  Map<String, dynamic>? _activeBookingDetails;
  bool _isEditingActive = false;

  bool get isAr => widget.locale == 'ar';

  @override
  void initState() {
    super.initState();
    _loadActiveBooking();
  }

  Future<void> _loadActiveBooking() async {
    setState(() => _isLoading = true);
    try {
      final prefs = await SharedPreferences.getInstance();
      final id = prefs.getString('rifai_active_booking_id');
      if (id != null) {
        final res = await supabase.from('appointments').select().eq('id', id).maybeSingle();
        if (res != null) {
          setState(() {
            _activeBookingId = id;
            _activeBookingDetails = Map<String, dynamic>.from(res);
            _name = res['patient_name'] ?? '';
            _phone = res['phone'] ?? '';
            _selectedServiceId = res['service_id']?.toString();
            final dateStr = res['appointment_date'] as String?;
            if (dateStr != null) {
              _selectedDate = DateTime.tryParse(dateStr);
            }
            _selectedTime = res['appointment_time'] as String?;
            _notes = res['notes'] ?? '';
          });
        } else {
          await prefs.remove('rifai_active_booking_id');
        }
      }
    } catch (e) {
      debugPrint('Error loading active booking: $e');
    } finally {
      setState(() => _isLoading = false);
    }
  }

  Future<void> _saveActiveBookingId(String id) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('rifai_active_booking_id', id);
    } catch (e) {
      debugPrint('Error saving active booking ID: $e');
    }
  }

  Future<void> _removeActiveBookingId() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove('rifai_active_booking_id');
    } catch (e) {
      debugPrint('Error removing active booking ID: $e');
    }
  }

  Future<void> _cancelBooking() async {
    if (_activeBookingId == null) return;
    setState(() => _isLoading = true);
    try {
      if (!_activeBookingId!.startsWith('local-')) {
        await supabase.from('appointments').delete().eq('id', _activeBookingId!);
      }
      await _removeActiveBookingId();
      setState(() {
        _activeBookingId = null;
        _activeBookingDetails = null;
        _booked = false;
        _isEditingActive = false;
        _selectedDate = null;
        _selectedTime = null;
        _name = '';
        _phone = '';
        _notes = '';
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(isAr ? 'تم إلغاء الحجز بنجاح' : 'Appointment cancelled successfully')),
      );
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      setState(() => _isLoading = false);
    }
  }

  Future<void> _updateBooking() async {
    if (_activeBookingId == null || _selectedDate == null || _selectedTime == null) return;
    setState(() => _isLoading = true);
    try {
      final dateStr = '${_selectedDate!.year}-${_selectedDate!.month.toString().padLeft(2, '0')}-${_selectedDate!.day.toString().padLeft(2, '0')}';
      
      Map<String, dynamic> updatedDetails;
      if (_activeBookingId!.startsWith('local-')) {
        updatedDetails = Map<String, dynamic>.from(_activeBookingDetails ?? {});
        updatedDetails['appointment_date'] = dateStr;
        updatedDetails['appointment_time'] = _selectedTime;
      } else {
        final res = await supabase.from('appointments').update({
          'appointment_date': dateStr,
          'appointment_time': _selectedTime,
        }).eq('id', _activeBookingId!).select().single();
        updatedDetails = Map<String, dynamic>.from(res);
      }

      setState(() {
        _activeBookingDetails = updatedDetails;
        _isEditingActive = false;
      });

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(isAr ? 'تم تعديل موعد الحجز بنجاح!' : 'Successfully rescheduled appointment!')),
      );
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const SizedBox(
        height: 400,
        child: Center(child: CircularProgressIndicator(color: Color(0xFF14D8FF))),
      );
    }

    // SUCCESS SCREEN (After fresh booking)
    if (_booked) {
      return Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.check_circle_outline, color: Color(0xFF14D8FF), size: 64),
            const SizedBox(height: 16),
            Text(isAr ? 'تم حجز موعدك بنجاح!' : 'Booking Confirmed!', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
            const SizedBox(height: 8),
            Text(
              isAr 
                ? 'سيتواصل معك المنسق لتأكيد الموعد قريباً.' 
                : 'Our coordinator will contact you shortly to confirm.', 
              style: const TextStyle(color: Colors.white54, fontSize: 12), 
              textAlign: TextAlign.center
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () {
                _loadActiveBooking();
                setState(() => _booked = false);
              },
              style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF14D8FF)),
              child: Text(isAr ? 'عرض حجز الموعد الحالي' : 'View Active Booking', style: const TextStyle(color: Colors.black)),
            )
          ],
        ),
      );
    }

    // ACTIVE BOOKING (Anti-spam panel)
    if (_activeBookingId != null && _activeBookingDetails != null && !_isEditingActive) {
      final patientName = _activeBookingDetails!['patient_name'] ?? '';
      final dateStr = _activeBookingDetails!['appointment_date'] ?? '';
      final timeStr = _activeBookingDetails!['appointment_time'] ?? '';
      final serviceId = _activeBookingDetails!['service_id']?.toString();
      final serviceMap = widget.services.firstWhere((s) => s['id']?.toString() == serviceId, orElse: () => <String, dynamic>{});
      final serviceName = isAr ? (serviceMap['name_ar'] ?? '') : (serviceMap['name_en'] ?? '');

      return SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF161D1F),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFF14D8FF).withOpacity(0.2)),
              ),
              child: Column(
                children: [
                  const Icon(Icons.verified_user_outlined, color: Color(0xFF14D8FF), size: 48),
                  const SizedBox(height: 12),
                  Text(
                    isAr ? 'لديك حجز موعد نشط!' : 'You Have an Active Booking!',
                    style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: Colors.white),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    isAr 
                      ? 'يُسمح بحجز موعد واحد نشط لكل جهاز لمنع تكرار الحجوزات. يمكنك تعديل الموعد أو إلغاؤه أدناه.' 
                      : 'Only one active appointment is allowed per device. You can reschedule or cancel it below.',
                    style: const TextStyle(color: Colors.white54, fontSize: 11),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            Align(
              alignment: isAr ? Alignment.centerRight : Alignment.centerLeft,
              child: Text(
                isAr ? 'تفاصيل الموعد الحالي' : 'Current Booking Summary',
                style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white),
              ),
            ),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF161D1F),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.white10),
              ),
              child: Column(
                children: [
                  _buildSummaryRow(isAr ? 'اسم المريض:' : 'Patient Name:', patientName),
                  if (serviceName.isNotEmpty) ...[
                    const Divider(color: Colors.white10, height: 24),
                    _buildSummaryRow(isAr ? 'الخدمة المطلوبة:' : 'Treatment Service:', serviceName),
                  ],
                  const Divider(color: Colors.white10, height: 24),
                  _buildSummaryRow(isAr ? 'التاريخ والوقت:' : 'Date & Time:', '$dateStr @ $timeStr', valueColor: const Color(0xFF14D8FF)),
                  const Divider(color: Colors.white10, height: 24),
                  _buildSummaryRow(isAr ? 'حالة الطلب:' : 'Request Status:', isAr ? 'بانتظار التأكيد' : 'Pending Confirmation', valueColor: Colors.greenAccent),
                ],
              ),
            ),
            const SizedBox(height: 32),
            GestureDetector(
              onTap: () => setState(() => _isEditingActive = true),
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 16),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(16),
                  gradient: const LinearGradient(colors: [Color(0xFF03D4ED), Color(0xFF14D8FF)]),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.edit_calendar, color: Color(0xFF001F27), size: 18),
                    const SizedBox(width: 8),
                    Text(
                      isAr ? 'تعديل تاريخ أو وقت الموعد' : 'Reschedule Appointment',
                      style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF001F27), fontSize: 13),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 12),
            GestureDetector(
              onTap: _cancelBooking,
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 16),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(16),
                  color: Colors.red.withOpacity(0.1),
                  border: Border.all(color: Colors.redAccent.withOpacity(0.3)),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.delete_outline, color: Colors.redAccent, size: 18),
                    const SizedBox(width: 8),
                    Text(
                      isAr ? 'إلغاء حجز الموعد' : 'Cancel Appointment',
                      style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.redAccent, fontSize: 13),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      );
    }

    // EDITING / RESCHEDULING DATE AND TIME ONLY
    if (_isEditingActive) {
      return SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  isAr ? 'اختر الموعد الجديد' : 'Reschedule Date & Time',
                  style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w900, color: Colors.white),
                ),
                IconButton(
                  onPressed: () => setState(() => _isEditingActive = false),
                  icon: const Icon(Icons.close, color: Colors.white54),
                ),
              ],
            ),
            const SizedBox(height: 16),
            if (_error != null) ...[
              Text(_error!, style: const TextStyle(color: Colors.redAccent, fontSize: 11)),
              const SizedBox(height: 12),
            ],
            GestureDetector(
              onTap: () async {
                final date = await showDatePicker(
                  context: context,
                  initialDate: _selectedDate ?? DateTime.now().add(const Duration(days: 1)),
                  firstDate: DateTime.now(),
                  lastDate: DateTime.now().add(const Duration(days: 90)),
                );
                if (date != null) setState(() => _selectedDate = date);
              },
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                decoration: BoxDecoration(border: Border.all(color: Colors.white24), borderRadius: BorderRadius.circular(12)),
                child: Row(
                  children: [
                    const Icon(Icons.calendar_month_outlined, color: Color(0xFF14D8FF)),
                    const SizedBox(width: 12),
                    Text(_selectedDate == null ? (isAr ? 'اختر تاريخ الموعد الجديد' : 'Choose New Date') : '${_selectedDate!.year}-${_selectedDate!.month}-${_selectedDate!.day}'),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),
            Text(isAr ? 'الوقت المفضل الجديد' : 'New Preferred Slot', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: ['09:30 AM', '11:00 AM', '02:30 PM', '04:30 PM'].map((t) {
                final sel = _selectedTime == t;
                return GestureDetector(
                  onTap: () => setState(() => _selectedTime = t),
                  child: Chip(
                    backgroundColor: sel ? const Color(0xFF14D8FF).withOpacity(0.2) : Colors.white10,
                    side: BorderSide(color: sel ? const Color(0xFF14D8FF) : Colors.transparent),
                    label: Text(t, style: TextStyle(color: sel ? const Color(0xFF14D8FF) : Colors.white, fontSize: 12)),
                  ),
                );
              }).toList(),
            ),
            const SizedBox(height: 40),
            GestureDetector(
              onTap: _updateBooking,
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 16),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(16),
                  gradient: const LinearGradient(colors: [Color(0xFF03D4ED), Color(0xFF14D8FF)]),
                ),
                child: Center(
                  child: Text(
                    isAr ? 'حفظ وتأكيد التغييرات' : 'Save & Confirm Changes',
                    style: const TextStyle(fontWeight: FontWeight.w900, color: Color(0xFF001F27)),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 12),
            GestureDetector(
              onTap: () => setState(() => _isEditingActive = false),
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 16),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(16),
                  color: Colors.white10,
                ),
                child: Center(
                  child: Text(
                    isAr ? 'إلغاء التعديل' : 'Cancel Rescheduling',
                    style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white70),
                  ),
                ),
              ),
            ),
          ],
        ),
      );
    }

    // STANDARD FIRST TIME BOOKING FORM
    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.all(20.0),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(isAr ? 'طلب حجز موعد مباشر' : 'Request Real-time Appointment', style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
            const SizedBox(height: 16),
            if (_error != null) ...[
              Text(_error!, style: const TextStyle(color: Colors.redAccent, fontSize: 11)),
              const SizedBox(height: 12),
            ],
            TextFormField(
              initialValue: _name,
              decoration: InputDecoration(labelText: isAr ? 'الاسم بالكامل' : 'Full Name', prefixIcon: const Icon(Icons.person_outline, color: Color(0xFF14D8FF))),
              validator: (val) => val == null || val.isEmpty ? (isAr ? 'الرجاء إدخال الاسم' : 'Required') : null,
              onSaved: (val) => _name = val ?? '',
            ),
            const SizedBox(height: 16),
            TextFormField(
              initialValue: _phone,
              keyboardType: TextInputType.phone,
              decoration: InputDecoration(labelText: isAr ? 'رقم الهاتف' : 'Phone Number', prefixIcon: const Icon(Icons.phone_outlined, color: Color(0xFF14D8FF))),
              validator: (val) => val == null || val.isEmpty ? (isAr ? 'الرجاء إدخال الهاتف' : 'Required') : null,
              onSaved: (val) => _phone = val ?? '',
            ),
            const SizedBox(height: 16),
            DropdownButtonFormField<String>(
              value: _selectedServiceId,
              items: widget.services.map((s) {
                return DropdownMenuItem(value: s['id']?.toString(), child: Text(isAr ? (s['name_ar'] ?? '') : (s['name_en'] ?? '')));
              }).toList(),
              decoration: InputDecoration(labelText: isAr ? 'الخدمة المطلوبة' : 'Requested Service', prefixIcon: const Icon(Icons.medical_services_outlined, color: Color(0xFF14D8FF))),
              onChanged: (val) => setState(() => _selectedServiceId = val),
              validator: (val) => val == null ? (isAr ? 'الرجاء اختيار خدمة' : 'Required') : null,
            ),
            const SizedBox(height: 16),
            GestureDetector(
              onTap: () async {
                final date = await showDatePicker(
                  context: context,
                  initialDate: DateTime.now().add(const Duration(days: 1)),
                  firstDate: DateTime.now(),
                  lastDate: DateTime.now().add(const Duration(days: 90)),
                );
                if (date != null) setState(() => _selectedDate = date);
              },
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                decoration: BoxDecoration(border: Border.all(color: Colors.white24), borderRadius: BorderRadius.circular(12)),
                child: Row(
                  children: [
                    const Icon(Icons.calendar_month_outlined, color: Color(0xFF14D8FF)),
                    const SizedBox(width: 12),
                    Text(_selectedDate == null ? (isAr ? 'اختر تاريخ الموعد' : 'Choose Date') : '${_selectedDate!.year}-${_selectedDate!.month}-${_selectedDate!.day}'),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            if (_selectedDate != null) ...[
              Text(isAr ? 'الوقت المفضل' : 'Preferred Slot', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              Wrap(
                spacing: 8,
                children: ['09:30 AM', '11:00 AM', '02:30 PM', '04:30 PM'].map((t) {
                  final sel = _selectedTime == t;
                  return GestureDetector(
                    onTap: () => setState(() => _selectedTime = t),
                    child: Chip(
                      backgroundColor: sel ? const Color(0xFF14D8FF).withOpacity(0.2) : Colors.white10,
                      label: Text(t, style: TextStyle(color: sel ? const Color(0xFF14D8FF) : Colors.white)),
                    ),
                  );
                }).toList(),
              ),
              const SizedBox(height: 16),
            ],
            TextFormField(
              initialValue: _notes,
              maxLines: 2,
              decoration: InputDecoration(labelText: isAr ? 'ملاحظات أو أعراض' : 'Notes / Symptoms', prefixIcon: const Icon(Icons.chat_bubble_outline, color: Color(0xFF14D8FF))),
              onSaved: (val) => _notes = val ?? '',
            ),
            const SizedBox(height: 24),
            _isLoading
                ? const Center(child: CircularProgressIndicator(color: Color(0xFF14D8FF)))
                : GestureDetector(
                    onTap: () async {
                      if (_selectedDate == null || _selectedTime == null) {
                        setState(() => _error = isAr ? 'يرجى تحديد التاريخ والوقت' : 'Date & Time are required');
                        return;
                      }
                      if (_formKey.currentState?.validate() ?? false) {
                        _formKey.currentState?.save();
                        setState(() { _isLoading = true; _error = null; });
                        try {
                          final dateStr = '${_selectedDate!.year}-${_selectedDate!.month.toString().padLeft(2, '0')}-${_selectedDate!.day.toString().padLeft(2, '0')}';
                          
                          // ANTI-SPAM check: check if there's an existing pending booking with the same phone
                          Map<String, dynamic>? existingBooking;
                          try {
                            final List<dynamic> existingList = await supabase
                                .from('appointments')
                                .select()
                                .eq('phone', _phone)
                                .eq('status', 'pending');
                            if (existingList.isNotEmpty) {
                              existingBooking = Map<String, dynamic>.from(existingList.first);
                            }
                          } catch (checkErr) {
                            debugPrint('Error during anti-spam check: $checkErr');
                          }

                          if (existingBooking != null) {
                            final String existingId = existingBooking['id']!.toString();
                            await _saveActiveBookingId(existingId);
                            setState(() {
                              _isLoading = false;
                              _booked = true;
                              _activeBookingId = existingId;
                              _activeBookingDetails = existingBooking;
                            });
                            return;
                          }

                          final res = await supabase.from('appointments').insert({
                            'patient_name': _name,
                            'phone': _phone,
                            'service_id': _selectedServiceId,
                            'preferred_language': widget.locale,
                            'appointment_date': dateStr,
                            'appointment_time': _selectedTime,
                            'notes': _notes,
                            'status': 'pending'
                          }).select().single();
                          
                          final newId = res['id']?.toString();
                          if (newId != null) {
                            await _saveActiveBookingId(newId);
                          }
                          setState(() { 
                            _isLoading = false; 
                            _booked = true; 
                            _activeBookingId = newId;
                            _activeBookingDetails = Map<String, dynamic>.from(res);
                          });
                        } catch (e) {
                          setState(() { 
                            _isLoading = false; 
                            _error = e.toString(); 
                          });
                        }
                      }
                    },
                    child: Container(
                      width: double.infinity,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      decoration: BoxDecoration(borderRadius: BorderRadius.circular(16), gradient: const LinearGradient(colors: [Color(0xFF03D4ED), Color(0xFF14D8FF)])),
                      child: Center(child: Text(isAr ? 'إرسال طلب الحجز' : 'Send Booking Request', style: const TextStyle(fontWeight: FontWeight.w900, color: Color(0xFF001F27)))),
                    ),
                  )
          ],
        ),
      ),
    );
  }

  Widget _buildSummaryRow(String label, String value, {Color valueColor = Colors.white70}) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: const TextStyle(color: Colors.white38, fontSize: 12)),
        Text(value, style: TextStyle(color: valueColor, fontWeight: FontWeight.bold, fontSize: 12)),
      ],
    );
  }
}

class AboutScreen extends StatelessWidget {
  final String locale;
  final List<Map<String, dynamic>> doctors;

  const AboutScreen({super.key, required this.locale, required this.doctors});

  bool get isAr => locale == 'ar';

  @override
  Widget build(BuildContext context) {
    if (doctors.isEmpty) {
      return Center(child: Text(isAr ? 'لا توجد معلومات.' : 'No details.', style: const TextStyle(color: Colors.white38)));
    }

    final doc = doctors.first;
    final name = isAr ? (doc['full_name_ar'] ?? '') : (doc['full_name_en'] ?? '');
    final title = isAr ? (doc['title_ar'] ?? '') : (doc['title_en'] ?? '');
    final bio = isAr ? (doc['about_ar'] ?? '') : (doc['about_en'] ?? '');
    final image = doc['image_url'] ?? '';
    final qualsStr = isAr ? (doc['qualifications_ar'] ?? '') : (doc['qualifications_en'] ?? '');
    final quals = qualsStr.toString().split('|').where((q) => q.trim().isNotEmpty).toList();

    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const SizedBox(height: 12),
          _buildProfileImage(
            imageUrl: image.toString(),
            size: 110,
            borderWidth: 3,
          ),
          const SizedBox(height: 16),
          Text(name, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Colors.white), textAlign: TextAlign.center),
          const SizedBox(height: 6),
          Text(title, style: const TextStyle(fontSize: 12, color: Color(0xFF14D8FF), fontWeight: FontWeight.bold), textAlign: TextAlign.center),
          const SizedBox(height: 16),
          const Divider(color: Colors.white10),
          const SizedBox(height: 16),
          Align(
            alignment: isAr ? Alignment.centerRight : Alignment.centerLeft,
            child: Text(isAr ? 'السيرة المهنية' : 'Professional Biography', style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white)),
          ),
          const SizedBox(height: 8),
          Align(
            alignment: isAr ? Alignment.centerRight : Alignment.centerLeft,
            child: Text(bio, style: const TextStyle(fontSize: 11, color: Color(0xFF859398), height: 1.6)),
          ),
          if (quals.isNotEmpty) ...[
            const SizedBox(height: 20),
            Align(
              alignment: isAr ? Alignment.centerRight : Alignment.centerLeft,
              child: Text(isAr ? 'الشهادات والاعتمادات' : 'Credentials', style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white)),
            ),
            const SizedBox(height: 8),
            ...quals.map((q) => Padding(
                  padding: const EdgeInsets.only(bottom: 6),
                  child: Row(
                    children: [
                      const Icon(Icons.verified, color: Color(0xFF14D8FF), size: 14),
                      const SizedBox(width: 8),
                      Expanded(child: Text(q, style: const TextStyle(fontSize: 11, color: Color(0xFFDDE4E6)))),
                    ],
                  ),
                )),
          ]
        ],
      ),
    );
  }
}

class ContactScreen extends StatelessWidget {
  final String locale;
  final Map<String, dynamic>? settings;

  const ContactScreen({super.key, required this.locale, this.settings});

  bool get isAr => locale == 'ar';

  @override
  Widget build(BuildContext context) {
    final phone = settings?['phone'] ?? '+971 4 555 1234';
    final whatsapp = settings?['whatsapp'] ?? '+971 50 987 6543';
    final address = isAr ? (settings?['address_ar'] ?? 'جميرا، دبي') : (settings?['address_en'] ?? 'Jumeirah, Dubai');
    final hours = isAr
        ? (settings?['working_hours_ar'] ?? 'الأحد - الخميس: 09:00 - 20:00\nالجمعة: 10:00 - 18:00\nالسبت: مغلق')
        : (settings?['working_hours_en'] ?? 'Sun - Thu: 09:00 - 20:00\nFriday: 10:00 - 18:00\nSaturday: Closed');

    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(isAr ? 'تواصل معنا مباشرة' : 'Get In Touch Directly', style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.white)),
          const SizedBox(height: 16),
          _buildItem(Icons.phone_outlined, isAr ? 'اتصل بنا' : 'Call Us', phone, const Color(0xFF14D8FF), () => launchUrl(Uri.parse('tel:${phone.replaceAll(' ', '')}'))),
          const SizedBox(height: 12),
          _buildItem(Icons.chat_bubble_outline, isAr ? 'واتساب العيادة' : 'WhatsApp Chat', whatsapp, Colors.green, () => launchUrl(Uri.parse('https://wa.me/${whatsapp.replaceAll(' ', '').replaceAll('+', '')}'))),
          const SizedBox(height: 12),
          _buildItem(Icons.location_on_outlined, isAr ? 'عنوان العيادة' : 'Address', address, Colors.orangeAccent, () {}),
          const SizedBox(height: 24),
          Container(
            padding: const EdgeInsets.all(16),
            width: double.infinity,
            decoration: BoxDecoration(color: Colors.white.withOpacity(0.02), borderRadius: BorderRadius.circular(16), border: Border.all(color: Colors.white12)),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(children: [const Icon(Icons.schedule, color: Color(0xFF14D8FF), size: 16), const SizedBox(width: 8), Text(isAr ? 'ساعات الحضور والعمل' : 'Schedule', style: const TextStyle(fontWeight: FontWeight.bold))]),
                const SizedBox(height: 8),
                Text(hours.replaceAll('|', '\n'), style: const TextStyle(fontSize: 11, color: Color(0xFF859398), height: 1.6)),
              ],
            ),
          )
        ],
      ),
    );
  }

  Widget _buildItem(IconData icon, String title, String subtitle, Color color, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(color: Colors.white.withOpacity(0.01), borderRadius: BorderRadius.circular(12), border: Border.all(color: Colors.white.withOpacity(0.04))),
        child: Row(
          children: [
            Icon(icon, color: color, size: 20),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontSize: 9, color: Color(0xFF859398))),
                  Text(subtitle, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white)),
                ],
              ),
            ),
            const Icon(Icons.arrow_forward_ios, size: 12, color: Colors.white24)
          ],
        ),
      ),
    );
  }
}
