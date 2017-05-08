package com.example.alex.androidgeolocation;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        boolean canAccessFineLocation = ActivityCompat.checkSelfPermission(
                this,
                android.Manifest.permission.ACCESS_FINE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED;

        String[] permissions = new String[] {android.Manifest.permission.ACCESS_FINE_LOCATION};


        if (!canAccessFineLocation) {
            ActivityCompat.requestPermissions(this, permissions, PackageManager.GET_PERMISSIONS);
        }
    }

    public void startGeolocationBenchmark(View view) {
        Intent intent = new Intent(getApplicationContext(), MapsActivity.class);
        startActivity(intent);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           String permissions[], int[] grantResults) {
        switch (requestCode) {
            case PackageManager.GET_PERMISSIONS: {
                if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    Toast.makeText(this, "Ready to start", Toast.LENGTH_SHORT).show();

                } else {
                    Toast.makeText(this, "Please give permission to show cam", Toast.LENGTH_SHORT).show();
                }
                return;
            }
        }
    }
}
