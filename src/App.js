import React, { useState }  from 'react';
import './App.css';
import parser from 'fast-xml-parser';
import xml from './data';
import ReactJson from 'react-json-view';
import './styles.css';

var options = {
  // attributeNamePrefix : "@_",
  // attrNodeName: "attr", //default is 'false'
  // textNodeName : "#text",
  ignoreAttributes : true,
  ignoreNameSpace : false,
  // allowBooleanAttributes : false,
  // parseNodeValue : true,
  // parseAttributeValue : false,
  trimValues: true,
  // cdataTagName: "__cdata", //default is 'false'
  // cdataPositionChar: "\\c",
  // localeRange: "", //To support non english character in tag/attribute values.
  // parseTrueNumberOnly: false,
  // attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
  // tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
  // stopNodes: ["parse-me-as-string"]
};
if( parser.validate(xml) === true) { //optional (it'll return an object in case it's not valid)
    var json = parser.parse(xml, options);
    console.log("to json", json);
}

const fieldsMapping = {
  'NAME': null,
  'COMPANY': null,
}

function App() {
  const [selectedUiField, setField] = useState(null);
  const [selectedDataPath, setDataPath] = useState(null);
  const [newFieldName, setNewFieldName] = useState('');
  const [fields, setFields] = useState(fieldsMapping);

  const update = () => {
    setFields({
      ...fields,
      [selectedUiField]: selectedDataPath
    });
  }

  const addNewField = () => {
    if (!newFieldName) return;

    setFields({
      ...fields,
      [newFieldName]: null
    });

    setNewFieldName('');
  }

  return (
    <React.Fragment>
      <div className="header">{selectedUiField}: {selectedDataPath} &nbsp;&nbsp; <button onClick={update}>update mapping</button></div>
      <div>&nbsp;</div>
      <div>
        <input value={newFieldName} onChange={(e) => setNewFieldName(e.target.value.toUpperCase())} />
        <button onClick={addNewField}>create</button>
      </div>
      <div>&nbsp;</div>
      <div className="row">
        <div>
            <ReactJson
              theme="monokai"
              src={fields}
              indentWidth={2}
              enableClipboard={false}
              displayDataTypes={false}
              displayObjectSize={false}
              onSelect={(select) => { 
                const path = select.namespace.concat(select.name).join('.');
                setField(path);
              }}
            />
          </div>
          <div>
            <ReactJson
              theme="monokai"
              src={json}
              indentWidth={2}
              enableClipboard={false}
              displayDataTypes={false}
              displayObjectSize={false}
              onSelect={(select) => { 
                const path = select.namespace.concat(select.name).join('.');
                setDataPath(path);
              }}
            />
          </div>
        </div>
      </React.Fragment>
  );
}

export default App;
