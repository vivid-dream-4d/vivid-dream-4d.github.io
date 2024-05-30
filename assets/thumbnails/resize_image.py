import imageio
import cv2
import sys

img = cv2.resize(cv2.imread(sys.argv[1]), (512, 384), interpolation=cv2.INTER_AREA)
imageio.imwrite(sys.argv[1], img[..., ::-1])
