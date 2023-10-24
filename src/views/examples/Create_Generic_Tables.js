/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useEffect, useState } from "react";
import {
  chartOptions,
  parseOptions,
} from "variables/charts.js";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Row,
  Col,
  Button,
  Input,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  NavItem,
  NavLink,
  Nav,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import Best_Element from "../Best_Element";


const Create_Generic_Tables = (props) => {

  //all
  const [isSelectPropertiesVisible, setIsSelectPropertiesVisible] = useState(true);
  const [isSelectObjectsVisible, setIsSelectObjectsVisible] = useState(false);
  const [isChartVisible, setIsChartVisible] = useState(false);

  //create generic tables
  const [rows, setRows] = useState(props.generic_table.length === 0?
    [{name:"name", type:"text", sorting:"don't show as a chart variable"},]:props.generic_table
  ) 
    const [hasRedColor, setHasRedColor] = useState(false)


  //generic tables
  const [newData, setNewData] = useState([]);

  // index
  const [activeNav, setActiveNav] = useState(0);
  const [lineData, setLineData] = useState({});


  const [weightValues, setWeightValues] = useState({});
  const [sorted, setSorted] = useState({});
  const [bestOption, setBestOption] = useState({});
  const [opened, setOpened] = useState([])

  var weights = [];
  var confirms = [];

  const handleChangeCurrentAction = (index) =>{
    if (index === 1){
      setIsSelectPropertiesVisible(true)
      setIsSelectObjectsVisible(false)
      setIsChartVisible(false)
    }
    
    if (index === 2){
      setIsSelectPropertiesVisible(false)
      setIsSelectObjectsVisible(true)
      setIsChartVisible(false)
    }

    if (index === 3){
      setIsSelectPropertiesVisible(false)
      setIsSelectObjectsVisible(false)
      setIsChartVisible(true)
    }

  }

  const updateRowCount = (index=0,deleteIndex="") =>{
    let new_rows = [...rows]

    if(index === 1){
      new_rows.push({"name":"rowName" + new_rows.length, "sorting":"ASC", "type":"number"});
      setOpened([...opened, false])
    }
    
    if(index === 2 && deleteIndex !== "" && deleteIndex !== 0){
      new_rows = new_rows.filter((dupa,index) => index !== deleteIndex)
      setOpened([...opened.slice(0, -1)]);
    }

    setRows(new_rows)
  }


  useEffect(()=>{
    UpdateCharts(activeNav);
  },[opened])


  const handleChange = (index, type, event) => {

    if(type === 1){
      setRows((prevRows) => {
        const updatedRows = [...prevRows];
        
        updatedRows[index] = {
          ...updatedRows[index],
          name: event.target.value,
        };

        checkForRedBorders(updatedRows)

        return updatedRows
      });
    }
    if(type === 2){
      setRows((prevRows) => {
        const updatedRows = [...prevRows];
        updatedRows[index] = {

          ...updatedRows[index],
          type: event.target.value,
        };
        return updatedRows
      });
    }
    if(type === 3){
      setRows((prevRows) => {
        const updatedRows = [...prevRows];

        updatedRows[index] = {
          ...updatedRows[index],
          sorting: event.target.value,
        };
        return updatedRows
      });
    }
  };

  const checkForRedBorders = (newRows) =>{
    let hasRed = false;
    newRows.map(element=>{
      if(element.name.length === 0){
        hasRed = true;
      }
    })
    setHasRedColor(hasRed)
  }

  const handleNewChange = (event, index) => {
    const { name, value } = event.target;
    setNewData((prevData) => {
      const newDataCopy = [...prevData];
      newDataCopy[index] = {
        ...newDataCopy[index],
        [name]: value,
      };


      props.setGeneric_tableValues(newDataCopy);
      return newDataCopy;
    });
  };

  const handleAddObjectButton = () =>{
    let start_data = {}
    props.generic_table.map(element=>{
        start_data[element.name] = "";
    })
    setNewData([...newData, start_data])
    props.setGeneric_tableValues([...newData, start_data]);

  }

  const handleDeleteObjectButton = (indexToRemove) =>{
    setNewData((prevData) => {
      const newDataCopy = [...prevData];
      const newArray = newDataCopy.filter((something,index) => index !== indexToRemove);
      props.setGeneric_tableValues(newArray);

      return newArray;
    });
  }

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e=0, index, openedIndex="") => {
    
    if(e!==0){
      e.preventDefault();
    }

    const newOpened = [...opened];

    if(openedIndex!== ""){
      newOpened[openedIndex] = !newOpened[openedIndex];
      setOpened(newOpened);
    }
    if (index === 0 && opened.length !== 0){
      const newOpened = opened.map(() => false);
      setOpened(newOpened);
    }
    setActiveNav(index);
  };

  function UpdateCharts(index) {

    let keys = []
    props.generic_table.filter(data=>(data.sorting === "ASC" || data.sorting === "DESC") && data.type ==="number").map(element=>{
      keys.push(element.name);
    })

    
    let new_filtered_data = props.generic_tableValues;
      
    if(Array.isArray(props.generic_tableValues) && props.generic_tableValues.length !==0){
      new_filtered_data = new_filtered_data.map((data) => {
        const modifiedData = JSON.parse(JSON.stringify(data));
        keys.map((key,index)=>{
          if(!opened[index]){
            delete modifiedData[key]
          }
        })
        return modifiedData;
      });
    }







      const best_element = new Best_Element();
      let results = []
      if(props.generic_tableValues.length > 0 && Array.isArray(sorted) && sorted.length !== 0){
        if(index === 0){
          results = best_element.onLoad(props.generic_tableValues, weightValues, sorted).winning_data;
        }else{
          results = best_element.onLoad(new_filtered_data, weightValues, sorted).winning_data;
        }

        setBestOption(results[0]["name"])


        let new_results = []

        keys.map(key=>{
            new_results[key] = [];
        })

        keys.map(key=>{
          results.map(element=>{
            new_results[key].push(element[key])
          })
        })


        let names = [];
        let sum = [];
        results.map(element =>{
          names.push(element.name);
          sum.push(element.sum);
        })

        let chart1Data = {};

        // chart1Data = {
        //   labels: names,
        //   datasets: [
        //     {
        //       label: "sum",
        //       data: sum,
        //       borderColor: 'rgba(255, 0, 0, 0.65)',
        //     },
        //     ...keys.map((key,index)=>{
        //       return{
        //         label: key,
        //         data: new_results[key],
        //         borderColor: colors[index],

        //       }
        //     })
        //   ],
        // };
        chart1Data = {
          labels: names,
          datasets: [
            {
              label: "sum",
              data: sum,
              borderColor: 'rgb(255, 255, 255)',
            },
            ...keys.map((key,index)=>{
              return{
                label: key,
                data: new_results[key],
                borderColor: getRandomColor(index),

              }
            })
          ],
        };





        setLineData(chart1Data);
      
      }else{
        setBestOption("no data matches your preferences")
      }
  }

  const getRandomColor=(index)=>{
    const new_color = 340/props.generic_table.length*index;
    console.log(new_color)
    return `hsl(${new_color},100%,50%)`;
  }

  const minMax = () => {
    props.generic_table.filter((data) => (data.sorting === "ASC" || data.sorting === "DESC") && data.type === "number").map(key => {
      weights[key.name] = 1
    });
    
    setWeightValues(weights);
    props.generic_table.filter((data) => data.sorting === "ASC").map(key => {
      confirms.push({ [key.name]: 1 });
    });
    props.generic_table.filter((data) => data.sorting === "DESC").map(key => {
      confirms.push({ [key.name]: 0 });
    });
    setSorted(confirms);
  };
  
  useEffect(()=>{
    UpdateCharts(activeNav);
    toggleNavs(0,activeNav,"")
  },[sorted])




  return (
    <>
      <Header
        isSelectObjectsVisible = {isSelectObjectsVisible}
        isSelectPropertiesVisible = {isSelectPropertiesVisible}
        isChartVisible = {isChartVisible}

        handleChangeCurrentAction = {handleChangeCurrentAction}
        generic_table = {props.generic_table}
        generic_index={true}
      />

      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
          <Card className="shadow">
              
          <CardHeader className="border-0">

          <table border={0} style={{float:"left"}} onClick={() => handleChangeCurrentAction(1)}>
            <tr>
              <th>
                <div className="icon icon-shape text-white rounded-circle shadow" style={{background:isSelectPropertiesVisible || isChartVisible || isSelectObjectsVisible ?"#12980f":"#f5365c"}}>
                  <span>1</span>
                </div>
                <span style={{color:hasRedColor?"red":"#525f7f"}}>{hasRedColor?" Column names must be unique and not empty":" Select properties"}</span>
              </th>
            </tr>
          </table>

          {isSelectPropertiesVisible && < div style={{float:"right"}} >
            <Button style={{background:"#12980f", color:"white", border:"hidden"}} onClick={() => updateRowCount(1)}>+</Button>
          </div>}

          </CardHeader>
           {isSelectPropertiesVisible && <Table
            style={{textAlign:"center"}}
            className="align-items-center table-flush"
            responsive 
          >
            <thead className="thead-light">
            <tr>
                <th scope="col" style={{width:"20vw"}}>column name</th>
                <th>type</th>
                <th>sorting type</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
              {Array.isArray(rows) && rows.map((element, index)=>(
                <tr key={index}>
                  <th>
                  <Input 
                  style={{color:"#16161D", borderColor:"#5e72e4", borderColor:element.name.length === 0?"red":"#5e72e4"}}
                      disabled={index === 0? true:false}
                       type="text"
                        name="name"
                         id="name"
                          value={element.name}
                          onKeyDown={(event) =>event.target.style.borderColor === "red"?setHasRedColor(true):setHasRedColor(false)}
                           onChange={(event) => handleChange(index,1,event)}/>
                  </th>
                  <th>
                    <Input type="select" style={{color:"#16161D", borderColor:"#5e72e4"}} onChange={(event) => handleChange(index, 2, event)} disabled={index === 0? true:false}>
                      <option selected={element.type === "number"}>number</option>
                      <option selected={element.type === "text"}>text</option>
                      <option selected={element.type === "yes/no"}>yes/no</option>
                    </Input>
                  </th>
                  <th>
                    <Input type="select" style={{color:"#16161D", borderColor:"#5e72e4"}} onChange={(event) => handleChange(index, 3, event)} disabled={index === 0? true:false}>
                      {element.type === "number" && <option selected={element.sorting === "ASC"}>ASC</option>}
                      {element.type === "number" && <option selected={element.sorting === "DESC"}>DESC</option>}
                      <option selected={element.sorting === "don't show as a chart variable"}>don't show as a chart variable</option>
                    </Input>
                  </th>
                  <th>
                    <Button style={{background:"#a71c1c", color:"white", border:"hidden"}} hidden={index === 0? true:false} onClick={() => updateRowCount(2, index)}>-</Button>

                  </th>
              </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={5} style={{textAlign:"center"}}>
                  <Button color="primary"
                   disabled={hasRedColor?true:false}
                    onClick={() => {props.setGeneric_table(rows); handleChangeCurrentAction(2)}}>Send</Button>
                </th>
              </tr>
            </tfoot>
          </Table>}
        </Card>
          </div>
        </Row>
      </Container>

      <Container style={{marginTop:"20px"}} fluid>
        <Row>
          <div className="col">
          <Card className="shadow">
              <CardHeader className="border-0">

                <table border={0} style={{float:"left"}} onClick={() => handleChangeCurrentAction(2)}>
                  <tr>
                    <th>
                      <div className="icon icon-shape text-white rounded-circle shadow" style={{background: isChartVisible || isSelectObjectsVisible?"#12980f":"#f5365c"}}>
                        <span>2</span>
                      </div>
                      <span>{isSelectObjectsVisible?(hasRedColor || props.generic_table.length===0?" There is no objects, press \"Send\" button in Select properties":" Select objects"):" Select objects"}</span>
                    </th>
                    <th style={{width:"20px"}}></th>

                  </tr>
                </table>

                <h3 className="mb-0">
                {isSelectObjectsVisible && <div style={{float:"right"}}>
                    <Button onClick={handleAddObjectButton} style={{background:"#12980f", border:"hidden", color:"white"}}>+</Button>
                  </div>}
                </h3>

              </CardHeader>
            
              {isSelectObjectsVisible && <div>
              <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                  <tr>

                    {props.generic_table.map(element=>{
                      return(<th scope="col">
                        {element.name}
                      </th>)
                    })}
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                
                {Array.isArray(newData) && newData.map((elementData, elementIndex) => {
                  return (
                        <tr key={"tr" + elementIndex}>
                            {props.generic_table.map((element,newIndex) => (
                                <td key={newIndex + "Object"}>
                                  

                                    {element.type === "checkbox" && <Input type="checkbox" onChange={(event) =>handleNewChange(event,elementIndex)} />}
                                    {element.type === "text" && <Input type={element.type} id={element.name} name={element.name} value={elementData[element.name]} onChange={(event) =>handleNewChange(event,elementIndex)} />}
                                    {element.type === "number" && element.name !== "ID" && <Input min={0} type={element.type} id={element.name} name={element.name} value={elementData[element.name]} onChange={(event) =>handleNewChange(event,elementIndex)} />}
                                    
                                </td>
                            ))}
                            <td>
                              <Button style={{background:"#a71c1c", color:"white", border:"hidden"}} onClick={() => handleDeleteObjectButton(elementIndex)}>-</Button>

                            </td>
                        </tr>
                    );
                })}
                

                    {/* :<th colSpan={7}>There is no data that matches your requirements</th> */}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
              </div>}
              
              </Card>
          
          </div>
        </Row>
      </Container>

      <Container style={{marginTop:"20px"}} fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="bg-gradient-default shadow" style={{border:"hidden"}}>
              <CardHeader className="border-0" >
                <Row className="align-items-center">
                  <div className="col">
                    <table border={0} style={{float:"left"}} onClick={() => {handleChangeCurrentAction(3); minMax()}}>
                    <tr>
                      <th>
                        <div className="icon icon-shape text-white rounded-circle shadow"  style={{background:isChartVisible?"#12980f":"#f5365c"}}>
                          <span>3</span>
                        </div>
                        {" Chart "}
                      </th>
                      <th style={{width:"20px"}}></th>
                      {isChartVisible && <td>{bestOption === "no data matches your preferences"? bestOption :"Best option: " + bestOption}</td>}
                    </tr>
                  </table>
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      {/* {"Data matching your preferences: "+ data.length} */}
                    </h6>
                  </div>
                  {isChartVisible && <div className="col">
                    <Nav className="justify-content-end">
                    <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav === 0,
                            })}
                            style={{color:activeNav===0?"green":"#525f7f"}}
                            href="#pablo"
                            onClick={(e) => toggleNavs(e, 0)}
                          >
                            All
                          </NavLink>
                        </NavItem>


                        {props.generic_table.filter(data=>(data.sorting === "ASC" || data.sorting === "DESC") && data.type ==="number").map((element, index)=>{
                        return(
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav === 1,
                            })}
                            style={{color:opened[index]?"green":"#525f7f"}}

                            href="#pablo"
                            onClick={(e) => toggleNavs(e, 1, index)}
                          >
                            {element.name}
                          </NavLink>
                        </NavItem>
                        )
                      })}
                    </Nav>
                  </div>}
                </Row>
              </CardHeader>
              {isChartVisible && bestOption.length!== 0 && <CardBody>
                <div>
                  <Line
                    options={{
                      tooltips: {
                        enabled: false,
                      },
                    }}
                    data={lineData}
                  />
                </div>
              </CardBody>}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Create_Generic_Tables;
