# 📕LearningBridge

LearningBridge - an AI platform for online physical skill learning<br />
**If you are in a hurry, just watch Demo Video!**
<br /><br />
1. [Introduction](#introduction)
2. [Demo Video](#demo-video)
3. [Implementation](#implementation)
4. [Install Guide](#install-guide)
5. [References](#references-great-thanks)
<br />

## 🔔Introduction

We experience remote learning everyday. It is easy to imagine learning theoretical knowledge online. However, learning physical skills online is still challenging for both students and instructors since they cannot interact in person, separated by a flat screen. 
LearningBridge may solve this problem by providing real-time feedback, making asking questions easy, and helping instructors assess class quality.
Let's take yoga course as an example and see how LearningBridge works.
<br /><br />

**Provding real-time feedback**
LearningBridge will automatically give students learning guidance by comparing their physical motions with instructor's. 
For example, When the angle formed by instructor's knee is 45° while mine is 90°, LearningBridge will remind me "Bend your knees a bit" until I follow the instructor correctly. 
<br /><br />

**Making asking questions easy** 
If I have any question/feedback, I just need to stop the lecture and leave a bullet comment (e.g. "back painful") right on the video, 
just like asking a question in the same room with my instructor and classmates. The comment is embedded in the video and will show up right there when anyone replays that part.
Textual information is embedded in visual environment, making it more contextual and intuitive. 
<br /><br />

**Helping instructors assess class quality**
All bullet comments are collected in back end, and presented to instructor in a new look. 
The instructor can view assessment page to see updating feedback (e.g. difficulty assessment, questions with context).
<br /><br />


## 🚩Demo Video
If the introduction above seems abstract, just watch this video! (which is a complete user case.) Please send us feedback! ♥
[![Video Cover - Learning Bridge](http://sypei.com/BulletComment/demo/img/VideoCover.png)](http://sypei.com/BulletComment/demo/demo.html)
Copyright-free music used in the video:
<br />Composer: Whitesand (Martynas Lau)
<br />Year: 2018
<br />Title: Melody Of My Dreams
<br /><br />


## 🍃Implementation
The backend is supported by the famous OpenPose framework. We extract its skeleton point output and realize real-time comparison between instructors and students in a js file. 
The bullet comment system and assessment interface are built with html and js, with MySQLi managing database.
<br /><br />


## ⚽Install Guide
The current version requires us to install OpenPose first. Please check their install guide in [References](##♥References (Great thanks!)).
In future, we will integrate it to our server. 
If you already have it, you just need to have a webcam, open your browser and run a few commands to use LearningBridge:
1. Watch the lecture (and ask questions) online: [here](http://sypei.com/BulletComment/demo/index.html)
2. From the repo, we only need to download data_process.js because all the rest are set up on a server (unless you wanna rebuild from scratch).
3. Move data_process.js into the OpenPose's root directory.
4. Create a new folder "data" in the OpenPose's root directory.
5. Open two terminals in the OpenPose's root directory. 
6. In one terminal: (increase the net_resolution if your machine can bear it)
```
# Ubuntu
./build/examples/openpose/openpose.bin --net_resolution 320x256 -write_json data/
```
```
: Windows
bin\OpenPoseDemo.exe --net_resolution 320x256 -write_json data\
```
 
7. In the other terminal, run data_process.js: <code> node data_process.js</code> If we are using Windows, use a bash terminal here.

6. Access the assessment page if you are the instructor: [here](http://sypei.com/BulletComment/demo/assessment.html)
<br /><br />


## ♥References (Great thanks!)
1. [OpenPose](https://github.com/CMU-Perceptual-Computing-Lab/openpose)
2. [DanmuPlayer](https://github.com/chiruom/DanmuPlayer)

To be added.
