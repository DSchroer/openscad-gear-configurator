import { addMCAD } from "../lib/openscad.mcad.js";

onmessage = async function(e) {
  const args = e.data;
  const gear = await generateGear(args.pitch, args.teeth, args.thickness, args.boreDiameter);
  postMessage(gear);
}

async function generateGear(pitch, teeth, thickness, boreDiameter) {
  globalThis.OpenSCAD = {
    noInitialRun: true,
  }

  importScripts("./openscad.wasm.js");

  await new Promise(resolve => {
    globalThis.OpenSCAD.onRuntimeInitialized = () => resolve();
  });

  const inst = globalThis.OpenSCAD;

  addMCAD(inst);

  const sourceRes = await fetch("./gear.scad");
  const source = await sourceRes.text();
  inst.FS.writeFile("/source.scad", source);

  inst.callMain([
    "/source.scad",
    "-o",
    "out.stl",
    `-DPITCH=${pitch}`,
    `-DTEETH=${teeth}`,
    `-DTHICKNESS=${thickness}`,
    `-DBORE_DIAMETER=${boreDiameter}`,
  ]);
  const output = inst.FS.readFile("/out.stl");

  return output;
}