import bpy
import colorsys
import math
from mathutils import Vector 
import random
import bmesh

scene = bpy.context.scene

domain = bpy.data.objects['ICOSAHEDRON']
depsgraph = bpy.context.evaluated_depsgraph_get()
#newObj = domain.copy()

domain.select_set(True)
bpy.context.view_layer.objects.active = domain

for f in domain.data.polygons:
    i = 0
    s = "tri( p, d, rot( vec3( t * rotSpeedInner, 0 , 0) ) * mat3("
    for idx in f.vertices:
        s += str( round(domain.data.vertices[idx].co.x,3) )+"*mlt,"
        s += str( round(domain.data.vertices[idx].co.y,3) )+"*mlt,"
        s += str( round(domain.data.vertices[idx].co.z,3) )+"*mlt"
        i += 3
        #print(i)
        if i != 9:
            s += ","
                  
    s+="), c, depth, norm,0);"
    print(s)
    #i = 0
    

   