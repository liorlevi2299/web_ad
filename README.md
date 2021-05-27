
# **welcome to the anomaly detection server!**

VERSION:
1.0.0

## *Description:*
This web app can 
By giving 2 csv files, one train file and one check for anomalies file, and by choosing a specific detector from the list of detectors,
we will be analyzing the data you inserted, and you will be notified when the analyzation is complete. 
After that, you will see a table of the lines in which there are anomalies (from the second file you uploaded).
Also, you'll see a sliding list of the features from the files. You can choose a feature and it will present you the data of the feature
in a chart. If the feature is a feature that is also on the table you will see the anomalies highlighted in red. 
you can change the files uploaded at any time or change the detector chosen (there are 2 detectors - regression and hybrid detector).
Just reclick the upload button and we will reanalyze the data and give you a new overview of the anomalies.
this web app is great for flight data investigation, and more.








## *Demos:*
A link to the video of a demonstration:
[demo](http://a.com)

A link to the UML of the project:
[UML](https://github.com/azranohad/AD-FlightGear/blob/e77eb1d23a48e8548286baaa257acfc46f1c0859/AD%20FlightGear/ClassDiagram2.cd)

(in order to watch the UML in full you need to download the CLASS DESIGNER plugin to visual studio). 
A link to the UML in picture format (is also inside the repository)
[picture UML](https://github.com/azranohad/AD-FlightGear/blob/180aa087da888585de0063c0708cf5aef3cce53d/UML%20picture.PNG)


## *Technologies we used:*
Node.js - javascript runtime environment.

Express.js - web application framework for Node.js.

npm - package manager for javascript.

chart.js - javascript chart library.

The code was written in javascript, HTML, and CSS.


## *Installation:*
Required:
1. Download Node.js from the link [nodejs](https://nodejs.org/en/download/)
2. If you already have node.js on your computer - also write in cmd (the command line) 'npm install'.
2. After downloading the zip of the web app, open the cmd inside the folder of controllers, it will look something like:
 C:\Users\yourUserName\Downloads\web_ad-master\web_ad-master\api\controllers.
3. Run 'npm start'.
4. Open in a browser like google chrome this link - http://localhost:8080/
5. The web app has launched. you can now enter 2 csv files (train file and check file). You can choose the detector, and if not 
there will be a default choice.
You must click upload after entering the 2 files. Wait for the message at the top of the screen that the files finished 
uploading, and after the message appeared you will see the table of the anomalies, and the chart.


## *How to contribute:*
## *API:*
If you want to send a post request yourself and not use our visualization - you must use the API below:
```js

// code in js
```




## *Contributors:*
Amit Ilovitch, Hila Levi, Ohad Azran, Lior Levi
