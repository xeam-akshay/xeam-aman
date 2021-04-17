package com.xenia;

import android.app.Application;
//import android.support.multidex.MultiDexApplication;
import android.content.Context;
import com.facebook.react.PackageList;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactApplication;
import com.hopding.pdflib.PDFLibPackage;
import com.rnfs.RNFSPackage;
//mport com.keyee.pdfview.PDFView;
//import com.reactlibrary.PdfLibPackage;
// import com.reactlibrary.RNPdfScannerPackage;
import com.github.reactnativecommunity.location.RNLocationPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.bugsnag.BugsnagReactNative;
import com.reactnativecommunity.geolocation.GeolocationPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import com.oblador.vectoricons.VectorIconsPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
//import io.invertase.firebase.RNFirebasePackage;

import com.horcrux.svg.SvgPackage;
// import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
//import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

import com.heanoria.library.reactnative.locationenabler.RNAndroidLocationEnablerPackage;

public class MainApplication extends Application implements ReactApplication {
//public class MainApplication extends MultiDexApplication implements ReactApplication {
  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
           // packages.add();
           //packages.add(new RNFirebaseMessagingPackage());
           //packages.add(new ReactNativeFirebaseNotificationsPackage());
           //packages.add(new MainReactPackage(),
            //packages.add(new PDFLibPackage());
            //packages.add(new RNFSPackage());
            // new BackgroundGeolocationPackage());
          //  packages.add(new RNAndroidLocationEnablerPackage());

          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled
  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
