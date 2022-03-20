use <MCAD/involute_gears.scad>;

PITCH=2;
TEETH=12;
THICKNESS=3;
BORE_DIAMETER=2;

gear(circular_pitch=PITCH, gear_thickness=THICKNESS, number_of_teeth=TEETH, bore_diameter=BORE_DIAMETER, hub_diameter=BORE_DIAMETER+2);
