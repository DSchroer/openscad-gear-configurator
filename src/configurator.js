const form = document.getElementById("configurator");
const generateBtn = document.getElementById("generate");
const cancelBtn = document.getElementById("cancel");

let worker;

cancelBtn.onclick = (e) => {
  e.preventDefault();

  if(worker){
    worker.terminate();
  }

  generateBtn.disabled = false;
}

form.onsubmit = async (e) => {
  e.preventDefault();

  worker = new Worker("./configurator.worker.js");

  worker.onmessage = function (e) {
    downloadFile(e.data, "gear.stl");
    generateBtn.disabled = false;
    worker.terminate();
  };

  generateBtn.disabled = true;

  const values = new FormData(form);
  worker.postMessage({
    pitch: values.get("pitch"),
    teeth: values.get("teeth"),
    thickness: values.get("thickness"),
    boreDiameter: values.get("bore-diameter"),
  });
};

function downloadFile(output, fileName) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(
    new Blob([output], { type: "application/octet-stream" }),
  );
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
}
