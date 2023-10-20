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



  //create generic tables
  const [rows, setRows] = useState(props.generic_table.length === 0?
    [{name:"name", type:"text", sorting:"don't show as a chart variable"},]:props.generic_table
  )

  const updateRowCount = (index=0,deleteIndex="") =>{
    let new_rows = [...rows]

    if(index === 1){
      new_rows.push({"name":"rowName" + new_rows.length, "sorting":"ASC", "type":"number"});
    }
    
    if(index === 2 && deleteIndex !== "" && deleteIndex !== 0){
      new_rows = new_rows.filter((dupa,index) => index !== deleteIndex)
    }

    setRows(new_rows)
  }

  const handleChange = (index, type, event) => {

    if(type === 1){
      setRows((prevRows) => {
        const updatedRows = [...prevRows];

        updatedRows[index] = {
          ...updatedRows[index],
          name: event.target.value,
        };
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



  //generic tables

  const [newData, setNewData] = useState([]);


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
    console.log(indexToRemove)
    setNewData((prevData) => {
      const newDataCopy = [...prevData];
      const newArray = newDataCopy.filter((something,index) => index !== indexToRemove);
      props.setGeneric_tableValues(newArray);

      return newArray;
    });
  }

  // index

  const [activeNav, setActiveNav] = useState(1);
  const [lineData, setLineData] = useState({});
  const [weightValues, setWeightValues] = useState([]);
  const [sorted, setSorted] = useState({});

  

  const minDistance = 10;


  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    UpdateCharts(index)
  };

  function UpdateCharts(index) {

      const test = new Best_Element();
      let results = []
      if(props.generic_tableValues.length > 0){
        results = test.onLoad(props.generic_tableValues, weightValues, sorted).winning_data;
        console.log(results)





      // let repair = [];
      // results.map(element =>{
      //   names.push(element.name);
      //   sum.push(element.sum);
      //   prices.push(element.cena);
      //   km.push(element.przebieg);
      //   AC.push(element.klimatyzacja);
      //   repair.push(element.sredni_koszt_naprawy);
      // })
      // let chart1Data = {};
      // let chart2Data = {};
      // let new_label="";
      // let new_data = [];
      // let new_bC = "";
      // let selected_array = [];

      // if (index === 1){
      //   chart1Data = {
      //     labels: names,
      //     datasets: [
      //       {
      //         label: "Sum",
      //         data: sum,
      //         borderColor: 'rgba(255, 0, 0, 0.65)',
              
      //       },
      //       {
      //         label: "Price",
      //         data: prices,
      //         borderColor: 'rgba(255, 0, 141, 0.65)',
      //       },
      //       {
      //         label: "Course",
      //         data: km,
      //         borderColor: 'rgba(255, 119, 0, 0.65)',
      //       },
      //       {
      //         label: "Air Conditioning",
      //         data: AC,
      //         borderColor: 'rgba(248, 255, 0, 0.65)',
      //       },
      //       {
      //         label: "Repair Price",
      //         data: repair,
      //         borderColor: 'rgba(17, 205, 239, 0.65)',
      //       },
      //     ],
      //   };
      //   selected_array = sum;
        
      // }
      // if (index === 2){
      //   new_label = "Price"
      //   new_data = prices;
      //   new_bC = "rgba(255, 0, 141, 0.65)"
      //   selected_array = prices;

      // }
      // if (index === 3){
      //   new_label = "Course"
      //   new_data = km;
      //   new_bC = "rgba(255, 119, 0, 0.65)"
      //   selected_array = km;

      // }
      // if (index === 4){
      //   new_label = "Air Conditioning"
      //   new_data = AC;
      //   new_bC = 'rgba(248, 255, 0, 0.65)'
      //   selected_array = AC;

      // }
      // if (index === 5){
      //   new_label = "Repair Price"
      //   new_data = repair;
      //   new_bC = 'rgba(17, 205, 239, 0.65)'
      //   selected_array = repair;

      // }
      // if(Object.keys(chart1Data).length === 0){
      //   chart1Data = {
      //     labels: names,
      //     datasets: [
      //       {
      //         label: new_label,
      //         data: new_data,
      //         borderColor: new_bC,
  //           },
  //         ],
  //       };
  //   }
  //   chartExample1.data1 = (canvas) => chart1Data;
  //   setLineData(chart1Data);
    
  // }else{
  //   setBestCar("no data matches your preferences")
  // }


  }}
  var cokolwiek = [{"coś":1}];
  var confirms = [];
  const minMax = () => {
    
    props.generic_table.filter((data) => data.sorting === "ASC").map(key => {
      confirms.push({ [key.name]: 1 });
    });
    props.generic_table.filter((data) => data.sorting === "DESC").map(key => {
      confirms.push({ [key.name]: 0 });
    });
  
    props.generic_table.filter((data) => (data.sorting === "ASC" || data.sorting === "DESC") && data.type === "number").map(key => {
      console.log({ [key.name]: 100 });
      cokolwiek.push({ [key.name]: 100 })
      confirms.push({ [key.name]: 100 })
    });
    console.log(confirms);
    console.log(cokolwiek);


    setSorted(confirms);
    setWeightValues(cokolwiek);
  
  };
  




    useEffect(()=>{
      UpdateCharts(1);

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
                {" Select properties"}
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
                  style={{color:"#16161D", borderColor:"#5e72e4"}}
                       type="text"
                        name="name"
                         id="name"
                          value={element.name}
                           onChange={(event) => handleChange(index,1,event)}/>
                  </th>
                  <th>
                    <Input type="select" style={{color:"#16161D", borderColor:"#5e72e4"}} onChange={(event) => handleChange(index, 2, event)}>
                      <option selected={element.type === "number"}>number</option>
                      <option selected={element.type === "text"}>text</option>
                      <option selected={element.type === "yes/no"}>yes/no</option>
                    </Input>
                  </th>
                  <th>
                    <Input type="select" style={{color:"#16161D", borderColor:"#5e72e4"}} onChange={(event) => handleChange(index, 3, event)}>
                      <option selected={element.sorting === "ASC"}>ASC</option>
                      <option selected={element.sorting === "DESC"}>DESC</option>
                      <option selected={element.sorting === "don't show as a chart variable"}>don't show as a chart variable</option>
                    </Input>
                  </th>
                  <th>
                    <Button style={{background:"#a71c1c", color:"white", border:"hidden"}} onClick={() => updateRowCount(2, index)}>-</Button>

                  </th>
              </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={5} style={{textAlign:"center"}}>
                  <Button color="primary" onClick={() => {props.setGeneric_table(rows)}}>Wyślij</Button>
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
                      {" Select objects "}
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
                                  

                                    {element.type === "checkbox" && <Input type={element.type} onChange={(event) =>handleNewChange(event,elementIndex)} />}
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
                      {/* {isChartVisible && <td>{bestCar === "no data matches your preferences"? bestCar :"Best option: " + bestCar}</td>} */}
                    </tr>
                  </table>
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      {/* {"Data matching your preferences: "+ data.length} */}
                    </h6>
                  </div>
                  {isChartVisible && <div className="col">
                    <Nav className="justify-content-end" pills>
                    <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav === 0,
                            })}
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
                              active: activeNav === index+1,
                            })}
                            href="#pablo"
                            onClick={(e) => toggleNavs(e, index+1)}
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
              {isChartVisible && <CardBody>
                <div>
                  <Line
                    data={lineData}
                    // options={chartExample1.options}
                    // getDatasetAtEvent={(e) => console.log(cars)}
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
