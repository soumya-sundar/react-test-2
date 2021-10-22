import React from 'react';
import {meta, performance} from './utils/data-fetcher.js';
import './DisplayPerformanceData.css';

function transformMetaData(metaDataObject) {
  let metaDataMap = new Map();
  for (const value of metaDataObject.values()) {
        metaDataMap.set(value.Name, {"DataType": value.DataType, "Entity": "Device", "Title": value.Title,
        "Unit": value.Unit,"Normalization": value.Normalization,"Formatting": null, "Notes": value.Notes,
        "Hidden": value.Hidden});
  }
  /*for (const [key, value] of metaDataMap.entries()) {
    console.log(key + ' = ' + JSON.stringify(value))
  }*/
  return metaDataMap;
}

function refinePerformanceData(performanceDataObject){
  // Remove duplicate entries raw versions from the array
  const performanceArray = performanceDataObject.filter(data => data.DataType !== "MetricRaw");

  let performanceDataMap = new Map();
  for(let i=0; i<performanceArray.length; i++) {
    const value = {"DataType": performanceArray[i].DataType, "Entity": performanceArray[i].Entity, 
    "Title": performanceArray[i].Title, "Unit": performanceArray[i].Unit,
    "Normalization": performanceArray[i].Normalization,"Formatting": performanceArray[i].Formatting, 
    "Notes": "", "Hidden": false};
    performanceDataMap.set(performanceArray[i].Name, value);
  }

  /*for (const [key, value] of performanceDataMap.entries()) {
    console.log(key + ' = ' + JSON.stringify(value))
  }*/
  return performanceDataMap;
}


function DisplayPerformanceData(){
  const metaDataObject = meta();
  const performanceDataObject = performance();

  //Funtion to tranform meta data object to a required schema.
  const transformedMetaDataObject = transformMetaData(metaDataObject);

  //Function to remove duplicate raw/scored entries in Performance Data to maintain "Name" field as Key.
  const refinedPerformanceDataObject = refinePerformanceData(performanceDataObject);

  //Combine two data sources.
  const mergedData = new Map([...transformedMetaDataObject, ...refinedPerformanceDataObject])

  //Get non hidden data
  let nonHiddenData = new Map();
  for (const [key, value] of mergedData.entries()) {
    if(value.Hidden === false) {
        nonHiddenData.set(key, value);
    }
  }

  let displayTiles = [];
  //Headers
   displayTiles.push(<li className="heading">Name</li>);
   displayTiles.push(<li className="heading">Title</li>);
   displayTiles.push(<li className="heading">Notes</li>);
   displayTiles.push(<li className="heading">Normalization</li>);
  for (const [key, value] of nonHiddenData.entries()) {
    displayTiles.push(<li key={key}>{key}</li>);
    displayTiles.push(<li key={key}>{value.Title}</li>);
    displayTiles.push(<li key={key}>{value.Notes}</li>);
    displayTiles.push(<li key={key}>{value.Normalization}</li>);
  }

  return (
   <ul>
     {displayTiles.map((image) => image)}
   </ul>
  );
}

export default DisplayPerformanceData;