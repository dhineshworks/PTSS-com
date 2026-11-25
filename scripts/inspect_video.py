import subprocess
import os

os.makedirs('video_all_frames', exist_ok=True)
cmd = ['ffmpeg', '-i', r'D:\kids.mp4', '-vf', 'fps=1,scale=480:-1', 'video_all_frames/sec_%03d.jpg', '-y']
subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
files = os.listdir('video_all_frames')
print(f'Extracted {len(files)} frames')
