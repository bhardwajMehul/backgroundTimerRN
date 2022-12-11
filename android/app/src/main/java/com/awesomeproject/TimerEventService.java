package com.awesomeproject;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

import androidx.annotation.Nullable;
import android.os.Bundle;
import android.content.Intent;
import com.facebook.react.bridge.Arguments;

public class TimerEventService extends HeadlessJsTaskService {
    @Nullable
    protected HeadlessJsTaskConfig getTaskConfig(Intent intent){
        Bundle extras=intent.getExtras();
        return new HeadlessJsTaskConfig("Timer",extras != null ? Arguments.fromBundle(extras) : Arguments.createMap(),5000,true);
    }
}
