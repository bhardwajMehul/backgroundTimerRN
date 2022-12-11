package com.awesomeproject;

import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class TimerModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    @NonNull
    @Override
    public String getName() {
        String timerModule = "Timer";
        return timerModule;
    }

    public TimerModule(@NonNull ReactApplicationContext reactContext){
        super(reactContext);
        this.reactContext = reactContext;
    }

    @ReactMethod
    public void startService(){
        Log.v("TimerServiceStart","Timer service has been started");
        this.reactContext.startService(new Intent(this.reactContext, TimerService.class));
    }

    @ReactMethod
    public void stopService() {
        this.reactContext.stopService(new Intent(this.reactContext, TimerService.class));
    }
}
