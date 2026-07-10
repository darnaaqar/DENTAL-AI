import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

void main() {
  runApp(const DentalClinicApp());
}

class DentalClinicApp extends StatelessWidget {
  const DentalClinicApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Dr. Mustafa Al-Rifai',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF0E1417),
        primaryColor: const Color(0xFF14D8FF),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF14D8FF),
          secondary: Color(0xFF03D4ED),
          surface: Color(0xFF161D1F),
          background: const Color(0xFF0E1417),
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
  String _locale = 'ar'; // 'ar' or 'en'
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  bool get isAr => _locale == 'ar';

  void _onNavigate(String tab) {
    setState(() {
      _activeTab = tab;
    });
  }

  // Multi-lingual translation strings
  Map<String, String> getTranslation(String key) {
    final translations = {
      'title': {'ar': 'د. مصطفى الرفاعي', 'en': 'Dr. Mustafa Al-Rifai'},
      'subtitle': {'ar': 'طب وتجميل الأسنان', 'en': 'Dental Care & Aesthetics'},
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
      'address_val': {'ar': 'جميرا، دبي', 'en': 'Jumeirah, Dubai'},
      'schedule': {'ar': 'ساعات العمل', 'en': 'Clinical Schedule'},
      'schedule_days': {'ar': 'الأحد - الخميس: 09:00 - 20:00\nالجمعة: 10:00 - 18:00\nالسبت: مغلق', 'en': 'Sun - Thu: 09:00 - 20:00\nFriday: 10:00 - 18:00\nSaturday: Closed'},
      'back_home': {'ar': 'العودة للرئيسية', 'en': 'Back to Home'},
    };
    return {
      'text': translations[key]?[_locale] ?? key,
    };
  }

  Widget _renderContent() {
    switch (_activeTab) {
      case 'home':
        return HomeScreen(locale: _locale, onNavigate: _onNavigate);
      case 'services':
        return ServicesScreen(locale: _locale, onNavigate: _onNavigate);
      case 'gallery':
        return GalleryScreen(locale: _locale);
      case 'booking':
        return BookingScreen(locale: _locale);
      case 'about':
        return AboutScreen(locale: _locale);
      case 'contact':
        return ContactScreen(locale: _locale);
      default:
        return HomeScreen(locale: _locale, onNavigate: _onNavigate);
    }
  }

  @override
  Widget build(BuildContext context) {
    final titleText = _activeTab == 'home'
        ? getTranslation('title')['text']!
        : getTranslation(_activeTab)['text']!;

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
                  icon: Icon(
                    isAr ? Icons.chevron_right : Icons.chevron_left,
                    color: const Color(0xFF14D8FF),
                    size: 28,
                  ),
                  onPressed: () => setState(() => _activeTab = 'home'),
                ),
          title: _activeTab == 'home'
              ? Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      titleText,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    Text(
                      getTranslation('subtitle')['text']!,
                      style: const TextStyle(
                        fontSize: 10,
                        color: Color(0xFF859398),
                        letterSpacing: 1,
                      ),
                    ),
                  ],
                )
              : Text(
                  titleText,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF14D8FF),
                    shadows: [
                      Shadow(color: Color(0x6614D8FF), blurRadius: 10),
                    ],
                  ),
                ),
          actions: [
            // Bilingual language switcher
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
              colors: [
                Color(0xFF0E1417),
                Color(0xFF080D0E),
              ],
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
      onTap: () {
        setState(() {
          _locale = langCode;
        });
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(15),
          gradient: isSelected
              ? const LinearGradient(
                  colors: [Color(0xFF03D4ED), Color(0xFF14D8FF)],
                )
              : null,
          boxShadow: isSelected
              ? [
                  BoxShadow(
                    color: const Color(0xFF14D8FF).withOpacity(0.3),
                    blurRadius: 6,
                    offset: const Offset(0, 2),
                  )
                ]
              : null,
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
    return Drawer(
      backgroundColor: const Color(0xFF0B0F11),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Drawer Header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 44,
                        height: 44,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(color: const Color(0xFF14D8FF).withOpacity(0.4)),
                          image: const DecorationImage(
                            image: NetworkImage(
                                'https://lh3.googleusercontent.com/aida-public/AB6AXuBQGk9T8T-E-dTpTss5FQxeaLgfuT6D7b8knwLxoma7ZhneQUbTV6jegwf83Rz3Wsi-1ojfZUr4lObSfdbX8qJs_GRO-1BDl9AUgNUb0Z60o8xRS9X-FtvMzMNib-qoykcBsefefS1Hhaf0u5mEuLb83liLjH7sos8ZJOA7njPRorV-taMls7PyH_FyRFsPwcu0h8c2UUGlTi9rSDRoelBrHe30tc3qJpL7eQi6euwC_Dofi6FIaIkTEyIqa6zWRKrNA2ZqGbxXlPo'),
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            getTranslation('title')['text']!,
                            style: const TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                          Text(
                            isAr ? 'استشاري تجميل الأسنان' : 'Dental Aesthetics',
                            style: const TextStyle(
                              fontSize: 10,
                              color: Color(0xFF14D8FF),
                              fontWeight: FontWeight.bold,
                            ),
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

              // Philosophy Section
              Text(
                getTranslation('philosophy_title')['text']!.toUpperCase(),
                style: const TextStyle(
                  fontSize: 10,
                  color: Color(0xFF14D8FF),
                  fontWeight: FontWeight.bold,
                  letterSpacing: 1,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                getTranslation('philosophy_text')['text']!,
                style: const TextStyle(
                  fontSize: 11,
                  color: Color(0xFF859398),
                  height: 1.5,
                ),
                textAlign: TextAlign.justify,
              ),
              const SizedBox(height: 24),

              // Navigation Links (Connected to screens)
              Text(
                isAr ? 'تصفح عيادتنا' : 'CLINICAL NAVIGATION',
                style: const TextStyle(
                  fontSize: 10,
                  color: Color(0xFF859398),
                  fontWeight: FontWeight.bold,
                  letterSpacing: 1,
                ),
              ),
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

              // Help Desk
              const Divider(color: Colors.white10),
              const SizedBox(height: 12),
              Text(
                getTranslation('help_desk')['text']!,
                style: const TextStyle(
                  fontSize: 10,
                  color: Color(0xFF859398),
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 12),
              _buildDrawerActionCard(
                icon: Icons.phone_outlined,
                color: const Color(0xFF14D8FF),
                title: getTranslation('telephone')['text']!,
                subtitle: '+971 4 555 1234',
                onTap: () => launchUrl(Uri.parse('tel:+97145551234')),
              ),
              const SizedBox(height: 8),
              _buildDrawerActionCard(
                icon: Icons.chat_bubble_outline,
                color: Colors.green,
                title: getTranslation('whatsapp')['text']!,
                subtitle: '+971 50 987 6543',
                onTap: () => launchUrl(Uri.parse('https://wa.me/971509876543')),
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
          border: Border.all(
            color: isSelected ? const Color(0xFF14D8FF).withOpacity(0.3) : Colors.transparent,
          ),
          gradient: isSelected
              ? LinearGradient(
                  colors: [
                    const Color(0xFF14D8FF).withOpacity(0.1),
                    const Color(0xFF14D8FF).withOpacity(0.05),
                  ],
                )
              : null,
          color: isSelected ? null : Colors.white.withOpacity(0.02),
        ),
        child: Row(
          children: [
            Icon(
              icon,
              color: isSelected ? const Color(0xFF14D8FF) : const Color(0xFF859398),
              size: 18,
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                getTranslation(tab)['text']!,
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                  color: isSelected ? const Color(0xFF14D8FF) : const Color(0xFFDDE4E6),
                ),
              ),
            ),
            Icon(
              isAr ? Icons.chevron_left : Icons.chevron_right,
              size: 14,
              color: Colors.white24,
            ),
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
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(fontSize: 10, color: Color(0xFF859398)),
                ),
                Text(
                  subtitle,
                  style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}

// ==========================================
// TOOTH CUSTOM PAINTER FOR HEADLINE LOGO
// ==========================================
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

    // Draw background soft glowing shadow
    canvas.drawPath(
      path,
      Paint()
        ..color = const Color(0xFF14D8FF).withOpacity(0.35)
        ..style = PaintingStyle.stroke
        ..strokeWidth = 9.0
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 5.0),
    );

    canvas.drawPath(path, paint);

    // Draw little sparkles on the top-right
    final sparklePaint = Paint()
      ..color = const Color(0xFF14D8FF)
      ..style = PaintingStyle.fill;

    final sparkle1 = Path();
    sparkle1.moveTo(size.width * 0.68, size.height * 0.15);
    sparkle1.lineTo(size.width * 0.70, size.height * 0.19);
    sparkle1.lineTo(size.width * 0.74, size.height * 0.21);
    sparkle1.lineTo(size.width * 0.70, size.height * 0.23);
    sparkle1.lineTo(size.width * 0.68, size.height * 0.27);
    sparkle1.lineTo(size.width * 0.66, size.height * 0.23);
    sparkle1.lineTo(size.width * 0.62, size.height * 0.21);
    sparkle1.lineTo(size.width * 0.66, size.height * 0.19);
    sparkle1.close();
    canvas.drawPath(sparkle1, sparklePaint);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}

// ==========================================
// SCREEN 1: HOME SCREEN
// ==========================================
class HomeScreen extends StatelessWidget {
  final String locale;
  final ValueChanged<String> onNavigate;

  const HomeScreen({super.key, required this.locale, required this.onNavigate});

  bool get isAr => locale == 'ar';

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // 1. Top-Center Elegant Stylized Outline Logo
          Center(
            child: CustomPaint(
              size: const Size(80, 80),
              painter: ToothPainter(),
            ),
          ),
          const SizedBox(height: 12),

          // Dr. Mustafa Greetings
          const Text(
            'د. مصطفى الرفاعي',
            style: TextStyle(
              fontSize: 26,
              fontWeight: FontWeight.w900,
              color: Colors.white,
              letterSpacing: 0.5,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 4),
          const Text(
            'Dr. Mustafa Al-Rifai',
            style: TextStyle(
              fontSize: 21,
              fontWeight: FontWeight.bold,
              color: Color(0xFF14D8FF),
              shadows: [
                Shadow(
                  color: Color(0xFF14D8FF),
                  blurRadius: 10,
                )
              ],
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 12),

          // Subtle horizontal divider with Arabic subtitle
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 24,
                height: 1.5,
                color: const Color(0xFF14D8FF).withOpacity(0.4),
              ),
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 10),
                child: Text(
                  'طب وتجميل الأسنان',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ),
              Container(
                width: 24,
                height: 1.5,
                color: const Color(0xFF14D8FF).withOpacity(0.4),
              ),
            ],
          ),
          const SizedBox(height: 4),
          const Text(
            'Dental Care & Aesthetics',
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.bold,
              color: Color(0xFF859398),
              letterSpacing: 1.5,
            ),
          ),
          const SizedBox(height: 16),

          // 2. Interactive Holographic Stage
          SizedBox(
            height: 300,
            child: Stack(
              alignment: Alignment.center,
              children: [
                // Perspective background concentric rings
                Transform(
                  transform: Matrix4.identity()
                    ..setEntry(3, 2, 0.001)
                    ..rotateX(-0.5)
                    ..rotateY(0.1),
                  alignment: Alignment.center,
                  child: Stack(
                    alignment: Alignment.center,
                    children: [
                      Container(
                        width: 240,
                        height: 240,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(color: const Color(0xFF14D8FF).withOpacity(0.4), width: 2),
                          boxShadow: [
                            BoxShadow(
                              color: const Color(0xFF14D8FF).withOpacity(0.15),
                              blurRadius: 30,
                              spreadRadius: 4,
                            )
                          ],
                        ),
                      ),
                      Container(
                        width: 200,
                        height: 200,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(color: const Color(0xFF03D4ED).withOpacity(0.6), width: 1.5),
                        ),
                      ),
                      Container(
                        width: 160,
                        height: 160,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: const Color(0xFF14D8FF).withOpacity(0.08),
                        ),
                      ),
                    ],
                  ),
                ),

                // Central 3D wireframe tooth image
                Center(
                  child: Image.network(
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuA8IhJhiFXgCJoUCUhdnc489Z5-t5f73w8_vrm1xpYXedmkJ03q-koJmRfbOUzS_KQB0wsM6NaXDIHtJwV0K5zDDPGeUiBqxJ1vahCOg4L_EOFtulSHKST682LV0CZ5esHQYRSk_GGGGfRSBitnzecYBWkSCsJoqy8_nsg06W7xEsAhpHHHrHBwqXslITJ85aSDIxTyNuG8ThD74NSybCASpY9V3MVWaet_3GWL3yhamaVQj4dbDGJVwpsxnrt-nByMJbCOw2YSxps',
                    width: 170,
                    height: 170,
                    fit: BoxFit.contain,
                    errorBuilder: (context, error, stackTrace) {
                      return const Icon(
                        Icons.blur_circular,
                        size: 90,
                        color: Color(0xFF14D8FF),
                      );
                    },
                  ),
                ),

                // Floating interactive nodes matching the screenshot
                _buildOrbitNode(
                  top: 50,
                  left: 20,
                  icon: Icons.favorite_border,
                  onTap: () => onNavigate('services'),
                ),
                _buildOrbitNode(
                  bottom: 50,
                  left: 10,
                  icon: Icons.bolt_outlined,
                  onTap: () => onNavigate('services'),
                ),
                _buildOrbitNode(
                  top: 30,
                  right: 20,
                  icon: Icons.search_outlined,
                  onTap: () => onNavigate('services'),
                ),
                _buildOrbitNode(
                  bottom: 70,
                  right: 10,
                  icon: Icons.star_border_outlined,
                  onTap: () => onNavigate('services'),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // 3. Slogans
          const Text(
            'إبتسامة صحية.. مظهر أجمل.. حياة أفضل',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 4),
          const Text(
            'Healthy smile.. Beautiful look.. Better life',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: Color(0xFF14D8FF),
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 28),

          // 4. Category/Service Grid Section
          Row(
            children: [
              _buildServiceCard(
                arLabel: 'تبييض الأسنان',
                enLabel: 'Teeth Whitening',
                icon: Icons.auto_awesome,
                onTap: () => onNavigate('services'),
              ),
              _buildServiceCard(
                arLabel: 'الفينير',
                enLabel: 'Veneers',
                icon: Icons.shield_outlined,
                onTap: () => onNavigate('services'),
              ),
              _buildServiceCard(
                arLabel: 'زراعة الأسنان',
                enLabel: 'Dental Implants',
                icon: Icons.dns_outlined,
                onTap: () => onNavigate('services'),
              ),
              _buildServiceCard(
                arLabel: 'تقويم الأسنان',
                enLabel: 'Orthodontics',
                icon: Icons.grid_on_outlined,
                onTap: () => onNavigate('services'),
              ),
            ],
          ),
          const SizedBox(height: 32),

          // 5. Main Call to Action Button
          GestureDetector(
            onTap: () => onNavigate('booking'),
            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 20),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFF14D8FF).withOpacity(0.35),
                    blurRadius: 15,
                    offset: const Offset(0, 4),
                  )
                ],
                gradient: const LinearGradient(
                  colors: [Color(0xFF03D4ED), Color(0xFF14D8FF)],
                ),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'احجز موعدك الآن',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w900,
                          color: Color(0xFF001F27),
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        isAr ? 'Book Your Appointment' : 'Book Your Appointment',
                        style: const TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w800,
                          color: Color(0xFF001F27),
                        ),
                      ),
                    ],
                  ),
                  Container(
                    width: 44,
                    height: 44,
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.white.withOpacity(0.2)),
                    ),
                    child: const Center(
                      child: Icon(
                        Icons.calendar_month,
                        color: Color(0xFF001F27),
                        size: 26,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 28),

          // 6. Elegant Brand Footer
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text('✦', style: TextStyle(color: Color(0xFF14D8FF), fontSize: 16)),
              const SizedBox(width: 8),
              Row(
                children: [
                  const Icon(Icons.shield_outlined, color: Color(0xFF14D8FF), size: 18),
                  const SizedBox(width: 6),
                  Text(
                    isAr ? 'نهتم بابتسامتك' : 'We care about your smile',
                    style: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
              const SizedBox(width: 8),
              const Text('✦', style: TextStyle(color: Color(0xFF14D8FF), fontSize: 16)),
            ],
          ),
          const SizedBox(height: 4),
          const Text(
            'WE CARE ABOUT YOUR SMILE',
            style: TextStyle(
              fontSize: 10,
              color: Color(0xFF859398),
              letterSpacing: 2,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 24),
        ],
      ),
    );
  }

  Widget _buildOrbitNode({
    double? top,
    double? left,
    double? right,
    double? bottom,
    required IconData icon,
    required VoidCallback onTap,
  }) {
    return Positioned(
      top: top,
      left: left,
      right: right,
      bottom: bottom,
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          width: 52,
          height: 52,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: const Color(0xFF09151C).withOpacity(0.85),
            border: Border.all(color: const Color(0xFF14D8FF).withOpacity(0.55), width: 1.5),
            boxShadow: [
              BoxShadow(
                color: const Color(0xFF14D8FF).withOpacity(0.25),
                blurRadius: 12,
                spreadRadius: 1,
              )
            ],
          ),
          child: Center(
            child: Icon(
              icon,
              color: const Color(0xFF14D8FF),
              size: 24,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildServiceCard({
    required String arLabel,
    required String enLabel,
    required IconData icon,
    required VoidCallback onTap,
  }) {
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          margin: const EdgeInsets.symmetric(horizontal: 4),
          padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 4),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                const Color(0xFF09151C).withOpacity(0.7),
                const Color(0xFF03090C).withOpacity(0.9),
              ],
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
            ),
            borderRadius: BorderRadius.circular(22),
            border: Border.all(color: const Color(0xFF14D8FF).withOpacity(0.15), width: 1.2),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.4),
                blurRadius: 10,
                offset: const Offset(0, 6),
              )
            ],
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(icon, color: const Color(0xFF14D8FF), size: 36),
              const SizedBox(height: 12),
              Text(
                arLabel,
                style: const TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 4),
              Text(
                enLabel,
                style: const TextStyle(
                  fontSize: 8,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF859398),
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ==========================================
// SCREEN 2: SERVICES SCREEN
// ==========================================
class ServicesScreen extends StatelessWidget {
  final String locale;
  final ValueChanged<String> onNavigate;

  const ServicesScreen({super.key, required this.locale, required this.onNavigate});

  bool get isAr => locale == 'ar';

  @override
  Widget build(BuildContext context) {
    final services = [
      {
        'title': isAr ? 'هوليوود سمايل الرقمية' : 'Digital Hollywood Smile',
        'desc': isAr ? 'تصميم عدسات الفينير المتناسقة مع ملامحك رقمياً بالكامل وبدون برد مفرط للأسنان.' : 'Aesthetic veneers calibrated digitally for matching facial lines with minimal enamel shaving.',
        'time': isAr ? 'جلستين' : '2 Sessions',
      },
      {
        'title': isAr ? 'زراعة الأسنان الفورية' : 'Immediate Dental Implants',
        'desc': isAr ? 'تعويض الأسنان المفقودة بأجود الخامات السويسرية في يوم واحد وبدون جراحة معقدة.' : 'Replace lost teeth in a single session with supreme Swiss components, painlessly.',
        'time': isAr ? 'يوم واحد' : '1 Day',
      },
      {
        'title': isAr ? 'التقويم الشفاف غير المرئي' : 'Invisalign Clear Aligners',
        'desc': isAr ? 'علاج وتعديل اصطفاف الأسنان بقوالب شفافة ذكية قابلة للإزالة دون أي تشويه للمظهر.' : 'Intelligent, removable aligners designed digitally to correct tooth alignment invisibly.',
        'time': isAr ? '٦-١٢ شهر' : '6-12 Months',
      }
    ];

    return ListView.builder(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.all(24),
      itemCount: services.length,
      itemBuilder: (context, index) {
        final item = services[index];
        return Container(
          margin: const EdgeInsets.only(bottom: 16),
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.03),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: Colors.white.withOpacity(0.05)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    item['title']!,
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF14D8FF),
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: const Color(0xFF14D8FF).withOpacity(0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      item['time']!,
                      style: const TextStyle(
                        fontSize: 9,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF14D8FF),
                      ),
                    ),
                  )
                ],
              ),
              const SizedBox(height: 12),
              Text(
                item['desc']!,
                style: const TextStyle(
                  fontSize: 12,
                  color: Color(0xFF859398),
                  height: 1.5,
                ),
              ),
              const SizedBox(height: 16),
              GestureDetector(
                onTap: () => onNavigate('booking'),
                child: Row(
                  children: [
                    Text(
                      isAr ? 'حجز استشارة لهذه الخدمة' : 'Book treatment consult',
                      style: const TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(width: 6),
                    Icon(
                      isAr ? Icons.arrow_back : Icons.arrow_forward,
                      color: Colors.white,
                      size: 14,
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

// ==========================================
// SCREEN 3: GALLERY SCREEN
// ==========================================
class GalleryScreen extends StatefulWidget {
  final String locale;

  const GalleryScreen({super.key, required this.locale});

  @override
  State<GalleryScreen> createState() => _GalleryScreenState();
}

class _GalleryScreenState extends State<GalleryScreen> {
  String _activeCategory = 'all';

  bool get isAr => widget.locale == 'ar';

  @override
  Widget build(BuildContext context) {
    final categories = [
      {'id': 'all', 'label': isAr ? 'الكل' : 'All'},
      {'id': 'cases', 'label': isAr ? 'حالات ناجحة' : 'Cases'},
      {'id': 'tech', 'label': isAr ? 'التقنيات' : 'Technology'},
    ];

    final galleryItems = [
      {
        'id': '1',
        'category': 'cases',
        'title': isAr ? 'نتائج زراعة الأسنان الكاملة' : 'Full Arch Reconstruction',
        'image': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbaBoAqhXNBgoh5ecdIqXvLXkLJD5eGXJgj6xkSvSDxhz2E7rNuUN70w2W4TXps1CxOYOJ7u-DSpdrweZayddj3fPxw1ij2sx5tuh1y5Fq5kKFdU-VwT-Wly8OA76B591UWCYJb90tblgOyoT9ZVqA8pOLwbW0DFR1jESGimIEqDT60M-mza4NAVk07KAJ9iB5-sW61_NmDfEiAPpgKFxei70YHJMGxDaFx3yONX-kj9TDxq3HVMUeFoTElJV64CHxFsMCNL9Mb8Q',
      },
      {
        'id': '2',
        'category': 'tech',
        'title': isAr ? 'تقنيات المسح الثلاثي الأبعاد' : '3D Scanning Imaging',
        'image': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRBolvbl_5l2t7jfUBHQFjudqNMF-1aduORceeJJYsp4FJmHC4Chx6EpWc3mU5aL_q8J7wz9sKYzj04ILYC_IaE9W1ZSi_WKXGOAX5vE_UG1lpKaJ3gpPmfqkmZ5LUCE48zuJXpC095U7Z8NRFktND6vsW2py5FA7QlmV3wQyN76VHEnovY_rZ9P6b_pM_l_h8EnC-ct0UbJOxUTgfIwwUSKeUPv9A4FW1hJTiqFhz_T5V3WFLpuj6ADtpr6pea6KhCK88GFR84DU',
      }
    ];

    final filteredItems = _activeCategory == 'all'
        ? galleryItems
        : galleryItems.where((element) => element['category'] == _activeCategory).toList();

    return Column(
      children: [
        // Category filters
        Container(
          height: 50,
          margin: const EdgeInsets.symmetric(vertical: 16),
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            physics: const BouncingScrollPhysics(),
            padding: const EdgeInsets.symmetric(horizontal: 20),
            itemCount: categories.length,
            itemBuilder: (context, index) {
              final cat = categories[index];
              final isSelected = _activeCategory == cat['id'];
              return GestureDetector(
                onTap: () => setState(() => _activeCategory = cat['id']!),
                child: Container(
                  margin: const EdgeInsets.only(right: 8),
                  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
                  decoration: BoxDecoration(
                    color: isSelected ? const Color(0xFF14D8FF).withOpacity(0.1) : Colors.white.withOpacity(0.02),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(
                      color: isSelected ? const Color(0xFF14D8FF) : Colors.white.withOpacity(0.05),
                    ),
                  ),
                  child: Center(
                    child: Text(
                      cat['label']!,
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: isSelected ? const Color(0xFF14D8FF) : const Color(0xFF859398),
                      ),
                    ),
                  ),
                ),
              );
            },
          ),
        ),

        // Grid contents
        Expanded(
          child: GridView.builder(
            physics: const BouncingScrollPhysics(),
            padding: const EdgeInsets.symmetric(horizontal: 24),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 1,
              mainAxisSpacing: 16,
              crossAxisSpacing: 16,
              childAspectRatio: 1.6,
            ),
            itemCount: filteredItems.length,
            itemBuilder: (context, index) {
              final item = filteredItems[index];
              return Container(
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.02),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: Colors.white.withOpacity(0.05)),
                  image: DecorationImage(
                    image: NetworkImage(item['image']!),
                    fit: BoxFit.cover,
                  ),
                ),
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(20),
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.transparent,
                        Colors.black.withOpacity(0.8),
                      ],
                    ),
                  ),
                  padding: const EdgeInsets.all(16),
                  child: Align(
                    alignment: Alignment.bottomLeft,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          item['title']!,
                          style: const TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                        const Icon(Icons.camera_alt_outlined, color: Color(0xFF14D8FF), size: 16),
                      ],
                    ),
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

// ==========================================
// SCREEN 4: BOOKING SCREEN
// ==========================================
class BookingScreen extends StatefulWidget {
  final String locale;

  const BookingScreen({super.key, required this.locale});

  @override
  State<BookingScreen> createState() => _BookingScreenState();
}

class _BookingScreenState extends State<BookingScreen> {
  final _formKey = GlobalKey<FormState>();
  String _name = '';
  String _phone = '';
  String _notes = '';
  bool _booked = false;

  bool get isAr => widget.locale == 'ar';

  @override
  Widget build(BuildContext context) {
    if (_booked) {
      return Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const Icon(Icons.check_circle_outline, color: Color(0xFF14D8FF), size: 80),
            const SizedBox(height: 16),
            Text(
              isAr ? 'تم تسجيل طلبك بنجاح!' : 'Booking Submitted Successfully!',
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 12),
            Text(
              isAr
                  ? 'سيتواصل معك المنسق الطبي لتأكيد موعدك الدقيق خلال ساعات العمل القادمة.'
                  : 'Our medical coordinator will call you back shortly to confirm your clinical slot.',
              style: const TextStyle(fontSize: 13, color: Color(0xFF859398), height: 1.5),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () => setState(() => _booked = false),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF14D8FF),
                foregroundColor: const Color(0xFF001F27),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                child: Text(isAr ? 'حجز موعد آخر' : 'Book Another'),
              ),
            )
          ],
        ),
      );
    }

    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.all(24.0),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              isAr ? 'تأكيد الحجز الفوري' : 'Confirm Your Session',
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
            ),
            const SizedBox(height: 4),
            Text(
              isAr ? 'أدخل معلوماتك وسنقوم بالاتصال بك فوراً' : 'Fill in coordinates for instant clinic confirmation',
              style: const TextStyle(fontSize: 11, color: Color(0xFF859398)),
            ),
            const SizedBox(height: 24),

            // Patient Name Input
            TextFormField(
              decoration: InputDecoration(
                labelText: isAr ? 'الاسم بالكامل' : 'Full Name',
                prefixIcon: const Icon(Icons.person_outline, color: Color(0xFF14D8FF)),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(15)),
                filled: true,
                fillColor: Colors.white.withOpacity(0.02),
              ),
              validator: (val) {
                if (val == null || val.trim().isEmpty) {
                  return isAr ? 'الرجاء إدخال الاسم' : 'Please enter your name';
                }
                return null;
              },
              onSaved: (val) => _name = val ?? '',
            ),
            const SizedBox(height: 16),

            // Patient Phone Input
            TextFormField(
              keyboardType: TextInputType.phone,
              decoration: InputDecoration(
                labelText: isAr ? 'رقم الهاتف' : 'Phone Number',
                prefixIcon: const Icon(Icons.phone_outlined, color: Color(0xFF14D8FF)),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(15)),
                filled: true,
                fillColor: Colors.white.withOpacity(0.02),
              ),
              validator: (val) {
                if (val == null || val.trim().isEmpty) {
                  return isAr ? 'الرجاء إدخال الهاتف' : 'Please enter your phone number';
                }
                return null;
              },
              onSaved: (val) => _phone = val ?? '',
            ),
            const SizedBox(height: 16),

            // Additional Notes Input
            TextFormField(
              maxLines: 3,
              decoration: InputDecoration(
                labelText: isAr ? 'ملاحظات إضافية أو الشكوى المرضية' : 'Notes or Symptoms',
                prefixIcon: const Icon(Icons.chat_bubble_outline, color: Color(0xFF14D8FF)),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(15)),
                filled: true,
                fillColor: Colors.white.withOpacity(0.02),
              ),
              onSaved: (val) => _notes = val ?? '',
            ),
            const SizedBox(height: 24),

            // Submit Button
            GestureDetector(
              onTap: () {
                if (_formKey.currentState?.validate() ?? false) {
                  _formKey.currentState?.save();
                  setState(() => _booked = true);
                }
              },
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 16),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(16),
                  gradient: const LinearGradient(
                    colors: [Color(0xFF03D4ED), Color(0xFF14D8FF)],
                  ),
                ),
                child: Center(
                  child: Text(
                    isAr ? 'إرسال طلب الحجز' : 'Request Appointment',
                    style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 13, color: Color(0xFF001F27)),
                  ),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}

