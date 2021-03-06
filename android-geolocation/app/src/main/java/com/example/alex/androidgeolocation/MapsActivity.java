package com.example.alex.androidgeolocation;

import android.*;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.FragmentActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.CameraPosition;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.common.base.Stopwatch;

import java.util.concurrent.TimeUnit;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback, GoogleMap.OnMapLoadedCallback, GoogleApiClient.ConnectionCallbacks, GoogleApiClient.OnConnectionFailedListener {

    private GoogleMap mMap;
    private GoogleApiClient mClient;
    private Location mLocation;
    private Stopwatch stopwatch = Stopwatch.createUnstarted();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        stopwatch.start();
        System.out.println("YOLO: stopwatch started");

        // Create our Google API Client
        mClient = new GoogleApiClient.Builder(this)
                .addConnectionCallbacks(this)
                .addOnConnectionFailedListener(this)
                .addApi(LocationServices.API)
                .build();

        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
    }

    @Override
    protected void onStart() {
        mClient.connect();
        super.onStart();
    }

    @Override
    protected void onStop() {
        mClient.disconnect();
        super.onStop();
    }


    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */
    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        mMap.setOnMapLoadedCallback(this);
        System.out.println("YOLO: map ready");
    }

    @Override
    public void onConnected(@Nullable Bundle bundle) {
        if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // Check is done in main activity
            return;
        }
        System.out.println("YOLO: play services ready");
        mLocation = LocationServices.FusedLocationApi.getLastLocation(mClient);
        if (mLocation != null) {
            LatLng myLocation = new LatLng(mLocation.getLatitude(), mLocation.getLongitude());

            mMap.addMarker(new MarkerOptions().position(myLocation).title("My Location"));

            CameraPosition cameraPosition = new CameraPosition.Builder()
                    .target(myLocation)
                    .zoom(15).build();
            //Zoom in and animate the camera.
            mMap.moveCamera(CameraUpdateFactory.newCameraPosition(cameraPosition));
            //mMap.animateCamera(CameraUpdateFactory.newCameraPosition(cameraPosition));

            System.out.println("YOLO: marker added");



        }
    }

    @Override
    public void onConnectionSuspended(int i) {

    }

    @Override
    public void onConnectionFailed(@NonNull ConnectionResult connectionResult) {

    }

    @Override
    public void onMapLoaded() {
        System.out.println("YOLO: Map Loaded");
        stopwatch.stop();
        long elapsed = stopwatch.elapsed(TimeUnit.NANOSECONDS);
        System.out.print("YOLO: Time elapsed: ");
        System.out.print(elapsed);
        System.out.println(" nanoseconds");
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);

    }
}
