newPage(1700, 1700)

fill(0, 0, 0)
rect(0, 0, width(), height())

circleSize = 300
rangeCount = 10
transparency = 0.07
r = 0
g = 1

#yPos = height()/rangeCount
yPos = (width() / 2) - (circleSize/2 * (rangeCount + 1))/2


for i in range(rangeCount):
    
    xPos = (width() / 2) - (circleSize/2 * (rangeCount + 1))/2
    
    for i in range(rangeCount):
        fill(r, g, 0, transparency)
        oval(xPos, yPos, circleSize, circleSize)
    
        transparency += 0.002
        r += 0.011
        g -= 0.011
        xPos += circleSize/2
        
    yPos += circleSize/2
        
    
        
saveImage("~/Desktop/CAS/mypage/mypage/drawbot/circles_grid_V01.jpg")