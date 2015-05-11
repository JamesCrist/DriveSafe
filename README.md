#Drive Safe
Created with love by Michael Han, Lucas Silva, Kaitlyn Taboada, Eric Parent, and Wei Lu.

##Installation Instructions

###Download Source/Meteor
The application can be run using Meteor. First, install the latest Meteor version on your computer (install instructions [here](http://docs.meteor.com/#/basic/quickstart)). Then, clone our repository on GitHub into a directory of your choosing with the following commands:

```
$ git clone https://github.com/michael-han/DriveSafe.git
$ cd DriveSafe/source
```

###Deploy Server (optional)
We have provided a server located at http://drivesafe.party to be used as the backend for the application. You may also deploy your own server using Meteor’s free server hosting and the following command:

```
$ meteor deploy <name>.meteor.com
```

Where <name> can be anything of your choosing, as long as it is not already taken. You will be prompted to create a Meteor developer account if you do not already have one.

###Install Application
To build and install the application on your Android device, connect your Android device to your computer with a micro-usb and enable developer mode on the device. Ensure the device has recognized the computer and run the following in the DriveSafe/source directory:

```
$ meteor run android-device --mobile-server <server>
```

Where <server> is either drivesafe.party or your own server. You may be prompted to install the Android sdk if not already installed, and this can be done with the following command:

```
$ meteor install-sdk android
```

If you prefer, we have also included a .apk file in the DriveSafe/dist/android folder named unaligned.apk, you may install this directly on your phone as it includes the latest android build of our application.

##Documentation

Are you a developer? Documentation for our source can be seen here: http://docs.drivesafe.party

---

To update and show the documentation, follow these instructions:

```
./update_document.py		# update documentation
cd docs						# change to docs folder
meteor --port 3333			# run jsdoc server on port 3333
```

The server for the documentation should be found at http://localhost:3333
