
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
[demo](https://drive.google.com/drive/u/6/folders/17fathH4xXH0Y9K0sQ0ThmrRozqSYAwYr)
- if the video shows it doesn't exist - download it.

A link to the UML of the project:
[UML](https://github.com/azranohad/web_ad/blob/master/web_ad_flowchart.jpg)

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
3. In the cmd - run:
```
npm start
```
4. Open in a browser like google chrome this link - http://localhost:8080/
5. The web app has launched. you can now enter 2 csv files (train file and check file). You can choose the detector, and if not 
there will be a default choice.
You must click upload after entering the 2 files. Wait for the message at the top of the screen that the files finished 
uploading, and after the message appeared you will see the table of the anomalies, and the chart.


## *How to contribute:*
If you want to send a post request yourself and not use our visualization - you must use the API below:
## *API:*

| Method | Path | Query Parameters | Request Body | Response |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| POST  | /learn  | model_type: "hybrid"/"regression" | {train_data: &lt;DATA&gt;} | |
| POST  | /detect  | | {predict_data: &lt;DATA&gt;} | &lt;ANOMALY&gt; |	

You must do the POST /detect only after the POST /learn .
examples for the data structures mentioned above:
&lt;DATA&gt;:
[{“altitude_gps”: [100, 110, 20, 120…], “heading_gps”: [0.6, 0.59, 0.54, 0.51, ...] }]

&lt;ANOMALY&gt;:
[{“altitude_gps”: [1, 2, 20, 120…], “heading_gps”: [3, 4, 5, 10, ...] }]





## *Contributors:*
Amit Ilovitch, Hila Levi, Ohad Azran, Lior Levi


<img width="756" alt="webApp1" src="https://user-images.githubusercontent.com/73899381/139402775-ab5d8bb1-4b0e-4a4b-98fc-fb37e0f0525e.PNG">
<img width="760" alt="webApp2" src="https://user-images.githubusercontent.com/73899381/139402792-3cb35876-195e-4e62-a49a-a94e6055fe57.PNG">
<img width="960" alt="webApp4" src="https://user-images.githubusercontent.com/73899381/139402825-94260382-3d48-4ed7-b346-fdfaee4ce5bb.png">


