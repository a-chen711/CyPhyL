#Here goes the client code 

import cv2
from mpu6050 import mpu6050
import time
from datetime import datetime 

sensor = mpu6050(0x68)

def writeData(dataFile, sensor_arr, time_arr, i):
    dataFile.write(str(time_arr[i]))
    dataFile.write(", ")
    dataFile.write(str(sensor_arr[i]['x']))
    dataFile.write(", ")
    dataFile.write(str(sensor_arr[i]['y']))
    dataFile.write(", ")
    dataFile.write(str(sensor_arr[i]['z']))
    dataFile.write(",")
    dataFile.write("\n")

def getData(accel_arr, gyro_arr, time_arr):
    # recordTime = int(input("How long do you want to record data? "))
    # print("Recording for", recordTime, " seconds")
    # print("Time,", "x-axis", "y-axis", "z-axis")
    now = datetime.now()
    timer = now.strftime("%H_%M_%S")

    accelData = sensor.get_all_data()[0]
    gyroData = sensor.get_all_data()[1]
    accel_arr.append(accelData)
    gyro_arr.append(gyroData)
    time_arr.append(time.time())
    print(timer)
    print(accel_arr[0]['x'])


trial_type = input('What are you folding? Shorts, Pants, Shirt, Socks, Towel')
video = cv2.VideoCapture(0)
# We need to check if camera 
# is opened previously or not 
if (video.isOpened() == False):  
    print("Error reading video file") 
  
# We need to set resolutions. 
# so, convert them from float to integer. 
frame_width = int(video.get(3)) 
frame_height = int(video.get(4)) 
   
size = (frame_width, frame_height) 
   
# Below VideoWriter object will create 
# a frame of above defined The output  
# is stored in 'filename.avi' file. 
imuAccelDataTxt = open(trial_type + "AccelData.txt", "a")
imuGyroDataTxt = open(trial_type + "GyroData.txt", "a")
result = cv2.VideoWriter(trial_type + '.avi',  
                         cv2.VideoWriter_fourcc(*'MJPG'), 
                         10, size) 
start_time = time.time()
cur_time = time.time()
accel_arr = []
gyro_arr = []
time_arr = []
while(cur_time - start_time < 10):
    ret, frame = video.read() 
    getData(accel_arr, gyro_arr, time_arr)
    if ret == True:  
        # Write the frame into the 
        # file 'filename.avi' 
        result.write(frame) 
  
        # Press S on keyboard  
        # to stop the process 
        if cv2.waitKey(1) & 0xFF == ord('s'): 
            break
  
    # Break the loop 
    else: 
        break
    cur_time = time.time()

# When everything done, release  
# the video capture and video  
# write objects 
video.release() 
result.release()
accel_len = len(accel_arr)
i = 0
while(i < accel_len):
    writeData(imuAccelDataTxt, accel_arr, time_arr, i)
    writeData(imuGyroDataTxt, gyro_arr, time_arr, i)
    i += 1
imuAccelDataTxt.close()
imuGyroDataTxt.close()
# Closes all the frames 
cv2.destroyAllWindows() 
   
print("The video was successfully saved") 