// ==========================================
// SCREEN 5: ABOUT SCREEN
// ==========================================
class AboutScreen extends StatelessWidget {
  final String locale;

  const AboutScreen({super.key, required this.locale});

  bool get isAr => locale == 'ar';

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 70,
                height: 70,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(color: const Color(0xFF14D8FF), width: 1.5),
                  image: const DecorationImage(
                    image: NetworkImage(
                        'https://lh3.googleusercontent.com/aida-public/AB6AXuBQGk9T8T-E-dTpTss5FQxeaLgfuT6D7b8knwLxoma7ZhneQUbTV6jegwf83Rz3Wsi-1ojfZUr4lObSfdbX8qJs_GRO-1BDl9AUgNUb0Z60o8xRS9X-FtvMzMNib-qoykcBsefefS1Hhaf0u5mEuLb83liLjH7sos8ZJOA7njPRorV-taMls7PyH_FyRFsPwcu0h8c2UUGlTi9rSDRoelBrHe30tc3qJpL7eQi6euwC_Dofi6FIaIkTEyIqa6zWRKrNA2ZqGbxXlPo'),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      isAr ? 'د. مصطفى الرفاعي' : 'Dr. Mustafa Al-Rifai',
                      style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: Colors.white),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      isAr ? 'استشاري زراعة وتجميل الأسنان الرقمية' : 'Consultant Digital Implantology & Smile Design',
                      style: const TextStyle(fontSize: 11, color: Color(0xFF14D8FF), fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              )
            ],
          ),
          const SizedBox(height: 24),
          const Divider(color: Colors.white10),
          const SizedBox(height: 16),
          Text(
            isAr ? 'السيرة الذاتية المهنية' : 'Biography & Accomplishments',
            style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          const SizedBox(height: 8),
          Text(
            isAr
                ? 'الدكتور مصطفى الرفاعي هو أحد رواد طب الأسنان الرقمي في دبي، وهو حائز على الزمالة السويدية في زراعة الأسنان وعضو الأكاديمية الأمريكية لتجميل الأسنان. يركز الدكتور على دمج التقنيات والذكاء الاصطناعي في هندسة الابتسامة لتوفير علاج بدون ألم وبنتائج تدوم طويلاً.'
                : 'Dr. Mustafa is a pioneering dentist in digital smile design in Dubai, certified by the Swedish board of Implantology and a prominent member of AACD. He focuses on integrating Computer Assisted Design to craft pristine, perfect teeth painlessly.',
            style: const TextStyle(fontSize: 12, color: Color(0xFF859398), height: 1.6),
          ),
          const SizedBox(height: 24),
          Text(
            isAr ? 'الشهادات والاعتمادات' : 'Certificates & Credentials',
            style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          const SizedBox(height: 12),
          _buildCredentialItem(isAr ? 'الزمالة السويدية في زراعة الأسنان' : 'Swedish Fellowship in Dental Implantology'),
          _buildCredentialItem(isAr ? 'عضو الأكاديمية الأمريكية لتجميل الأسنان' : 'Member of AACD'),
          _buildCredentialItem(isAr ? 'شهادة التميز في جراحة الأسنان بمساعدة الليزر' : 'Pristine Laser Dentistry Accreditation'),
        ],
      ),
    );
  }

  Widget _buildCredentialItem(String label) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Icon(Icons.verified, color: Color(0xFF14D8FF), size: 16),
          const SizedBox(width: 8),
          Expanded(child: Text(label, style: const TextStyle(fontSize: 11, color: Color(0xFFDDE4E6)))),
        ],
      ),
    );
  }
}

