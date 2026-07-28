(function(){
var FILES=["components/core/NeliMaterial.jsx","components/core/Button.jsx","components/core/Card.jsx","components/core/Badge.jsx","components/core/Kbd.jsx","components/core/SectionLabel.jsx","components/data/Stat.jsx","components/data/Timeline.jsx","components/forms/Input.jsx","components/forms/Select.jsx","components/forms/Checkbox.jsx","components/forms/Switch.jsx","components/forms/Slider.jsx","components/forms/DatePicker.jsx","components/forms/FileUpload.jsx","components/data/Resolve.jsx","components/data/Progress.jsx","components/data/Table.jsx","components/data/Chart.jsx","components/navigation/Sidebar.jsx","components/navigation/Topbar.jsx","components/navigation/Tabs.jsx","components/overlay/Dialog.jsx","components/overlay/Toast.jsx","components/overlay/Tooltip.jsx","components/overlay/CommandPalette.jsx"];
var src=document.currentScript.src;var ROOT=src.slice(0,src.lastIndexOf("/")+1);
var mods={};
function fetchSync(url){var x=new XMLHttpRequest();x.open("GET",url,false);x.send();if(x.status>=400)throw new Error(x.status+" "+url);return x.responseText;}
function norm(p){var out=[];p.split("/").forEach(function(s){if(s===""||s===".")return;if(s==="..")out.pop();else out.push(s);});return out.join("/");}
function load(rel){rel=norm(rel);if(mods[rel])return mods[rel].exports;
var code=Babel.transform(fetchSync(ROOT+rel),{presets:[["env",{modules:"commonjs"}],["react",{runtime:"classic"}]],filename:rel}).code;
var module={exports:{}};mods[rel]=module;
var dir=rel.slice(0,rel.lastIndexOf("/")+1);
var req=function(spec){if(spec==="react")return window.React;if(spec==="react-dom")return window.ReactDOM;return load(dir+spec);};
new Function("require","module","exports",code)(req,module,module.exports);
return module.exports;}
var NS={};FILES.forEach(function(f){try{Object.assign(NS,load(f));}catch(e){console.error("neli-loader",f,e);}});
window.Nelitomorphism=NS;
})();