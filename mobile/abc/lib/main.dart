import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:permission_handler/permission_handler.dart';
// import 'package:flutter_native_splash/flutter_native_splash.dart';
import 'camera_ex.dart';
import 'location.dart'; // location.dart 파일을 import 합니다.
// import 'dart:io';
// import 'package:image_picker/image_picker.dart';
import 'package:flutter/services.dart';
import 'package:geolocator/geolocator.dart';


void main() {
  SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
  SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
    statusBarColor: Colors.transparent, // 상단바를 투명하게 만듭니다
  ));

  WidgetsFlutterBinding.ensureInitialized(); // Flutter 앱 초기화
  // requestCameraPermission(); // 권한 요청
  _getStatuses();
  runApp(const MyApp());
}


class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {

    return MaterialApp(
      debugShowCheckedModeBanner: false, // 디버그 배너 삭제
      title: 'Flutter Demo',
      theme: ThemeData(

        colorScheme: ColorScheme.fromSeed(seedColor: Colors.yellow),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: '낚시왕 홈페이지'),
    );
  }
}


class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});


  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {

  @override
  Widget build(BuildContext context) {

    return Scaffold(

      body: Center(
        child: InAppWebView(
          initialUrlRequest: URLRequest(
            url: Uri.parse("https://i9e105.p.ssafy.io"),
          ),
          initialOptions: InAppWebViewGroupOptions(
              crossPlatform: InAppWebViewOptions(
                // 여기에 웹뷰 옵션 설정을 추가할 수 있습니다.
              ),

              android: AndroidInAppWebViewOptions(useHybridComposition: true)),

        ),
         ),
      // bottomNavigationBar: null,
      floatingActionButton: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          // FloatingActionButton(
          //   onPressed: () {
          //     Navigator.push(
          //       context,
          //       MaterialPageRoute(builder: (context) => const CameraExample()),
          //     );
          //   },
          //   child: const Text('카메라'),
          // ),
          // const SizedBox(height: 16),
          FloatingActionButton(
            onPressed: () {
              Navigator.push(
                context,
                // MaterialPageRoute(builder: (context) => LocationPage()), // LocationPage로 이동합니다.
                MaterialPageRoute(builder: (context) => Loading()), // LocationPage로 이동합니다.
              );
            },
            child: const Text('위치'),
          ),
        ],
      ),
      extendBody: true,
    );
  }
}


// void requestCameraPermission() async {
  // Map<PermissionGroup, PermissionStatus> permissions = await PermissionHandler().requestPermissions([PermissionGroup.camera]);
  // print('per1 : $permissions');
  // var cameraStatus = await Permission.camera.request();
  // if (cameraStatus.isGranted) {
  //   print('Camera permission granted.');
  // } else {
  //   print('Camera permission denied.');
  // }
// }
Future<bool> _getStatuses() async {
  Map<Permission, PermissionStatus> statuses =
  await [Permission.storage, Permission.camera].request();

  if (await Permission.camera.isGranted &&
      await Permission.storage.isGranted) {
    return Future.value(true);
  } else {
    return Future.value(false);
  }
}


