newPage(2000, 2000)

fill(0, 0, 0)
rect(0, 0, width(), height())

x = width()/2
y = height()/2

rectCount = 45
rectSizeX = 2000
rectSizeY = 2000
  
red = 0
blue = 1
transp = 0.01
factor = 1/(rectCount-10)
    
for i in range(rectCount):
    
    blendMode("screen")
    fill(red, 0, blue, transp)
    
    rectHalfX = rectSizeX/2
    rect(x - rectHalfX, y - rectHalfX, rectSizeX, rectSizeY)
    rectSizeX -= width()/rectCount -30
    rectSizeY -= width()/rectCount +1

    translate(25, -25)
    rotate(2)
    
    red += factor
    blue -= factor
    transp += 0.0009


saveImage("~/Desktop/CAS/mypage/mypage/drawbot/rotating_rectangles_V01.jpg")
    
    

  
    

  