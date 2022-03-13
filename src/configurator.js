import OpenScad from "../lib/openscad.js";
import { addMCAD } from "../lib/openscad.mcad.js";

const form = document.getElementById("configurator");
const generateBtn = document.getElementById("generate");

// const sourceRes = await fetch("./gear.scad");
// const source = await sourceRes.text();

form.onsubmit = async (e) => {
  e.preventDefault();
  const values = new FormData(form);
  generateBtn.disabled = true;
  generateGear(
    values.get("pitch"),
    values.get("teeth"),
    values.get("thickness"),
    values.get("bore-diameter")
  ).then(() => generateBtn.disabled = false, () => generateBtn.disabled = false);
};

async function generateGear(pitch, teeth, thickness, boreDiameter) {
  const inst = await OpenScad({ noInitialRun: true });
  addMCAD(inst);
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

  downloadFile(
    new Blob([output], { type: "application/octet-stream" }),
    "gear.stl"
  );
}

function downloadFile(blob, fileName) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
}
