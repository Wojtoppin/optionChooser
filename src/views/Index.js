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
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

import Best_Element from "./Best_Element";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

const Index = (props) => {
  const [cenaSliderValue, setCenaSliderValue] = useState(50);
  const [przebiegSliderValue, setPrzebiegSliderValue] = useState(50);
  const [klimatyzacjaSliderValue, setKlimatyzacjaSliderValue] = useState(50);
  const [kosztSliderValue, setKosztSliderValue] = useState(50);
  const [activeNav, setActiveNav] = useState(1);
  const [weight, setWeights] = useState({cena:cenaSliderValue, przebieg:przebiegSliderValue, klimatyzacja:klimatyzacjaSliderValue, sredni_koszt_naprawy:kosztSliderValue})
  const [cars, setCars] = useState({})
  const [producers, setProducers] = useState({})
  const [producersPercentage, setProducersPercentage] = useState()
  const [lineData, setLineData] = useState({});
  const [barData, setBarData] = useState({});
  const [isASC, setIsASC] = useState({ID:"ASC", name:"ASC", cena:"ASC", przebieg:"ASC", klimatyzacja:"ASC", sredni_koszt_naprawy:"ASC"})
  
  const toggleSortingOrder = (columnName) => {
    const currentOrder = isASC[columnName];
    const newOrder = currentOrder === "ASC" ? "DESC" : "ASC";
    setIsASC({ ...isASC, [columnName]: newOrder });
    console.log(isASC)
  };

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    fetchDataAndUpdateCharts(index)
  };

  function fetchDataAndUpdateCharts(index) {
    
    fetch('http://localhost:3040/data')
      .then((response) => response.json())
      .then((data) => {
        console.log(weight)
        
        const test = new Best_Element();
        let results = test.onLoad(data, weight).winning_data;
    
        let names = [];
        let sum = [];
        let prices = [];
        let km = [];
        let AC = [];
        let repair = [];
        results.map(element =>{
          names.push(element.name);
          sum.push(element.sum);
          prices.push(element.cena);
          km.push(element.przebieg);
          AC.push(element.klimatyzacja);
          repair.push(element.sredni_koszt_naprawy);
        })
        let chart1Data = {};
        let chart2Data = {};
        let new_label="";
        let new_data = [];
        let new_bC = "";
        let selected_array = [];

        if (index === 1){
          chart1Data = {
            labels: names,
            datasets: [
              {
                label: "Sum",
                data: sum,
                borderColor: 'rgba(255, 0, 0, 0.65)',
                
              },
              {
                label: "Price",
                data: prices,
                borderColor: 'rgba(255, 0, 141, 0.65)',
              },
              {
                label: "Course",
                data: km,
                borderColor: 'rgba(255, 119, 0, 0.65)',
              },
              {
                label: "Air Conditioning",
                data: AC,
                borderColor: 'rgba(248, 255, 0, 0.65)',
              },
              {
                label: "Repair Price",
                data: repair,
                borderColor: 'rgba(0, 0, 255, 0.65)',
              },
            ],
          };
          selected_array = sum;
          
        }
        if (index === 2){
          new_label = "Price"
          new_data = prices;
          new_bC = "rgba(255, 0, 141, 0.65)"
          selected_array = prices;

        }
        if (index === 3){
          new_label = "Course"
          new_data = km;
          new_bC = "rgba(255, 119, 0, 0.65)"
          selected_array = km;

        }
        if (index === 4){
          new_label = "Air Conditioning"
          new_data = AC;
          new_bC = 'rgba(248, 255, 0, 0.65)'
          selected_array = AC;

        }
        if (index === 5){
          new_label = "Repair Price"
          new_data = repair;
          new_bC = 'rgba(0, 0, 255, 0.65)'
          selected_array = repair;

        }
        if(Object.keys(chart1Data).length === 0){
          chart1Data = {
            labels: names,
            datasets: [
              {
                label: new_label,
                data: new_data,
                borderColor: new_bC,
              },
            ],
          };
        }
        chart2Data = {
          labels: [names[0], names[1], names[2], names[3], names[4], names[5]],
          datasets: [
            {
              label: "Sales",
              data: [selected_array[0], selected_array[1], selected_array[2], selected_array[3], selected_array[4], selected_array[5]],
              maxBarThickness: 10,
            },
          ],
        };

        chartExample1.data1 = (canvas) => chart1Data;
        setLineData(chart1Data);
        
        chartExample2.data2 = (canvas) => chart2Data;
        setBarData(chart2Data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }

  const refreashData = (code="", direction="") =>{
    let link = `http://localhost:3040/data`;
    if(code !== "" && direction !== ""){
        link += `/${direction}/${code}`;
    }
    fetch(link)
    .then(response => response.json())
    .then(data => {
        setCars(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  }

  const refreashProducers = () =>{
    let link = `http://localhost:3040/producent`;
    
    fetch(link)
    .then(response => response.json())
    .then(data => {
        let sum = 0;
        setProducers(data);
        data.map(element =>{
          sum += element.counted;
        })
        setProducersPercentage(sum);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  }


  const handleSliderChange = (event, num) => {
    const newValue = parseInt(event.target.value);
    if(num === 1){
        setCenaSliderValue(newValue);
        setWeights({["cena"]:101-newValue, ["przebieg"]:101-przebiegSliderValue, ["klimatyzacja"]:101-klimatyzacjaSliderValue, ["sredni_koszt_naprawy"]:101-kosztSliderValue });

    }else{
        if(num === 2){
            setPrzebiegSliderValue(newValue);
            setWeights({["cena"]:101-cenaSliderValue, ["przebieg"]:101-newValue, ["klimatyzacja"]:101-klimatyzacjaSliderValue, ["sredni_koszt_naprawy"]:101-kosztSliderValue });

        }else{
            if(num === 3){
              setKlimatyzacjaSliderValue(newValue);
              setWeights({["cena"]:101-cenaSliderValue, ["przebieg"]:101-przebiegSliderValue, ["klimatyzacja"]:101-newValue, ["sredni_koszt_naprawy"]:101-kosztSliderValue });
            }else{
              setKosztSliderValue(newValue);
              setWeights({["cena"]:101-cenaSliderValue, ["przebieg"]:101-przebiegSliderValue, ["klimatyzacja"]:101-klimatyzacjaSliderValue, ["sredni_koszt_naprawy"]:101-newValue });
        }
    }
    
  }};


  useEffect(() => {
    fetchDataAndUpdateCharts(1);
    refreashData();
    refreashProducers();
  }, []);
  return (
    <>
      <Header 
      fetchDataAndUpdateCharts={fetchDataAndUpdateCharts}
      handleSliderChange={handleSliderChange}
      csV = {cenaSliderValue}
      psV = {przebiegSliderValue}
      klsV = {klimatyzacjaSliderValue}
      kosV = {kosztSliderValue}
      
      scsV = {setCenaSliderValue}
      spsV = {setPrzebiegSliderValue}
      sklsV = {setKlimatyzacjaSliderValue}
      skosV = {setKosztSliderValue}

      index={true}
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Cars</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">All</span>
                          <span className="d-md-none">All</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Price</span>
                          <span className="d-md-none">$</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 3,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 3)}
                        >
                          <span className="d-none d-md-block">km</span>
                          <span className="d-md-none">km</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 4,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 4)}
                        >
                          <span className="d-none d-md-block">AC</span>
                          <span className="d-md-none">AC</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 5,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 5)}
                        >
                          <span className="d-none d-md-block">AVG</span>
                          <span className="d-md-none">AVG</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Line
                    data={lineData}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Total orders</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={barData}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Cars</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => (e.preventDefault(), refreashData())}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                  {/* <th scope="col" onClick={() =>(refreashData("ID", isASC["ID"]), toggleSortingOrder("ID"))}>ID</th> */}
                    <th scope="col" onClick={() =>(refreashData("name", isASC["name"]), toggleSortingOrder("name"))}>Car</th>
                    <th scope="col" onClick={() =>(refreashData("cena", isASC["cena"]), toggleSortingOrder("cena"))}>Price</th>
                    <th scope="col" onClick={() =>(refreashData("przebieg", isASC["przebieg"]), toggleSortingOrder("przebieg"))}>Course</th>
                    <th scope="col" onClick={() =>(refreashData("klimatyzacja", isASC["klimatyzacja"]), toggleSortingOrder("klimatyzacja"))}>AC</th>
                    <th scope="col" onClick={() =>(refreashData("sredni_koszt_naprawy", isASC["sredni_koszt_naprawy"]), toggleSortingOrder("sredni_koszt_naprawy"))}>Avg repair cost</th>
                    <th scope="col" onClick={() =>(refreashData("producer", isASC["producer"]), toggleSortingOrder("producer"))}>Producer</th>

                    
                  </tr>
                </thead>
                <tbody>
                  
                    {Array.isArray(cars) && cars.map(element =>{
                      return(
                        <tr>
                          {/* <th scope="row">{element.ID}</th> */}
                          <th scope="row">{element.name}</th>
                          <td>{element.cena}</td>
                          <td>{element.przebieg}</td>
                          <td>{element.klimatyzacja}</td>
                          <td>{element.sredni_koszt_naprawy}</td>
                          <td>{element.producer}</td>
                        </tr>
                    )})}
                    
                  
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Producers</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Producer</th>
                    <th scope="col">cars</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                    
                    {Array.isArray(producers) && producers.map(element =>{
                      return(
                        <tr>
                          {/* <th scope="row">{element.ID}</th> */}
                          <th scope="row">{element.producer}</th>
                          <td>{element.counted}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="mr-2">{(element.counted/producersPercentage*100).toFixed(1)}%</span>
                              <div>
                                <Progress
                                  max="100"
                                  value={(element.counted/producersPercentage*100).toFixed(1)}
                                  barClassName="bg-gradient-info"
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                    )})}
                </tbody>
                
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