// ==========================================
// SCREEN 6: CONTACT SCREEN
// ==========================================
class ContactScreen extends StatelessWidget {
  final String locale;

  const ContactScreen({super.key, required this.locale});

  bool get isAr => locale == 'ar';

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            isAr ? 'تواصل معنا مباشرة' : 'Get In Touch',
            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
          ),
          const SizedBox(height: 4),
          Text(
            isAr ? 'مستعدون لاستقبال اتصالاتكم والرد على استفساراتكم على مدار الساعة.' : 'Our help desk is ready to answer your questions.',
            style: const TextStyle(fontSize: 11, color: Color(0xFF859398)),
          ),
          const SizedBox(height: 20),

          // Contact Actions
          _buildActionItem(
            icon: Icons.phone_outlined,
            title: isAr ? 'اتصل بنا' : 'Call Us',
            subtitle: '+971 4 555 1234',
            color: const Color(0xFF14D8FF),
            onTap: () => launchUrl(Uri.parse('tel:+97145551234')),
          ),
          const SizedBox(height: 12),
          _buildActionItem(
            icon: Icons.chat_bubble_outline,
            title: isAr ? 'واتساب العيادة' : 'Clinical WhatsApp',
            subtitle: '+971 50 987 6543',
            color: Colors.green,
            onTap: () => launchUrl(Uri.parse('https://wa.me/971509876543')),
          ),
          const SizedBox(height: 24),

          // Operating Schedule
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.02),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: Colors.white.withOpacity(0.05)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: const [
                    Icon(Icons.schedule, color: Color(0xFF14D8FF), size: 16),
                    SizedBox(width: 8),
                    Text(
                      'ساعات الحضور والعمل',
                      style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: Colors.white),
                    )
                  ],
                ),
                const SizedBox(height: 12),
                Text(
                  isAr
                      ? 'الأحد - الخميس: 09:00 - 20:00\nالجمعة: 10:00 - 18:00\nالسبت: مغلق'
                      : 'Sun - Thu: 09:00 - 20:00\nFriday: 10:00 - 18:00\nSaturday: Closed',
                  style: const TextStyle(fontSize: 11, color: Color(0xFF859398), height: 1.6),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }

  Widget _buildActionItem({
    required IconData icon,
    required String title,
    required String subtitle,
    required Color color,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.02),
          borderRadius: BorderRadius.circular(15),
          border: Border.all(color: Colors.white.withOpacity(0.05)),
        ),
        child: Row(
          children: [
            Icon(icon, color: color, size: 22),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontSize: 10, color: Color(0xFF859398))),
                  const SizedBox(height: 2),
                  Text(subtitle, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white)),
                ],
              ),
            ),
            const Icon(Icons.arrow_forward_ios, size: 14, color: Colors.white24),
          ],
        ),
      ),
    );
  }
}
