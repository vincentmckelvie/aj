import bpy
import colorsys
import math
from mathutils import Vector 
import random
import bmesh

scene = bpy.context.scene

domain = bpy.data.objects['CUBE']
depsgraph = bpy.context.evaluated_depsgraph_get()
#newObj = domain.copy()

domain.select_set(True)
bpy.context.view_layer.objects.active = domain
k = 0
for f in domain.data.polygons:
    i = 0
    k += 1
    s = "mat3("
    for idx in f.vertices:
        s += str( round(domain.data.vertices[idx].co.x,3) )+","
        s += str( round(domain.data.vertices[idx].co.y,3) )+","
        s += str( round(domain.data.vertices[idx].co.z,3) )+""
        i += 3
        #print(i)
        if i != 9:
            s += ","
                  
    s+="),"
    print(s)
    #i = 0
    
print(k)

   